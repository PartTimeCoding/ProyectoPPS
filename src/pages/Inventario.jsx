import { useState, useEffect } from 'react';
import { Edit2, RefreshCcw, Save, X } from 'lucide-react';

export default function Inventario() {
  const [equipos, setEquipos] = useState([]);

  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const [formData, setFormData] = useState({ numero_serie: '', tipo_equipo: '', falla_reportada: '', estado: 'Funcional' });

  useEffect(() => {
    obtenerInventario();
  }, []);

  const obtenerInventario = async () => {
    try {
      const response = await fetch('/api/inventario');
      const data = await response.json();
      setEquipos(data);
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
    }
  };

  const abrirParaEditar = () => {
    if (!equipoSeleccionado) return;
    const equipo = equipos.find(e => e.numero_serie === equipoSeleccionado);
    setFormData(equipo);
    setMostrarFormulario(true);
  };

  const guardarRegistro = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/inventario/${formData.numero_serie}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEquipos(equipos.map(e => e.numero_serie === formData.numero_serie ? formData : e));
        setMostrarFormulario(false);
      } else {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        if (isJson) {
          const errorData = await response.json();
          alert(`Error al actualizar: ${errorData.error}`);
        } else {
          alert(`Error de servidor: ${response.status} (${response.statusText}).`);
        }
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="grow w-full py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Control de Inventario</h1>
            <p className="text-gray-500 mt-1">Gestión de equipos en laboratorio de redes</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-t-xl border border-gray-200 border-b-0 flex gap-2 shadow-sm">
          <button onClick={abrirParaEditar} disabled={!equipoSeleccionado} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-md font-medium transition text-sm">
            <Edit2 size={16} /> Editar
          </button>
          <div className="grow"></div>
          <button onClick={() => setEquipoSeleccionado(null)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-md font-medium transition text-sm">
            <RefreshCcw size={16} /> Deseleccionar
          </button>
        </div>

        {mostrarFormulario && (
          <div className="bg-blue-50 p-6 border border-blue-200 border-b-0 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-blue-900">Editar Equipo</h3>
              <button onClick={() => setMostrarFormulario(false)} className="text-blue-500 hover:text-blue-800"><X size={20}/></button>
            </div>
            <form onSubmit={guardarRegistro} className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Serie</label>
                <input type="text" value={formData.numero_serie} disabled className="w-full border-gray-300 rounded-md shadow-sm p-2 border bg-gray-200 cursor-not-allowed text-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Equipo</label>
                <select required value={formData.tipo_equipo} onChange={(e)=>setFormData({...formData, tipo_equipo: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm p-2 border bg-white">
                  <option value="">-- Seleccione el tipo --</option>
                  <option value="ONU">ONU</option>
                  <option value="Caja Digital">Caja Digital</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Falla Reportada</label>
                <input required type="text" value={formData.falla_reportada} onChange={(e)=>setFormData({...formData, falla_reportada: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" placeholder="Ej. ONU quemada"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select value={formData.estado} onChange={(e)=>setFormData({...formData, estado: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm p-2 border bg-white">
                  <option value="Funcional">Funcional</option>
                  <option value="Descarte">Descarte</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registrado por</label>
                <input type="text" value={formData.personal || 'Sin registro'} disabled className="w-full border-gray-300 rounded-md shadow-sm p-2 border bg-gray-200 cursor-not-allowed text-gray-600" />
              </div>
              <div className="col-span-4 flex justify-end mt-2">
                <button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-bold transition shadow-sm">
                  <Save size={18} /> Guardar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-800 text-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">No. Serie</th>
                <th className="px-6 py-4 font-semibold">Equipo</th>
                <th className="px-6 py-4 font-semibold">Falla Reportada</th>
                <th className="px-6 py-4 font-semibold">Registrado por</th>
                <th className="px-6 py-4 font-semibold text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipos.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No hay equipos registrados</td></tr>
              ) : (
                equipos.map((equipo) => (
                  <tr 
                    key={equipo.numero_serie} 
                    onClick={() => setEquipoSeleccionado(equipo.numero_serie)}
                    className={`cursor-pointer transition-colors duration-150 ${equipoSeleccionado === equipo.numero_serie ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{equipo.numero_serie}</td>
                    <td className="px-6 py-4 text-gray-600">{equipo.tipo_equipo}</td>
                    <td className="px-6 py-4 text-gray-600">{equipo.falla_reportada}</td>
                    <td className="px-6 py-4 text-gray-600">{equipo.personal || '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shadow-sm border
                        ${equipo.estado === 'Funcional' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                        {equipo.estado}
                      </span>
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