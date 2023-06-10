from django.contrib.auth import authenticate
from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView, RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, LoginSerializer, ProfileSerializer,StaffSerializer, BookSerializer, FineSerializer, BorrowedBookSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import views, status, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
import openai
from .permission import IsStaff
import gradio as gr
from .models import Book, Fine, User, BorrowedBook



#Mannuly Token Generate
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)


    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class FeaturedBookListAPIView(views.APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        books = Book.objects.filter(fecture='yes')
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BookListAPIView(views.APIView):
    permission_classes = (AllowAny,)
    
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddBookAPIView(ListCreateAPIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        data = request.data
        print(data)
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteBookAPIView(ListCreateAPIView):
    def post(self, request, book_id):
        book = Book.objects.get(id=book_id)
        complete = book.delete()
        if complete:
            return Response("Deleted", status=status.HTTP_200_OK)
        return Response("Not Deleted", status=status.HTTP_400_BAD_REQUEST)
        
        

class UpdateBookAPIView(ListCreateAPIView):
    def put(self, request, book_id):
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("updated", status=status.HTTP_200_OK)
        return Response(serializer.errors, status=400)


class BookSearchView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['author', 'title']
    search_fields = ['author', 'title']

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Book, BorrowedBook
from .serializers import BorrowedBookSerializer

class BorrowBooksAPIView(CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BorrowedBookSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        book_ids = request.data.get('book_ids', [])

        # Limit the number of books requested to 5
        book_ids = book_ids[:5]

        books = Book.objects.filter(id__in=book_ids)
        user = request.user

        # Check if the user has already borrowed the requested books
        already_borrowed_books = BorrowedBook.objects.filter(user=user, book__in=books, status='BORROWED')
        if already_borrowed_books.exists():
            already_borrowed_books_titles = [borrowed_book.book.title for borrowed_book in already_borrowed_books]
            return Response({"detail": f"You have already borrowed the following books: {', '.join(already_borrowed_books_titles)}"}, status=status.HTTP_400_BAD_REQUEST)
        
        elif not books.exists():
            borrowed_books = []
            not_registered_books = []
            for book in books:

                # Check if the user has reached the maximum limit of 5 books
                if BorrowedBook.objects.filter(user=user, status='BORROWED').count() >= 5:
                    not_registered_books.append(book)
                    continue  # Skip if the user has reached the maximum limit

                # Create a new borrowing record
                borrowed_book = BorrowedBook.objects.create(user=user, book=book, status='BORROWED')

                # Decrease the book quantity
                book.qty -= 1
                book.save()

                borrowed_books.append(borrowed_book)

            serializer = self.get_serializer(borrowed_books, many=True)

            if not_registered_books:
                message = "You have reached the maximum limit of borrowed books. The following books were not registered: " + ", ".join(
                    [book.title for book in not_registered_books])
                return Response({"detail": message}, status=status.HTTP_400_BAD_REQUEST)
            elif borrowed_books:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "No books were registered for borrowing."}, status=status.HTTP_400_BAD_REQUEST)

def apply_fine(borrowed_book):
    if borrowed_book.return_date > borrowed_book.return_date:
        days_overdue = (borrowed_book.return_date - borrowed_book.return_date).days
        fine_amount = days_overdue * 100  # Assuming the fine amount is 100 Tk per day overdue

        fine = Fine.objects.create(borrowed_book=borrowed_book, user=borrowed_book.user, fine_amount=fine_amount)
        fine.status = 'OVERDUE'  # Set the initial status of the fine as 'OVERDUE'
        fine.save()


class ReturnBookAPIView(UpdateAPIView):
    queryset = BorrowedBook.objects.filter(status='BORROWED')
    serializer_class = BorrowedBookSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        borrowed_book_id = self.kwargs.get('pk')

        try:
            borrowed_book = BorrowedBook.objects.get(id=borrowed_book_id, status='BORROWED')
        except BorrowedBook.DoesNotExist:
            return Response({"detail": "No borrowed book found with the provided ID."}, status=status.HTTP_404_NOT_FOUND)

        book = borrowed_book.book
        borrowed_book.return_date = timezone.now()
        book.qty += 1  # Increase the book quantity
        book.save()

        borrowed_book.status = 'RETURNED'
        borrowed_book.save()
        apply_fine(borrowed_book)

        serializer = self.get_serializer(borrowed_book)

        return Response(serializer.data, status=status.HTTP_200_OK)

class FineDetailView(RetrieveUpdateAPIView):
    queryset = Fine.objects.all()
    serializer_class = FineSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        fine = self.get_object()

        if fine.paid:
            return Response({"detail": "The fine has already been paid."}, status=status.HTTP_400_BAD_REQUEST)

        fine.pay_fine()

        return Response({"detail": "Fine has been successfully paid."}, status=status.HTTP_200_OK)

class UserBorrowedBooksAPIView(ListAPIView):
    serializer_class = BorrowedBookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BorrowedBook.objects.filter(user=user, status='BORROWED')

class BookBorrowersAPIView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        book_id = self.kwargs['book_id']
        return User.objects.filter(borrowedbook__book_id=book_id, borrowedbook__status='BORROWED')

class UserRegisterView(ListCreateAPIView):
    permission_classes = (AllowAny, )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token' : token, 'Message': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

       
class UserLoginView(views.APIView):
    permission_classes = (AllowAny,) 
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print(serializer.data)
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            print(username, password)
            user = authenticate(username=username, password= password)
            if user is not None:
                role = user.get_role()
                if role == 'staff':
                    role = "staff"
                else:
                    role = "user"
                token = get_tokens_for_user(user)
                return Response({'Token' : token, 'role': role, 'msg': 'Login Sucess'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': {
                    'none_field_error': ['email or password is not valid']}},
                    status=status.HTTP_404_NOT_FOUND)
        else:
            print(serializer.errors)
            return Response({'meg': "hello"}, status=status.HTTP_400_BAD_REQUEST)

class StaffRegisterView(ListCreateAPIView):
    permission_classes = (AllowAny, )
    def post(self, request):
        serializer = StaffSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token' : token, 'Message': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StaffLoginView(views.APIView):
    permission_classes = (AllowAny,) 
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            print(serializer.data)
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            print(username, password)
            user = authenticate(username=username, password= password)
            if user is not None and user.is_staff == True:
                token = get_tokens_for_user(user)
                return Response({'Token' : token, 'msg': 'Login Sucess'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': {
                    'none_field_error': ['email or password is not valid']}},
                    status=status.HTTP_404_NOT_FOUND)
        else:
            print(serializer.errors)
            return Response({'meg': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        

class UserProfileView(views.APIView):
    permission_classes = (IsAuthenticated,) 
    def get(self, request):
        serializer = ProfileSerializer(request.user)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

