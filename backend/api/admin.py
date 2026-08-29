from django.contrib import admin

# Register your models here.
from .models import Account, Category, Transaction, FinancialGoal

@admin.register(Account) # Decorador: Registra el modelo en el admin usando la clase que definí debajo.
class AccountAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'type', 'current_balance', 'is_active']
    list_filter = ['type', 'is_active']
    search_fields = ['name', 'user__username']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'type', 'user', 'is_active']
    list_filter = ['type', 'is_active']
    search_fields = ['name']

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['date', 'user', 'account', 'category', 'amount', 'is_pending']
    list_filter = ['date', 'is_pending']
    search_fields = ['description']
    date_hierarchy = 'date'

@admin.register(FinancialGoal)
class FinancialGoalAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'target_amount', 'current_amount', 'priority', 'is_completed']
    list_filter = ['is_completed', 'priority']
    search_fields = ['name']