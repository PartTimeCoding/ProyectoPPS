import {
  Building,
  Target,
  Eye,
  Award,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";
import empleadosTevisat from "../assets/empleados_tevisat.jpg";

export default function Tevisat() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Conoce a TEVISAT
          </h1>
          <p className="mt-4 text-xl text-blue-200">
            Más de 45 años conectando a Honduras con tecnología de punta.
          </p>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Building className="text-blue-600" size={32} />
              Nuestra Historia
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              Compañía de Televisión Vía Satélite S.A. (TEVISAT) fsue fundada
              por el Ing. Abraham Dip Handal, empezando como una pequeña empresa
              de telecomunicaciones. En la actualidad, con más de 45 años de
              experiencia, nos dedicamos a proveer servicios residenciales y
              corporativos de televisión e internet por cable y fibra óptica.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed text-justify">
              Nuestra red de cobertura abarca La Ceiba y sus alrededores. Cabe
              mencionar también que Tela opera bajo una distinta administración
              y sistema contable, por lo que sus clientes pueden hacer pagos y
              solicitudes únicamente en las oficinas de dicha ciudad.
            </p>
          </div>
          <div class="mx-15">
            <img
              src={empleadosTevisat}
              alt="Equipo de Tevisat"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mision y Vision Section */}
      <div className="bg-white py-16 px-4 border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-200">
            <Target className="text-blue-600 mb-4" size={40} />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Misión</h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              Somos una empresa 100% Hondureña enfocada en brindar a nuestros
              clientes el mejor servicio, con una alta calidad superando sus
              expectativas.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-200">
            <Eye className="text-blue-600 mb-4" size={40} />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Visión</h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              Mantenernos como la empresa líder de Honduras en
              telecomunicaciones, mediante el uso de tecnología de última
              generación, garantizando a nuestros clientes la más alta calidad,
              los mejores precios del mercado y una atención personalizada.
            </p>
          </div>
        </div>
      </div>

      {/* Valores Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-600 p-4 rounded-full mb-3">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Calidad</h3>
              <p className="text-gray-500 mt-1">
                Compromiso con la excelencia en cada conexión.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-3">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Innovación
              </h3>
              <p className="text-gray-500 mt-1">
                Adoptamos tecnología de punta para un mejor servicio.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 text-red-600 p-4 rounded-full mb-3">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Compromiso
              </h3>
              <p className="text-gray-500 mt-1">
                Dedicados a la satisfacción de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
