from . import views
from django.urls import path

urlpatterns = [
    path('register/', views.UserRegisterView.as_view()),
    path('login/', views.UserLoginView.as_view()),
    path('chatbot/', views.chatbot.as_view()),
    path('home/', views.home.as_view()),
    path('book/add/', views.AddBookAPIView.as_view()),
    path('book/delete/', views.DeleteBookAPIView.as_view()),
    path('book/update/', views.UpdateBookAPIView.as_view()),
    path('book/search/', views.BookSearchAPIView.as_view()),
    path('book/', views.BookListAPIView.as_view()),
    path('book/fecture/', views.FeaturedBookListAPIView.as_view()),
    ]