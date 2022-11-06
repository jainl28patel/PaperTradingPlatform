from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserDetail
from django.contrib.auth import authenticate ,login, logout
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_exist = User.objects.filter(username=validated_data['username'])
        if(len(user_exist)!=0):
            raise serializers.ValidationError({'username': 'Username already exist'})
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

    def get(self, username):
        user = User.objects.all().filter(username=username)
        return user

class JwtSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ('id', 'username', 'jwt_token')

