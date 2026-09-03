import apiClient from './client';

// estandarizamos los tipos de datos
export interface RegisterData{
    username: string;
    email: string;
    password: string;
}

export interface LoginData{
    email: string;
    password: string;
}

export interface UserData{
    id: number;
    username: string;
    email: string;
    first_name: string; // django usa snake_case, por eso se declara así aquí
    last_name: string;
}

// funciones de autenticación
export const register = async (data: RegisterData): Promise<UserData> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
};

export const login = async (data: LoginData): Promise<{ access: string; refresh: string}> => {
    const response = await apiClient.post('/auth/login', data);
    if (response.data.access){
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
    }

    return response.data;
};

export const getMe = async (): Promise<UserData> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
};

export const logout = (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};