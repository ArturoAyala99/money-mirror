from rest_framework import serializers 
from django.contrib.auth.models import User
from .models import Account

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id'] # Estos campos NO se pueden modificar vía API (son automáticos)

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']