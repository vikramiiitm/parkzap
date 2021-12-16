from django.http.response import Http404
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .serializers import RegisterSerializer, ListUsersSerializer
from rest_framework.views import APIView
from .models import CustomUser
from django.http import JsonResponse
from rest_framework import permissions
from django.http import Http404
from rest_framework import status
# from rest_framework 
# Create your views here.


class RegisterUser(APIView):
    def post(self,request,format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ViewUser(APIView):
    def get(self,request,format=None):
        user = CustomUser.objects.all()
        Serializer = ListUsersSerializer(user, many=True)
        return Response(Serializer.data)
