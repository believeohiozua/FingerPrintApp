from django.utils import timezone
from rest_framework import serializers
from .models import Register
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
      model = User
      fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    url             = serializers.HyperlinkedIdentityField(
                            view_name='data:detail',
                            lookup_field='pk'
                            )
    user            = UserSerializer(read_only=True)    
    
    class Meta:
        model = Register
        fields = [
            'url',
            'pk',
            'user',
            'first_name',
            'last_name',
            'email',
            'address',
            'gender',
            'date_of_birth',
            'phone_number',
            'passport',
            'right_thumb',
            'right_index',
            'left_thumb',
            'left_index',
            'entry_officer',
            'date_of_entry',          
        ]


# AUTHENTICATION


# Register Serializer

class SignUpSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")

