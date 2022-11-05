from datetime import timedelta
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import JwtSerializer, RegisterSerializer, UserSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import login, logout
from rest_framework_simplejwt.tokens import RefreshToken

#function to create JWT token
def get_tokens_for_user(user):

    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token
    access_token.set_exp(lifetime=timedelta(days=10))

    return {
        'refresh': str(refresh),
        'access': str(access_token),
    }

# Create your views here.
@api_view(['GET'])
def index(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    user = request.data
    serializer = RegisterSerializer(data=user)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#TODO : Add JWT token to the response and login the user

@api_view(['POST'])
def loginpage(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        user_data = User.objects.get(username=username)
        user_id = user_data.id
        jwt_token_access = get_tokens_for_user(user)['access']
        # jwt_token_refresh = get_tokens_for_user(user)['refresh']
        generate_jwt = JwtSerializer(data={
            'username': username,
            'id': user_id,
            'jwt_token': jwt_token_access
        })
        print(generate_jwt.data)
        # if user_data.is_valid():
        #     print(user_data['id'])
        # jwt_token = get_tokens_for_user(user_data)
        # generate_jwt = JwtSerializer.create(username, jwt_token)
        # if(generate_jwt):
        #     login(request, user)
        #     return Response(status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def logoutpage(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)
    