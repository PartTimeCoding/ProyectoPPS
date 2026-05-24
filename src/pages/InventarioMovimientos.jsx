import { useState, useEffect } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Save } from "lucide-react";

export default function InventarioMovimientos() {
  const [tipoMovimiento, setTipoMovimiento] = useState("ingreso");
  const [equipos, setEquipos] = useState([]);

  const usuarioGuardado = JSON.parse(
    localStorage.getItem("usuarioTevisat") || "{}",
  );
  const nombrePersonal = usuarioGuardado.nombre
    ? `${usuarioGuardado.nombre} ${usuarioGuardado.apellido}`
    : "";

  const estadoInicialFormulario = {
    numero_serie: "",
    tipo_equipo: "",
    falla_reportada: "",
    estado: "Funcional",
    tecnico: "",
    personal: nombrePersonal,
    notas: "",
  };

  const [formData, setFormData] = useState(estadoInicialFormulario);

  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const response = await fetch("/api/inventario");
        if (response.ok) {
          const data = await response.json();
          setEquipos(data);
        }
      } catch (error) {
        console.error("Error al cargar equipos:", error);
      }
    };
    obtenerEquipos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (newType) => {
    setTipoMovimiento(newType);
    setFormData(estadoInicialFormulario);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url;
    let payload;

    if (tipoMovimiento === "ingreso") {
      url = "/api/ingresos";
      payload = {
        numero_serie: formData.numero_serie,
        tipo_equipo: formData.tipo_equipo,
        falla_reportada: formData.falla_reportada,
        estado: formData.estado,
        tecnico_devolucion: formData.tecnico,
        personal_recepcion: formData.personal,
        observaciones: formData.notas,
      };
    } else {
      url = "/api/salidas";
      payload = {
        numero_serie: formData.numero_serie,
        tecnico_recibe: formData.tecnico,
        personal_entrega: formData.personal,
        motivo: formData.notas,
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(
          `¡${tipoMovimiento === "ingreso" ? "Ingreso" : "Salida"} registrada con éxito!`,
        );
        setFormData(estadoInicialFormulario);
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Registro de Movimientos
        </h1>

        <div className="flex bg-gray-100 rounded-t-xl p-1 shadow-inner border border-gray-200">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
              tipoMovimiento === "ingreso"
                ? "bg-white text-blue-700 shadow-sm border border-gray-200"
                : "text-gray-500 hover:bg-gray-200"
            }`}
            onClick={() => handleTabChange("ingreso")}
          >
            <ArrowDownToLine size={20} /> Registrar Ingreso
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
              tipoMovimiento === "salida"
                ? "bg-white text-orange-600 shadow-sm border border-gray-200"
                : "text-gray-500 hover:bg-gray-200"
            }`}
            onClick={() => handleTabChange("salida")}
          >
            <ArrowUpFromLine size={20} /> Registrar Salida
          </button>
        </div>

        <div className="bg-white p-8 rounded-b-xl shadow-md border border-t-0 border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {tipoMovimiento === "ingreso" ? (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Serie
                    </label>
                    <input
                      required
                      type="text"
                      name="numero_serie"
                      value={formData.numero_serie}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border"
                      placeholder="Ej. HWTC12345678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Equipo
                    </label>
                    <select
                      required
                      name="tipo_equipo"
                      value={formData.tipo_equipo}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border bg-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">-- Seleccione el tipo --</option>
                      <option value="ONU">ONU</option>
                      <option value="Caja Digital">Caja Digital</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Falla Reportada (si aplica)
                    </label>
                    <input
                      type="text"
                      name="falla_reportada"
                      value={formData.falla_reportada}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border"
                      placeholder="Ej. Antena rota"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado Inicial
                    </label>
                    <select
                      required
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border bg-white"
                    >
                      <option value="Funcional">Funcional</option>
                      <option value="Descarte">Descarte</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipo a Despachar
                </label>
                <select
                  required
                  name="numero_serie"
                  value={formData.numero_serie}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border bg-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">
                    -- Seleccione un equipo del inventario --
                  </option>
                  {equipos.map((equipo) => (
                    <option
                      key={equipo.numero_serie}
                      value={equipo.numero_serie}
                    >
                      {equipo.numero_serie} - {equipo.tipo_equipo} (
                      {equipo.estado})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Solo se muestran equipos registrados previamente en el
                  inventario.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tipoMovimiento === "ingreso"
                    ? "Técnico que devuelve (si aplica):"
                    : "Técnico que retira:"}
                </label>
                <input
                  type="text"
                  name="tecnico"
                  value={formData.tecnico}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border"
                  placeholder="Nombre del técnico de calle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {tipoMovimiento === "ingreso"
                    ? "Personal que recibe en bodega:"
                    : "Personal que entrega desde bodega:"}
                </label>
                <input
                  required
                  type="text"
                  name="personal"
                  value={formData.personal}
                  readOnly
                  className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {tipoMovimiento === "ingreso"
                  ? "Observaciones / Estado al recibir:"
                  : "Motivo de la salida / Asignación:"}
              </label>
              <textarea
                required
                name="notas"
                value={formData.notas}
                onChange={handleChange}
                rows="3"
                className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border"
                placeholder={
                  tipoMovimiento === "ingreso"
                    ? "Ej. Equipo devuelto porque cliente canceló contrato..."
                    : "Ej. Asignado para instalación en zona norte..."
                }
              ></textarea>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-bold text-white transition shadow-sm ${
                  tipoMovimiento === "ingreso"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                <Save size={18} /> Guardar Registro
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
