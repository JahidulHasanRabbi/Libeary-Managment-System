from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Book

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=250)
    class Meta:
        model = User
        fields = ['username', 'password']

#register User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        return  User.objects.create_user(**validated_data)

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        return User.objects.create_staff(**validated_data)





class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'email', 'date_joined']

