import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("usuarioTevisat", JSON.stringify(data.user));
        navigate('/admin/inventario'); // Redirige al panel privado
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        
        <div className="bg-blue-900 p-8 text-center">
          <h1 className="text-3xl font-bold text-white tracking-wider">TEVISAT</h1>
          <p className="text-blue-100 mt-2 text-sm uppercase tracking-widest">Sistema de Inventario</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm border border-red-200 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input type="text" name="username" required value={credenciales.username} onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors" 
                  placeholder="Ingrese el usuario" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input type="password" name="password" required value={credenciales.password} onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors" 
                  placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" disabled={cargando} className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-4 rounded-md transition shadow-md disabled:opacity-70 flex justify-center items-center mt-4">
              {cargando ? 'Verificando...' : 'Entrar al Sistema'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
