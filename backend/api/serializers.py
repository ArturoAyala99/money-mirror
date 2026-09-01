from rest_framework import serializers 
from django.contrib.auth.models import User
from .models import Account, Category, Transaction, FinancialGoal

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

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']
    # Tiene un campo parent que es una auto-relación (una categoría puede tener subcategorías).
    # El serializer manejará este campo automáticamente, aceptando null o el ID de otra categoría.

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
    # Transaction tiene relaciones con Account y Category, así que el serializer manejará automáticamente los IDs de estos campos.

class FinancialGoalSerializer(serializers.ModelSerializer):
    # progress_percentage = serializers.IntegerField(read_only=True)
    # remaining_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = FinancialGoal
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']