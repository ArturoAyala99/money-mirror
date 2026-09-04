import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive? 'bg-blue-100 text-blue-700 font-medium': 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`;

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
                <span className="text-2xl">💰</span>
                <span className="text-xl font-bold text-blue-600">MoneyMirror</span>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4 space-y-1">
                <NavLink to="/" className={linkClasses} end>
                    <span>📊</span> Dashboard
                </NavLink>

                <NavLink to="/accounts" className={linkClasses}> 
                    <span>🏦</span> Cuentas
                </NavLink>

                <NavLink to="/transactions" className={linkClasses}>
                    <span>💳</span> Transacciones
                </NavLink>

                <NavLink to="/goals" className={linkClasses}>
                    <span>🎯</span> Metas
                </NavLink>
            </nav>

            {/* Cerrar sesión */}
            <div className="p-4 border-t border-gray-200">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <span>🚪</span> Cerrar sesión
                </button>
            </div>

        </aside>
    )
}

export default Sidebar;