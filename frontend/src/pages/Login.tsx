import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    // variables locales
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // hooks de contexto y navegación
    const { login } = useAuth();
    const navigate = useNavigate();

    // funciones
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try{
            await login({username, password});
            navigate('/');
        } catch(error: any){
            setError(error.response?.data?.detail || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 transition-all">
                {/* Logo y título */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">💰 MoneyMirror</h1>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Inicia sesión en tu cuenta</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Usuario
                        </label>
                        <input 
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Ingresa tu usuario"
                            autoComplete="username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Ingresa tu contraseña"
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={isLoading} className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>

                {/* Enlace a registro */}
                <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline font-medium">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;