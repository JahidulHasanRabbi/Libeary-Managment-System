from . import views
from django.urls import path
from . import report

urlpatterns = [
    path('register/', views.UserRegisterView.as_view()),
    path('register/staff/', views.StaffRegisterView.as_view()),
    path('login/', views.UserLoginView.as_view()),
    path('profile/', views.UserProfileView.as_view()),
    path('profile/update/', views.UserUpdateView.as_view()),
    path('user/', views.UserAPIView.as_view()),
    path('user/search/student/', views.SearchUserAPIView.as_view()),
    path('user/staff/', views.StaffAPIView.as_view()),
    path('book/borrowed/user/', views.UserBorrowedBooksAPIView.as_view()),
    path('chatbot/', views.ChatbotView.as_view()),
    path('home/', views.home.as_view()),
    path('book/add/', views.AddBookAPIView.as_view()),
    path('book/delete/', views.DeleteBookAPIView.as_view()),
    path('book/update/', views.UpdateBookAPIView.as_view()),
    path('book/search/', views.BookSearchView.as_view()),
    path('book/', views.BookListAPIView.as_view()),
    path('book/fecture/', views.FeaturedBookListAPIView.as_view()),
    path('book/borrow/', views.BorrowBooksAPIView.as_view()),
    path('book/borrowed/', views.BookBorrowersAPIView.as_view()),
    path('book/borrowed/return/', views.ReturnBookAPIView.as_view()),
    path('report/book/', report.BookReportPDFView.as_view()),
    path('report/student/', report.StudentReportPDFView.as_view()),
    ]