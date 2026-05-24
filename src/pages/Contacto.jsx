import { Phone, MapPin, Clock } from 'lucide-react';

const WhatsAppIcon = ({ size = 20, ...props }) => (
  <svg
    aria-label="WhatsApp"
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.161-.916-2.207c-.246-.59-.492-.508-.67-.518-.173-.01-.371-.01-.57-.01s-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871-.118.571-.355 1.739-1.428 1.984-1.984.246-.557.246-1.027.173-1.174-.074-.149-.273-.224-.57-.372zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.373 0-9.75-4.377-9.75-9.75S6.627 2.25 12 2.25 21.75 6.627 21.75 12 17.373 21.75 12 21.75z" />
  </svg>
);

export default function Contacto() {
  const handleWhatsAppClick = (department) => {
    let number;
    let message;
    if (department === 'ventas') {
      number = '50496730717'; // Número de Ventas
      message = 'Hola TEVISAT, estoy interesado en sus servicios y me gustaría obtener más información.';
    } else if (department === 'soporte') {
      number = '50496730717'; // Número de Soporte (usar el correcto)
      message = 'Hola TEVISAT, necesito soporte técnico con mi servicio.';
    }
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900">Ponte en Contacto</h1>
          <p className="mt-4 text-lg text-gray-500">Estamos listos para atenderte. Elige el canal que prefieras.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Columna de Información de Contacto */}
          <div className="space-y-8">
            
            {/* Tarjeta de Ventas */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Ventas y Contrataciones</h2>
              <p className="text-gray-600 mb-6">¿Interesado en nuestros planes? Nuestro equipo de ventas te ayudará a elegir la mejor opción.</p>
              <button 
                onClick={() => handleWhatsAppClick('ventas')}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                <WhatsAppIcon /> Escribir a Ventas
              </button>
            </div>

            {/* Tarjeta de Soporte */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-orange-800 mb-4">Soporte Técnico</h2>
              <p className="text-gray-600 mb-6">¿Tienes problemas con tu servicio? Contacta a nuestros expertos para una solución rápida.</p>
              <button 
                onClick={() => handleWhatsAppClick('soporte')}
                className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                <WhatsAppIcon /> Escribir a Soporte
              </button>
            </div>

            {/* Tarjeta de Información de Oficina */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-5">Nuestra Oficina Principal</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-4">
                  <MapPin className="text-gray-500 mt-1 shrink-0" size={20} />
                  <span>Barrio El Centro, 4 Calle, frente a Bicipartes Ceibeña, La Ceiba, Atlántida.</span>
                </li>
                <li className="flex items-center gap-4">
                  <Clock className="text-gray-500 shrink-0" size={20} />
                  <span>Lunes a Viernes: 8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="text-gray-500 shrink-0" size={20} />
                  <span>Llamadas: 2408-4660 / *8878</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna del Mapa */}
          <div className="h-full min-h-125 rounded-xl shadow-md overflow-hidden sticky top-24">
            <iframe
              src="https://maps.google.com/maps?q=TEVISAT%2C%20La%20Ceiba&ll=15.7885,-86.792&t=&z=18&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Tevisat en La Ceiba"
            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
