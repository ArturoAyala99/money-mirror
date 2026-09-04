import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {

    // variables locales
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // hooks de contexto y navegación
    const { register } = useAuth();
    const navigate = useNavigate();

    // funciones
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        if(formData.password !== formData.confirmPassword){
            setError('Las contraseñas no coinciden');
            return;
        }
        setIsLoading(true);

        try{
            // 1. Registrar usuario (el login es automático)
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            navigate('/');

        } catch(error: any){
            setError(error.response?.data?.detail || 'Error al registrarse. Verifica tus credenciales.');
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
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Crea tu cuenta</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Usuario
                        </label>
                        <input
                            id="username"
                            name='username' // Aquí es necesario para que handleChange funcione correctamente
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Ingresa tu usuario"
                            autoComplete="username"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name='email' 
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Ingresa tu email"
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name='password' 
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Ingresa tu contraseña"
                            autoComplete="new-password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            name='confirmPassword' 
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Confirma tu contraseña"
                            autoComplete="new-password"
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={isLoading} className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                {/* Enlace a login */}
                <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">Inicia sesión</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;