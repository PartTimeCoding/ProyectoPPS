import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Diagnostico from "./pages/Diagnostico";
import Inventario from "./pages/Inventario";
import InventarioMovimientos from "./pages/InventarioMovimientos";
import HistorialMovimientos from "./pages/HistorialMovimientos";
import Contacto from "./pages/Contacto";
import Tevisat from "./pages/Tevisat";
import Login from "./pages/Login";
import RegistroUsuarios from "./pages/RegistroUsuarios";
import PublicLayout from "./pages/PublicLayout";
import PrivateLayout from "./pages/PrivateLayout";
import ProtectedRoute from "./pages/ProtectedRoute";

// Componente para proteger rutas que solo deben ser accesibles para administradores
const AdminRoute = ({ children }) => {
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioTevisat") || "{}");
  // Si el usuario no es administrador, lo redirige a la página principal del panel.
  if (usuarioGuardado?.rol !== 'Administrador') {
    return <Navigate to="/admin/inventario" replace />;
  }
  return children;
};

// Componente para rutas que solo deben ser visibles si el usuario NO ha iniciado sesión (como el Login)
const PublicOnlyRoute = ({ children }) => {
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioTevisat") || "null");
  // Si ya hay un usuario, lo redirige al panel en lugar de mostrarle el login de nuevo.
  if (usuarioGuardado) {
    return <Navigate to="/admin/inventario" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Navigate to="/" replace />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/tevisat" element={<Tevisat />} />
        </Route>

        {/* --- RUTA DE LOGIN (Pública pero sin el layout de cliente) --- */}
        <Route path="/portal-empleados" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />

        {/* --- RUTAS PRIVADAS (Para Empleados/Admin) --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<PrivateLayout />}>
            <Route index element={<Navigate to="inventario" replace />} />
            <Route path="inventario" element={<Inventario />} />
            <Route path="movimientos" element={<InventarioMovimientos />} />
            <Route path="historial" element={<HistorialMovimientos />} />
            <Route path="usuarios" element={<AdminRoute><RegistroUsuarios /></AdminRoute>} />
          </Route>
        </Route>

        {/* Redirección por si alguien entra a las rutas antiguas */}
        <Route path="/login" element={<Navigate to="/portal-empleados" replace />} />
        <Route path="/inventario" element={<Navigate to="/admin/inventario" replace />} />
        <Route path="/inventario-movimientos" element={<Navigate to="/admin/movimientos" replace />} />
        <Route path="/historial-movimientos" element={<Navigate to="/admin/historial" replace />} />
        <Route path="/usuarios" element={<Navigate to="/admin/usuarios" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
