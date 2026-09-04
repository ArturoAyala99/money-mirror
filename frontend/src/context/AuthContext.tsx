import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react'
import { register as apiRegister, login as apiLogin, getMe, logout as apiLogout } from '../api/auth';
import type { UserData, RegisterData, LoginData } from '../api/auth';

// Contexto global de autenticación

// Definir el tipo del contexto
interface AuthContextType{
    user: UserData | null;
    loading: boolean;
    register: (data: RegisterData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

// Crear el contexto con valores por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para el provider
interface AuthProviderProps{
    children: ReactNode;
}

// Provider que envuelve la aplicación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Verificar si hay un token al cargar la app
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token){
                try{
                    const userData = await getMe();
                    setUser(userData);
                } catch (error){
                    // token inválido o expirado, eliminarlo
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    setUser(null);
                }
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    // Función de register
    const register = async (data: RegisterData) => {
        try{
            // 1. Registrar al usuario
            await apiRegister(data);
            // 2. Iniciar sesión automáticamente
            await login({username: data.username, password: data.password});
        } catch (error){
            throw error;
        }
    }

    // Función de login
    const login = async (data: LoginData) => {
        try{
            await apiLogin(data);
            const userData = await getMe();
            setUser(userData);
        } catch (error){
            throw error;
        }
    };

    // Función de logout
    const logout = () => {
        apiLogout();
        setUser(null);
    };

    // Valores que estarán disponibles en toda la app
    const values = {
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }

    return context;
};