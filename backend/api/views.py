from django.contrib.auth import authenticate
from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, LoginSerializer, ProfileSerializer,StaffSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import views, status, filters
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
import openai
from .permission import IsStaff
import gradio as gr

openai.api_key = "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"

#Mannuly Token Generate
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)


    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class AddBookAPIView(ListCreateAPIView):
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class DeleteBookAPIView(ListCreateAPIView):
    def post(self, request, book_id):
        book = Book.objects.get(id=book_id)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

class UpdateBookAPIView(ListCreateAPIView):
    def put(self, request, book_id):
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


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
                if role == True:
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



class home(views.APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        return Response("OK", status=status.HTTP_200_OK)
    



class chatbot(views.APIView):
    permission_classes = (AllowAny,)
   

    def post(self, request):
        
        user_input = request.data.get("input")
        print(user_input)
        prompt =f"You are an AI specialized in book and paper. Do not answer anything other than book and paper-related queries. Do not explain thing to long: {user_input}"
        chatbot_response = None
        

        response = openai.Completion.create(
            engine = 'text-davinci-003',
            prompt = prompt,
            max_tokens=256,
            temperature = 0.3
        )
        print(response)
        return Response(response) 