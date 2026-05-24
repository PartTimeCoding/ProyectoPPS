import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, Send, User, Hash, ArrowLeft } from "lucide-react";

// Componente para una sección de FAQ colapsable
const FaqItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 px-2 text-gray-600 space-y-2 animate-fade-in-down">
          {children}
        </div>
      )}
    </div>
  );
};

// Datos para el formulario dinámico
const problemas = [
  {
    id: 'sin_internet',
    label: 'No tengo servicio de Internet',
    sub_problemas: [
      { id: 'luz_roja', label: 'Mi equipo (ONU/Router) tiene una luz roja parpadeando (LOS)' },
      { id: 'sin_luz', label: 'Mi equipo (ONU/Router) no enciende ninguna luz' },
      { id: 'luces_normales', label: 'Las luces del equipo parecen normales, pero no puedo navegar' },
    ]
  },
  {
    id: 'internet_lento',
    label: 'Mi Internet está muy lento',
    sub_problemas: [
      { id: 'lento_siempre', label: 'La lentitud es constante, a toda hora del día' },
      { id: 'lento_horas_pico', label: 'La lentitud es solo en ciertas horas (noches, fines de semana)' },
      { id: 'lento_un_dispositivo', label: 'La lentitud es solo en un dispositivo (ej. mi celular, pero la PC va bien)' },
      { id: 'lento_wifi', label: 'La lentitud es solo por WiFi, pero por cable de red va rápido' },
    ]
  },
  {
    id: 'sin_tv',
    label: 'No tengo servicio de TV',
    sub_problemas: [
      { id: 'tv_sin_senal', label: 'La pantalla muestra un mensaje de "Sin Señal"' },
      { id: 'tv_pixelada', label: 'La imagen se congela o se ve pixelada' },
      { id: 'caja_no_enciende', label: 'La caja digital de TV no enciende' },
      { id: 'faltan_canales', label: 'Me faltan algunos canales de mi plan' },
    ]
  },
  {
    id: 'otro',
    label: 'Otro tipo de problema',
    sub_problemas: [
      { id: 'otro_detalle', label: 'Necesito reportar una situación diferente' },
    ]
  }
];


