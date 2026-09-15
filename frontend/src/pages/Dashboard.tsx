import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboardData } from '../api/dashboard';
import type { DashboardData } from '../api/dashboard';

const Dashboard = () => {
/*
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try{
                const responseData = await getDashboardData();
                setStats(responseData);
                
            } catch(error){
                console.error(error);
                setError('Error al cargar el dashboard');
            } finally{
                setLoading(false);
            }
        }

        fetchDashboardData();

    }, []);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Cargando estadísticas...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
            {error}
        </div>
        );
    }

    if (!stats) {
        return (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
            No se pudieron cargar los datos del dashboard.
        </div>
        );
    }
*/
    return (
        <h1>Dashboard</h1>
    );
    return (

        {/*
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            Título con saludo
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Bienvenido, {user?.username} 👋
            </h1>

        </div>*/}
        
    );
}

export default Dashboard;