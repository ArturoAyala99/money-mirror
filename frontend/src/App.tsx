import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';

// enrutador principal.


// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
}

function App() {

  const { loading } = useAuth();

 
    if (loading){
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-xl text-gray-600">Cargando...</p>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas (sin Layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Rutas protegidas (con Layout) */}
          <Route path="/" 
            element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} 
          />
          {/* Redirigir cualquier otra ruta al dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    ) 
      
}

export default App
