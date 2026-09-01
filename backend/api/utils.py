from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta

'''
Este archivo contiene las funciones que calculan los datos del dashboard. 
Esto mantiene views.py limpio y organizado.
Todas las funciones reciben "user" (instancia de User autenticado)
'''

def get_total_balance(user):
    """Calcula el saldo total sumando todas las cuentas del usuario"""
    try:
        # traer solo cuentas que estén activas
        # "aggregate" Permite aplicar operaciones matemáticas (suma, promedio o valor máximo) a columnas completas de una tabla
        active_accounts_total = user.accounts.filter(is_acvtive=True).aggregate(
            total=Sum('current_balance')
        )
        return active_accounts_total['total']
    except ValueError:
        pass

def get_monthly_income(user):
    """Calcular la suma de todos los ingresos del mes actual"""
    try:
        fecha_actual = timezone.now().date()
        primer_dia_mes = fecha_actual.replace(day=1)
        
        # "amount__gt=0" significa "amount > 0", representa el operador de comparación mayor que
        # "__lte" significa "menor o igual que"
        ingresos = user.transactions.filter(amount__gt=0, date__gt=primer_dia_mes, date__lte=fecha_actual).aggregate(
            total=Sum('amount')
        )

        if not ingresos['total']:
            return 0.00
        
        return ingresos['total']
    
    except ValueError:
        pass

def get_monthly_expenses(user):
    """Calcular la suma de todos los gastos del mes actual (devuelve el valor absoluto)"""
    try:
        fecha_actual = timezone.now().date()
        primer_dia_mes = fecha_actual.replace(day=1)

        # "amount__lt" significa "menor que"
        gastos = user.transactions.filter(amount__lt=0, date__gt=primer_dia_mes, date__lte=fecha_actual).aggregate(
            total=Sum('amount')
        )

        if not gastos['total']:
            return 0.00
        
        return abs(gastos['total'])
    
    except ValueError:
        pass

def spending_by_category(user):
    """Agrupar los gastos del mes actual por categoría y calcular el porcentaje que representa cada una sobre el total de gastos"""

    try:
        fecha_actual = timezone.now().date()
        primer_dia_mes = fecha_actual.replace(day=1)

        # "values()" agrupa los resultados por la columna especificada
        # "annotate" permite agregar un valor calculado a cada grupo, en este caso la suma de los gastos por categoría
        gastos_por_categoria = user.transactions.filter(
            amount__lt=0,
            date__gt=primer_dia_mes,
            date__lte=fecha_actual,
        ).values('category').annotate(total=Sum('amount'))

        

        
    except ValueError:
        pass