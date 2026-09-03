import apiClient from './api/client';

function App() {

  const testConnection = async () => {
    try {
      // Intentar obtener el perfil (esto fallará si no hay token, pero probará la conexión)
      const response = await apiClient.get('/auth/me/');
      console.log('Conexión exitosa:', response.data);
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">MoneyMirror</h1>
        <button
          onClick={testConnection}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Probar Conexión
        </button>
      </div>
    </div>
      
  )
}

export default App
