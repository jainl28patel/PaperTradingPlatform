from django import views
from django.urls import path
from .api import RegisterView, GetUserAPI
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('get_user/', views.index, name='get_user'),
    path('login/', views.loginpage, name='login'),
    path('logout/', views.logoutpage, name='logout'),
]
