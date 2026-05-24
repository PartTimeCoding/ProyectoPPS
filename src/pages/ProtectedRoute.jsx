import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // Lee el usuario guardado (así como lo haces en Movimientos)
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioTevisat"));

  // Si alguien que no es personal intenta acceder, se le expulsa a la pantalla de login oculta
  if (!usuarioGuardado || !usuarioGuardado.username) {
    return <Navigate to="/portal-empleados" replace />;
  }

  return <Outlet />;
}