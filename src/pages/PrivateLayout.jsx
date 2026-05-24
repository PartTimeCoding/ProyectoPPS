import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, Monitor, Activity, ClipboardList, Users } from 'lucide-react';

const FacebookIcon = ({ size = 24, ...props }) => (
  <svg
    aria-label="Facebook"
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14H6.11v4.05h3.4V24h4.44V11.51h3.9l.4-4.05z" />
  </svg>
);

export default function PrivateLayout() {
  const navigate = useNavigate();
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioTevisat") || "{}");

  const handleLogout = async () => {
    if (usuarioGuardado && usuarioGuardado.username) {
      try {
        await fetch('/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: usuarioGuardado.username }),
        });
      } catch (error) {
        console.error("Error al registrar logout:", error);
      }
    }
    localStorage.removeItem("usuarioTevisat");
    navigate('/portal-empleados');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Barra lateral exclusiva del personal */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-center">TEVISAT Admin</h2>
          <p className="text-sm text-gray-400 mt-2 text-center">Hola, {usuarioGuardado.nombre}</p>
        </div>
        <nav className="flex flex-col p-4 gap-2 grow">
          <Link to="/admin/inventario" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded transition"><Monitor size={18}/> Inventario</Link>
          <Link to="/admin/movimientos" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded transition"><Activity size={18}/> Movimientos</Link>
          <Link to="/admin/historial" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded transition"><ClipboardList size={18}/> Historial</Link>
          {usuarioGuardado?.rol === 'Administrador' && (
            <Link to="/admin/usuarios" className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded transition"><Users size={18}/> Usuarios</Link>
          )}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full p-2 hover:bg-red-600 rounded transition text-red-400 hover:text-white font-medium">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Aquí se renderizarán los CRUDs y reportes */}
      <main className="grow flex flex-col h-screen overflow-y-auto">
        <div className="grow">
          <Outlet />
        </div>
        <footer className="bg-gray-900 text-gray-200 text-center p-3 border-t border-gray-300">
          <p className="text-xs mb-1">© 2026 TEVISAT. Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
}