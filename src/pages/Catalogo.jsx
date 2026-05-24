const WhatsAppIcon = ({ size = 18, ...props }) => (
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

export default function Catalogo() {
  const handleSolicitar = (plan) => {
    const numeroVentas = "50496730717"; // Reemplazar con el número de WhatsApp de ventas
    const mensaje = `Hola TEVISAT, estoy interesado/a en contratar el plan "${plan}". Me gustaría recibir más información.`;
    const url = `https://wa.me/${numeroVentas}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="grow w-full">
      <div className="bg-white border-b border-gray-200 py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Nuestro Catálogo de Planes
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Explora todas nuestras velocidades de fibra óptica. Tenemos un plan
          perfecto para cada necesidad y presupuesto.
        </p>
      </div>

      {/* Sección de Tarjetas */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 items-start">
          {/*Tarjeta 1*/}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Básico 100MB
            </h2>
            <div className="my-6 text-center">
              <span className="text-5xl font-extrabold text-gray-900">
                L.650
              </span>
              <span className="text-gray-500 font-medium">/mes</span>
            </div>
            <ul className="text-gray-600 space-y-4 mb-8">
              <li className="flex items-center gap-2">
                ✓ 100 Mbps Fibra Óptica
              </li>
              <li className="flex items-center gap-2">✓ ONU Doble Banda</li>
              <li className="flex items-center gap-2">✓ Incluye Caja HD TV</li>
            </ul>
            <button
              onClick={() => handleSolicitar("Básico 100MB")}
              className="w-full mt-auto flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <WhatsAppIcon size={18} /> Solicitar
            </button>
          </div>

          {/* Tarjeta 2 - Destacado */}
          <div className="bg-blue-900 rounded-2xl shadow-xl border border-blue-800 p-8 transform md:-translate-y-4 relative flex flex-col h-full">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
                Más Popular
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white text-center">
              Residencial 300MB
            </h2>
            <div className="my-6 text-center">
              <span className="text-5xl font-extrabold text-white">L.1100</span>
              <span className="text-blue-200 font-medium">/mes</span>
            </div>
            <ul className="text-blue-100 space-y-4 mb-8">
              <li className="flex items-center gap-2">
                ✓ 300 Mbps Fibra Óptica
              </li>
              <li className="flex items-center gap-2 text-white">
                ✓ ONU WiFi 6
              </li>
              <li className="flex items-center gap-2 text-white">
                ✓ Incluye 2 Cajas HD TV
              </li>
            </ul>
            <button
              onClick={() => handleSolicitar("Residencial 300MB")}
              className="w-full mt-auto flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-200"
            >
              <WhatsAppIcon size={18} /> Solicitar
            </button>
          </div>

          {/* Tarjeta 3 - Gamer/Pro */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Profesional 500MB
            </h2>
            <div className="my-6 text-center">
              <span className="text-5xl font-extrabold text-gray-900">
                L.1650
              </span>
              <span className="text-gray-500 font-medium">/mes</span>
            </div>
            <ul className="text-gray-600 space-y-4 mb-8">
              <li className="flex items-center gap-2">
                ✓ 500 Mbps Fibra Óptica
              </li>
              <li className="flex items-center gap-2">✓ ONU WiFi 6</li>
              <li className="flex items-center gap-2">
                ✓ Incluye 3 Cajas HD TV
              </li>
            </ul>
            <button
              onClick={() => handleSolicitar("Profesional 500MB")}
              className="w-full mt-auto flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <WhatsAppIcon size={18} /> Solicitar
            </button>
          </div>

          {/* Tarjeta 4 - Corporativo */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Corporativo
            </h2>
            <div className="my-6 text-center">
              <span className="text-3xl font-extrabold text-gray-900">
                A la medida
              </span>
            </div>
            <ul className="text-gray-600 space-y-4 mb-8">
              <li className="flex items-center gap-2">✓ Enlace Dedicado</li>
              <li className="flex items-center gap-2">✓ IP Pública Fija</li>
              <li className="flex items-center gap-2">✓ SLA Garantizado</li>
            </ul>
            <button
              onClick={() => handleSolicitar("Corporativo")}
              className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <WhatsAppIcon size={18} /> Solicitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
