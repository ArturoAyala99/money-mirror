import React from 'react';
import Sidebar from '../Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-6 overflow-y-auto">
            {children}
        </main>
        </div>
    );
}

export default Layout;