import axios from 'axios'

// Cliente Axios configuración

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor de solicitud: añade el token automáticamente
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta: maneja errores de autenticación
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401){
            // Token expirado o inválido
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token'); // Si también estás usando un token de actualización
            window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
        }
        return Promise.reject(error); // Rechaza el error para que pueda ser manejado por el llamador
    }
);

export default apiClient;
