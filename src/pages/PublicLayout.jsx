import { Outlet, Link, NavLink } from 'react-router-dom';
import logo from '../assets/tevisat_logo.png';

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

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-blue-800 hover:bg-blue-500 hover:text-white'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar Exclusivo para Clientes */}
      <header className="bg-white-400 text-blue-500 shadow-md p-3">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <Link to="/"><img src={logo} alt="Logo de Tevisat" className="h-35" /></Link>
          <nav className="flex gap-2 font-medium">
            <NavItem to="/">Inicio</NavItem>
            <NavItem to="/tevisat">Quienes Somos</NavItem>
            <NavItem to="/diagnostico">Soporte Técnico</NavItem>
            <NavItem to="/contacto">Contacto</NavItem>
          </nav>
        </div>
      </header>

      {/* Aquí se renderizarán las páginas públicas */}
      <main className="grow">
        <Outlet />
      </main>

      <footer className="bg-blue-900 text-white text-center py-5 mt-auto">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-white-400 mb-2">© 2026 TEVISAT. Todos los derechos reservados.</p>
          <a href="https://www.facebook.com/tevisat" target="_blank" rel="noopener noreferrer" className="inline-block hover:text-blue-400 transition-colors">
            <FacebookIcon size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}