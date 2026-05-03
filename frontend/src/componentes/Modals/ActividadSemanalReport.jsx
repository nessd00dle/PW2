import React, { useState, useEffect } from 'react';
import { X, Calendar, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../App.css';
import '../../pantallas/index.css';

const ActividadSemanalReport = ({ onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFandom, setSelectedFandom] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const datosEjemplo = {
    'Pokemon': [45, 52, 48, 61, 73, 82, 90],
    'Magic': [38, 42, 55, 59, 68, 75, 80],
    'Dragon Ball': [29, 34, 38, 42, 51, 58, 65],
  };
  
  const meses = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const franquicias = Object.keys(datosEjemplo);
  const maxValue = Math.max(...Object.values(datosEjemplo).flat());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getBarHeight = (valor) => {
    const minHeight = 20;
    const maxHeight = isMobile ? 100 : 160;
    return `${Math.max(minHeight, (valor / maxValue) * maxHeight)}px`;
  };

  const fandomColors = {
    'Pokemon': '#facc15',
    'Magic': '#a855f7',
    'Dragon Ball': '#f97316',
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % franquicias.length);
    setSelectedFandom(franquicias[(currentPage + 1) % franquicias.length]);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + franquicias.length) % franquicias.length);
    setSelectedFandom(franquicias[(currentPage - 1 + franquicias.length) % franquicias.length]);
  };

  const currentFandom = franquicias[currentPage];
  const currentData = datosEjemplo[currentFandom];

  return (
    <div className="w-full">
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden" style={{ 
        backgroundColor: 'var(--background-slate)', 
        border: `2px solid var(--border-color)`,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 md:p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2 sm:gap-3">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 highlight" />
            <h2 className="text-base sm:text-xl md:text-2xl font-bold highlight">
              Actividad Semanal
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 active:scale-95"
            style={{ backgroundColor: 'var(--button-color)' }}
          >
            <X size={isMobile ? 18 : 24} className="text-white" />
          </button>
        </div>

        {/* contenido */}
        <div className="p-3 sm:p-4 md:p-6 max-h-[80vh] overflow-y-auto">
          
          {/* fandoms */}
          {isMobile ? (
            <div className="space-y-4">
              {/* selector de fandom */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full transition-all hover:scale-110 active:scale-95"
                  style={{ backgroundColor: 'var(--button-color)' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex-1 text-center">
                  <h3 className="text-lg font-bold" style={{ color: fandomColors[currentFandom] }}>
                    {currentFandom}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Total: {currentData.reduce((a, b) => a + b, 0)} publicaciones
                  </p>
                </div>
                
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full transition-all hover:scale-110 active:scale-95"
                  style={{ backgroundColor: 'var(--button-color)' }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* grafico verticl */}
              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(86, 171, 145, 0.05)' }}>
                <div className="flex gap-1.5 items-end h-48">
                  {currentData.map((valor, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="relative w-full group">
                        <div
                          className="w-full rounded-t-lg transition-all duration-300 cursor-pointer hover:opacity-80"
                          style={{ 
                            height: getBarHeight(valor),
                            backgroundColor: fandomColors[currentFandom],
                            opacity: 0.8
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {valor} pub
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] sm:text-xs text-gray-400">
                        {meses[idx].substring(0, 3)}
                      </span>
                      <span className="text-[9px] sm:text-xs highlight font-semibold">
                        {valor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* indicador de página */}
              <div className="flex justify-center gap-1.5 pt-2">
                {franquicias.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all"
                    style={{ 
                      backgroundColor: currentPage === idx ? 'var(--border-color)' : 'rgba(86, 171, 145, 0.3)',
                      width: currentPage === idx ? '16px' : '6px'
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(datosEjemplo).map(([fandom, datos]) => {
                const total = datos.reduce((a, b) => a + b, 0);
                const barColor = fandomColors[fandom];
                
                return (
                  <div key={fandom} className="border-b pb-5 last:border-0" style={{ borderColor: 'rgba(86, 171, 145, 0.2)' }}>
                    {/* header del fandom */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: barColor }} />
                        <span className="text-white font-semibold text-base sm:text-lg">{fandom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 highlight" />
                        <span className="highlight font-bold text-sm sm:text-base">
                          Total: {total} publicaciones
                        </span>
                      </div>
                    </div>
                    
                    {/* gráfico de barras */}
                    <div className="flex gap-1 sm:gap-2 items-end h-40 sm:h-48">
                      {datos.map((valor, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div className="relative w-full group">
                            <div
                              className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                              style={{ 
                                height: `${(valor / maxValue) * (isMobile ? 100 : 160)}px`,
                                backgroundColor: barColor,
                                opacity: 0.8
                              }}
                            >
                              {/* tooltip */}
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {valor} publicaciones
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] sm:text-xs text-gray-400">
                            {meses[idx]}
                          </span>
                          <span className="text-[10px] sm:text-xs highlight font-semibold">
                            {valor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActividadSemanalReport;