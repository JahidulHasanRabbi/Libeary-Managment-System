from . import views
from django.urls import path

urlpatterns = [
    path('chatbot/', views.chatbot.as_view()),
    path('home/', views.home.as_view()),
]