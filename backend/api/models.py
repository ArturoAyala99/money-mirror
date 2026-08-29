from django.db import models
from django.contrib.auth.models import User 
'''
El modelo User, lo tiene creado django por defecto,no es necesario crearlo manualmente:
Usuario (username, email, password, first_name, last_name)
Grupos (Group)
Permisos (Permission)
'''
class Account(models.Model):
    """Cuenta bancaria o de efectivo del usuario"""

    # tipos de cuenta
    ACCOUNT_TYPES = (
        ('DEBIT', 'Débito'),
        ('CREDIT', 'Crédito'),
        ('CASH', 'Efectivo'),
        ('SAVINGS', 'Ahorro'),
    )

    # relación con el usuario (cada cuenta pertenece a un usuario)
    # sin related_names no se podría acceder a las cuentas de un usuario desde el modelo User
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    # datos básicos de la cuenta (podría ser como un alias o descripción corta de la cuenta)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=ACCOUNT_TYPES) # solo acepta los tipos de cuenta que haya en ACCOUNT_TYPES
    # saldos
    initial_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    current_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    # configuracion
    currency = models.CharField(max_length=3, default='USD') # ISO 4217 currency code
    is_active = models.BooleanField(default=True) # indica si la cuenta está activa o inactiva
    # auditoría
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Define cómo se muestra el objeto cuando lo imprimes, lo ves en el admin, o en la terminal
    def __str__(self):
        return f"{self.name} - {self.user.username}"
    # Define configuraciones adicionales para el modelo (orden, nombres en el admin, etc.)
    class Meta:
        verbose_name = "Account"
        verbose_name_plural = "Accounts"
        ordering = ['name']

class Category(models.Model):
    """Categoría de gastos/ingresos (con subcategorías)"""
    
    # Tipos de categoría
    TYPE_CHOICES = (
        ('INCOME', 'Ingreso'),
        ('EXPENSE', 'Gasto'),
    )
    
    # relación con el usuario
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    # datos básicos
    name = models.CharField(max_length=100)
    # auto-relación para subcategorías (una categoría puede tener padre)
    parent = models.ForeignKey( # significa que esta categoria puede ser padre de otras subcategorías
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='subcategories'
    )
    # tipo de categoría (ingreso o gasto)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='EXPENSE')
    # personalización visual
    icon = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=7)
    # estado
    is_active = models.BooleanField(default=True)
    # auditoría
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        """Representación legible de la categoría"""
        if self.parent:
            return f"{self.parent.name} → {self.name}"
        return self.name
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ['name']

class Transaction(models.Model):
    """Transacción financiera (ingreso o gasto)"""
    
    # relación con el usuario
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    # relación con cuenta y categoría
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='transactions')
    # datos de la transacción
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    # estado
    is_pending = models.BooleanField(default=False)
    '''
    Indica si una transacción ya se "liquido" o "se hizo efectiva"
    - True (Pendiente): La transacción está "en el aire". Aparece en tu estado de cuenta de la tarjeta de crédito, pero aún no se ha cobrado definitivamente.
    - False (Confirmada/No Pendiente): La transacción ya se procesó y se refleja definitivamente en tu saldo disponible.
    '''
    # auditoría
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.date} - ${self.amount} ({self.category})"
    
    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
        ordering = ['-date', '-created_at']  # más reciente primero

class FinancialGoal(models.Model):
    """Meta de ahorro del usuario"""
    
    # Prioridades
    PRIORITY_CHOICES = (
        (1, 'Alta'),
        (2, 'Media'),
        (3, 'Baja'),
    )
    
    # relación con el usuario
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='goals')
    # datos de la meta
    name = models.CharField(max_length=200)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    # fechas y prioridad
    deadline = models.DateField(null=True, blank=True) # fecha límite de la meta
    priority = models.IntegerField(choices=PRIORITY_CHOICES)
    # estado
    is_completed = models.BooleanField(default=False)
    # auditoría
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.name} - ${self.current_amount} / ${self.target_amount}"
    
    class Meta:
        verbose_name = "Financial Goal"
        verbose_name_plural = "Financial Goals"
        ordering = ['-priority', 'deadline']  # primero las de mayor prioridad