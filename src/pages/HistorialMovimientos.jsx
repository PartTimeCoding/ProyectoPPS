import { useState, useEffect } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Clock } from 'lucide-react';

export default function HistorialMovimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerMovimientos = async () => {
      try {
        const response = await fetch('/api/movimientos');
        if (response.ok) {
          const data = await response.json();
          setMovimientos(data);
        }
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      } finally {
        setCargando(false);
      }
    };
    
    obtenerMovimientos();
  }, []);

  const formatearFecha = (fechaISO) => {
    const opciones = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(fechaISO).toLocaleDateString('es-HN', opciones);
  };

  return (
    <div className="grow w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Clock size={28} className="text-blue-600" /> 
              Bitácora de Movimientos
            </h1>
            <p className="text-gray-500 mt-1">Historial completo de ingresos y salidas del inventario</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-800 text-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Fecha y Hora</th>
                <th className="px-6 py-4 font-semibold">Tipo</th>
                <th className="px-6 py-4 font-semibold">No. Serie</th>
                <th className="px-6 py-4 font-semibold">Técnico</th>
                <th className="px-6 py-4 font-semibold">Personal Bodega</th>
                <th className="px-6 py-4 font-semibold">Notas / Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cargando ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">Cargando historial...</td></tr>
              ) : movimientos.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No hay movimientos registrados</td></tr>
              ) : (
                movimientos.map((mov, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600">{formatearFecha(mov.fecha)}</td>
                    <td className="px-6 py-4 font-medium">
                      <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-bold border
                        ${mov.tipo_movimiento === 'Ingreso' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                        {mov.tipo_movimiento === 'Ingreso' ? <ArrowDownToLine size={14} /> : <ArrowUpFromLine size={14} />}
                        {mov.tipo_movimiento}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">{mov.numero_serie}</td>
                    <td className="px-6 py-4 text-gray-600">{mov.tecnico || <span className="text-gray-400 italic">No especificado</span>}</td>
                    <td className="px-6 py-4 text-gray-600">{mov.personal}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={mov.notas}>
                      {mov.notas || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}