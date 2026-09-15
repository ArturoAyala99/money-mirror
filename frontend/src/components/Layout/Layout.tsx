import React, { useState } from 'react';
import Sidebar from '../Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // para el responsive design

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - visible en desktop, oculto en móvil por defecto */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:z-auto`}
            >
                <Sidebar closeSidebar={closeSidebar}/>

            </div>
            
            {/* Overlay (fondo oscuro) que aparece cuando el sidebar está abierto en móvil */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={closeSidebar} />
            )}

            {/* Contenido principal */}
            <main className="flex-1 min-h-screen overflow-x-hidden">
                {/* Botón para abrir sidebar en móvil */}
                <div className="lg:hidden p-4 bg-white border-b border-gray-200 flex items-center relative z-[60]">
                    <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100" aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}>
                        {isSidebarOpen ? (
                            // Icono "X" (cerrar)
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Icono hamburguesa (abrir)
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                    <span className="ml-3 text-xl font-semibold text-blue-600">💰 MoneyMirror</span>
                </div>

                {/* Contenido de la página con padding responsivo */}
                <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default Layout;