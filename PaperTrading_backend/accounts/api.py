from rest_framework import generics
from django.http import HttpResponse
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # return HttpResponse(serializer.data)

# API class to get data of all users from database in django
class GetUserAPI(generics.GenericAPIView):
    def get(self, request):
        serializer = UserSerializer()
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return HttpResponse(serializer.data)