from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, MeView

urlpatterns = [
    # Autenticación
    path('auth/register/', RegisterView.as_view(), name='register'), # Registra un nuevo usuario
    path('auth/login/', TokenObtainPairView.as_view(), name='login'), # Inicia sesión y devuelve access y refresh tokens
    path('auth/refresh/', TokenRefreshView.as_view(), name='refresh'), # Refresca el access token usando el refresh token
    path('auth/me/', MeView.as_view(), name='me'), # Devuelve los datos del usuario autenticado
]
