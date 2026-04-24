import React from 'react';
import { X, Calendar } from 'lucide-react';
import '../../App.css'
import '../../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../Toggle/ThemeOptions';

const ActividadSemanalReport = ({ onClose }) => {

  const datosEjemplo = {
    'Pokemon': [45, 52, 48, 61, 73, 82, 90],
    'Magic': [38, 42, 55, 59, 68, 75, 80],
    'Dragon Ball': [29, 34, 38, 42, 51, 58, 65],
  };
  const meses = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const maxValue = Math.max(...Object.values(datosEjemplo).flat());

  return (
    <div className='App' id='App'>
      <div className="bg-slate-900 rounded-2xl border-2 border shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            📅 Actividad Semanal
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {Object.entries(datosEjemplo).map(([fandom, datos]) => (
              <div key={fandom} className="border-b border-white/10 pb-6 last:border-0">
                <div className="flex justify-between mb-3">
                  <span className="text-white font-semibold text-lg">{fandom}</span>
                  <span className="primary-text font-bold">Total: {datos.reduce((a, b) => a + b, 0)}</span>
                </div>
                <div className="flex gap-2 items-end h-48">
                  {datos.map((valor, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="relative w-full group">
                        <div
                          className="w-full bg-[highlight] rounded-t-lg transition-all duration-300 hover:from-[#6bc4a8] hover:to-[#4a9a82] cursor-pointer"
                          style={{ height: `${(valor / maxValue) * 160}px` }}
                        >
                          {/* Tooltip al hacer hover */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {valor} publicaciones
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{meses[idx]}</span>
                      <span className="text-xs primary-text font-semibold">{valor}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActividadSemanalReport;