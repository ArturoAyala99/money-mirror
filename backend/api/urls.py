from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import RegisterView, MeView, AccountViewSet, CategoryViewSet, TransactionViewSet, FinancialGoalViewSet, DashboardView

# Esto es solo para los ModelViewSet
router = DefaultRouter()
# Como no hay "queryset" en estas ModelViews, necesitamos poner el parámetro "basename"
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'goals', FinancialGoalViewSet, basename='goal')

urlpatterns = [
    # Autenticación
    path('auth/register/', RegisterView.as_view(), name='register'), # Registra un nuevo usuario
    path('auth/login/', TokenObtainPairView.as_view(), name='login'), # Inicia sesión y devuelve access y refresh tokens
    path('auth/refresh/', TokenRefreshView.as_view(), name='refresh'), # Refresca el access token usando el refresh token
    path('auth/me/', MeView.as_view(), name='me'), # Devuelve los datos del usuario autenticado
    # Router (Account y Category)
    # Ya se declaran todas las rutas (CRUD), podemos usar "CategoryViewSet.as_view" pero no es recomendable, quitamos la ventaja principal que es ahorrar código
    path('', include(router.urls)),
    # Dashboard
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
