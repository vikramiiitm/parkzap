from django.core import validators
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomUser
from rest_framework import permissions
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    number = serializers.CharField(required=True)
    # write only makes password read false.
    password = serializers.CharField(write_only=True,required=True,validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ('__all__')

    def validate_number(self,value):
        if len(value)<10 or len(value)>10 :
            raise serializers.ValidationError({"phoneerror":"phone number must be leght of 10"})
        return value
    # def validate_phone_number

class ListUsersSerializer(serializers.ModelSerializer):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    class Meta:
        model = CustomUser
        fields = ("email","name","dob","number","is_active")