export default function Diagnostico() {
  const [modo, setModo] = useState('faq'); // 'faq' o 'formulario'
  const [formData, setFormData] = useState({
    nombre: '',
    cuenta: '',
    problemaPrincipal: '',
    subProblema: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // Si cambia el problema principal, reseteamos el subproblema
      if (name === 'problemaPrincipal') {
        return { ...prev, [name]: value, subProblema: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const generarEnlaceWhatsApp = (e) => {
    e.preventDefault();
    const numeroDestino = "50496730717"; // Reemplazar con el número real
    
    const problemaPrincipalLabel = problemas.find(p => p.id === formData.problemaPrincipal)?.label || 'No especificado';
    const subProblemaLabel = problemas.find(p => p.id === formData.problemaPrincipal)?.sub_problemas.find(sp => sp.id === formData.subProblema)?.label || 'No especificado';

    let mensaje = `Hola Soporte Técnico de TEVISAT, necesito ayuda con un problema técnico.\n\n`;
    mensaje += `*Titular:* ${formData.nombre}\n`;
    if (formData.cuenta) {
      mensaje += `#️⃣ *Cuenta:* ${formData.cuenta}\n`;
    }
    mensaje += `\n*Detalles del Reporte:*\n`;
    mensaje += `- *Problema:* ${problemaPrincipalLabel}\n`;
    mensaje += `- *Síntoma:* ${subProblemaLabel}\n\n`;
    mensaje += `Agradezco su pronta asistencia.`;

    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noreferrer');
  };

  const subProblemasActuales = formData.problemaPrincipal 
    ? problemas.find(p => p.id === formData.problemaPrincipal)?.sub_problemas 
    : [];

  if (modo === 'faq') {
    return (
      <div className="grow w-full py-4 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <HelpCircle size={48} className="mx-auto text-blue-600 mb-4" />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Centro de Ayuda Rápida</h1>
            <p className="text-lg text-gray-500">
              Antes de contactarnos, revisa estas soluciones comunes. ¡Podrías resolver tu problema en minutos!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <FaqItem title="Problema: No tengo Internet, pero sí tengo TV.">
              <p>Este es un problema común. Sigue estos pasos en orden:</p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li><strong>Reinicia tu Router/ONU:</strong> Desconéctalo de la corriente, espera 1 minuto y vuelve a conectarlo. Espera 5 minutos a que todas las luces se estabilicen.</li>
                <li><strong>Revisa la luz "LOS":</strong> Si después de reiniciar, una luz roja con la etiqueta "LOS" parpadea, significa un problema con la fibra óptica. En este caso, necesitarás contactar a soporte.</li>
                <li><strong>Revisa la luz "PON" o "Link":</strong> Esta luz debe estar fija (no parpadeando). Si parpadea o está apagada, también indica un problema de señal.</li>
              </ol>
            </FaqItem>
            <FaqItem title="Problema: No tengo Internet NI servicio de TV.">
              <p>Esto usualmente indica una falla de señal general o eléctrica.</p>
               <ol className="list-decimal list-inside space-y-2 pl-2">
                <li><strong>Verifica la electricidad:</strong> Asegúrate que tanto tu TV como el equipo de internet estén recibiendo corriente. Prueba conectando otro aparato en el mismo enchufe.</li>
                <li><strong>Revisa los cables:</strong> Confirma que el cable de fibra óptica (uno delgado, usualmente amarillo o verde) esté bien conectado al equipo y no esté doblado, quebrado o dañado.</li>
                <li><strong>Pregunta a un vecino:</strong> Si tienes un vecino con nuestro servicio, pregúntale si también tiene problemas. Esto nos ayuda a saber si es una falla en tu casa o en la zona.</li>
              </ol>
            </FaqItem>
            <FaqItem title="Problema: Mi Internet está muy lento.">
              <p>La lentitud puede tener varias causas. Prueba lo siguiente:</p>
               <ol className="list-decimal list-inside space-y-2 pl-2">
                <li><strong>Reinicia tus equipos:</strong> Un reinicio (desconectar por 1 minuto) soluciona la mayoria de los casos de lentitud temporal.</li>
                <li><strong>Prueba con cable de red:</strong> Conecta una computadora directamente al router con un cable de red. Si la velocidad mejora, el problema puede ser la señal WiFi. Aléjate de microondas, teléfonos inalámbricos y paredes gruesas.</li>
                <li><strong>Desconecta dispositivos:</strong> Si hay muchos celulares, TVs y computadoras usando el internet al mismo tiempo, la velocidad se divide entre todos. Prueba desconectando algunos para ver si mejora.</li>
              </ol>
            </FaqItem>
          </div>

          <div className="text-center mt-10 bg-gray-100 p-8 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">¿Aún necesitas ayuda?</h3>
            <p className="text-gray-600 mb-6">Si los pasos anteriores no solucionaron tu problema, nuestro equipo técnico está listo para ayudarte. Llena un breve formulario para crear un reporte.</p>
            <button 
              onClick={() => setModo('formulario')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              Crear Reporte Técnico
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODO FORMULARIO
  return (
    <div className="grow w-full py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <MessageSquare size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Reporte Técnico</h1>
          <p className="text-lg text-gray-500">
            Completa los siguientes campos para que nuestro equipo pueda asistirte de la mejor manera.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={generarEnlaceWhatsApp} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo del titular</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleFormChange} placeholder="Ej. Juan Carlos Pérez" className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label htmlFor="cuenta" className="block text-sm font-medium text-gray-700 mb-1">Número de cuenta (si lo tiene a la mano)</label>
              <div className="relative">
                <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" id="cuenta" name="cuenta" value={formData.cuenta} onChange={handleFormChange} placeholder="Ej. 123456" className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label htmlFor="problemaPrincipal" className="block text-sm font-medium text-gray-700 mb-1">¿Cuál es el problema principal?</label>
              <select id="problemaPrincipal" name="problemaPrincipal" required value={formData.problemaPrincipal} onChange={handleFormChange} className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500">
                <option value="">-- Seleccione una categoría --</option>
                {problemas.map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>

            {subProblemasActuales.length > 0 && (
              <div className="animate-fade-in">
                <label htmlFor="subProblema" className="block text-sm font-medium text-gray-700 mb-1">Describe mejor lo que sucede</label>
                <select id="subProblema" name="subProblema" required value={formData.subProblema} onChange={handleFormChange} className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500">
                  <option value="">-- Seleccione un síntoma --</option>
                  {subProblemasActuales.map(sp => (
                    <option key={sp.id} value={sp.id}>{sp.label}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row items-center gap-4 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => setModo('faq')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold text-gray-600 hover:bg-gray-100 transition"
              >
                <ArrowLeft size={18} /> Volver
              </button>
              <button 
                type="submit"
                disabled={!formData.nombre || !formData.problemaPrincipal || !formData.subProblema}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send size={18} /> Enviar Reporte por WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
