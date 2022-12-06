from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import models
from django.db.models import fields
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class AuthSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'},
                                     trim_whitespace=False)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request=self.context.get(
            'request'), username=username, password=password)
        if not user:
            msg = ('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        data['user'] = user
        return
