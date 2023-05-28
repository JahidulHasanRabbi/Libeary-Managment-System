from . import views
from django.urls import path

urlpatterns = [
    path('register/', views.UserRegisterView.as_view()),
    path('login/', views.UserLoginView.as_view()),
    path('chatbot/', views.chatbot.as_view()),
    path('home/', views.home.as_view()),
]