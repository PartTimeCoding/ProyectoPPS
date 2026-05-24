import { useState, useEffect } from 'react';
import { ShieldAlert, Save, UserPlus, X, LogIn, LogOut } from 'lucide-react';

export default function RegistroUsuarios() {
  const [vista, setVista] = useState('usuarios');
  const [usuarios, setUsuarios] = useState([]);
  const [bitacora, setBitacora] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const estadoInicialFormulario = {
    username: '', password: '', nombre: '', apellido: '', rol: 'Bodega'
  };
  const [formData, setFormData] = useState(estadoInicialFormulario);

  useEffect(() => {
    obtenerUsuarios();
    obtenerBitacora();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch('/api/usuarios');
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const obtenerBitacora = async () => {
    try {
      const response = await fetch('/api/bitacora-sesiones');
      if (response.ok) {
        const data = await response.json();
        setBitacora(data);
      }
    } catch (error) {
      console.error("Error al obtener bitácora:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatearFecha = (fechaISO) => {
    const opciones = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(fechaISO).toLocaleDateString('es-HN', opciones);
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('¡Usuario registrado con éxito!');
        obtenerUsuarios();
        setFormData(estadoInicialFormulario);
        setMostrarFormulario(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="grow w-full py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShieldAlert size={28} className="text-red-600" /> 
              Control de Accesos
            </h1>
            <p className="text-gray-500 mt-1">Gestión de usuarios y personal autorizado</p>
          </div>
          
          {vista === 'usuarios' && (
            <button 
              onClick={() => setMostrarFormulario(true)} 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold transition shadow-sm"
            >
              <UserPlus size={18} /> Nuevo Usuario
            </button>
          )}
        </div>

        <div className="flex gap-6 mb-6 border-b border-gray-200">
          <button 
            onClick={() => setVista('usuarios')} 
            className={`pb-3 px-2 font-bold text-sm transition-colors border-b-2 ${vista === 'usuarios' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Gestión de Usuarios
          </button>
          <button 
            onClick={() => { setVista('bitacora'); obtenerBitacora(); }} 
            className={`pb-3 px-2 font-bold text-sm transition-colors border-b-2 ${vista === 'bitacora' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Bitácora de Accesos
          </button>
        </div>

        {vista === 'usuarios' ? (
          <>
            {mostrarFormulario && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Registrar Personal</h3>
              <button onClick={() => setMostrarFormulario(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={guardarUsuario} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className="block text-sm font-medium mb-1">Nombre</label><input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2 border" placeholder="Ej. Carlos"/></div>
              <div><label className="block text-sm font-medium mb-1">Apellido</label><input required type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2 border" placeholder="Ej. Martínez"/></div>
              <div>
                <label className="block text-sm font-medium mb-1">Rol de Acceso</label>
                <select name="rol" value={formData.rol} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2 border bg-white">
                  <option value="Bodega">Personal de Bodega</option>
                  <option value="Tecnico">Técnico de Campo</option>
                  <option value="Administrador">Administrador Total</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Usuario (Username)</label><input required type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2 border" placeholder="Ej. cmartinez"/></div>
              <div><label className="block text-sm font-medium mb-1">Contraseña</label><input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border-gray-300 rounded-md p-2 border" placeholder="••••••••"/></div>
              <div className="flex items-end">
                <button type="submit" className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-md font-bold transition">
                  <Save size={18} /> Guardar
                </button>
              </div>
            </form>
          </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Usuario</th>
                    <th className="px-6 py-4 font-semibold">Nombre Completo</th>
                    <th className="px-6 py-4 font-semibold">Rol</th>
                    <th className="px-6 py-4 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {usuarios.map((user) => (
                    <tr key={user.id_usuario} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">@{user.username}</td>
                      <td className="px-6 py-4 text-gray-600">{user.nombre} {user.apellido}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.rol === 'Administrador' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                          {user.rol}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                          {user.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Fecha y Hora</th>
                  <th className="px-6 py-4 font-semibold">Usuario</th>
                  <th className="px-6 py-4 font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bitacora.map((registro) => (
                  <tr key={registro.id_bitacora} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600">{formatearFecha(registro.fecha)}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">@{registro.username} <span className="text-gray-500 font-normal ml-1">({registro.nombre} {registro.apellido})</span></td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-bold border ${registro.accion === 'Login' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                        {registro.accion === 'Login' ? <LogIn size={14} /> : <LogOut size={14} />}
                        {registro.accion}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}