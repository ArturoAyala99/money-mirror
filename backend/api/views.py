from rest_framework import generics, permissions # Importa las vistas genéricas (CreateAPIView, RetrieveAPIView) y el sistema de permisos (AllowAny, IsAuthenticated) de DRF.
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    """Registro de nuevos usuarios"""
    queryset = User.objects.all() # Definimos el conjunto de datos sobre el que va a trabajar la vista
    permission_classes = [permissions.AllowAny] #  Define quién puede acceder a este endpoint. (cualquiera puede registrarse)
    serializer_class = UserSerializer # Declaramos el serilizer a utilizar

    # es un nombre de función que Django RF reconoce y llama automáticamente
    def perform_create(self, serializer):
        # Guarda el usuario con password hasheado
        user = serializer.save() # El serializer valida los datos (username, email, password) y crea un objeto User
        user.set_password(self.request.data.get('password')) # Si solo hicieramos serializer.save(), la contraseña se guardaría en texto plano. set_password() encripta la contraseña.
        user.save() # Guardamos en BD

class MeView(generics.RetrieveAPIView): # Perfil de usuario
    """Obtiene los datos del usuario autenticado"""
    permission_classes = [permissions.IsAuthenticated] # Seguridad: significa que debes estar logueado y enviar un token válido para acceder a este endpoint.
    serializer_class = UserSerializer #  Usa UserSerializer para convertir los datos del usuario en JSON.

    def get_object(self):
        return self.request.user
    '''
    Normalmente, RetrieveAPIView busca un objeto por su ID en la URL.
    En este caso, queremos que el usuario solo pueda ver sus propios datos.
    Ignoramos completamente la URL y simplemente devolvemos self.request.use
    '''