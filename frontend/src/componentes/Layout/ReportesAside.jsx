import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';
import FandomsTopReport from '../Modals/FandomsTopReport';
import PublicacionesTopReport from '../Modals/PublicacionesTopReport';
import UsuariosTopReport from '../Modals/UsuariosTopReport';
import ActividadSemanalReport from '../Modals/ActividadSemanalReport';

const ReportesAside = ({ isMobileView }) => {
  const [modalAbierto, setModalAbierto] = useState(null);
  const [modalContainer, setModalContainer] = useState(null);

  useEffect(() => {
    let container = document.getElementById('modal-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-root';
      document.body.appendChild(container);
    }
    setModalContainer(container);

    return () => {
      if (container && container.childNodes.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, []);

  const reportes = [
    {
      id: 'fandoms',
      titulo: 'Fandoms con mayor número de publicaciones',
      tituloCorto: 'Top Fandoms',
      icono: <BarChart3 size={isMobileView ? 16 : 18} className="sm:w-5 sm:h-5" />,
      color: 'from-blue-500 to-blue-600',
      componente: FandomsTopReport
    },
    {
      id: 'publicaciones',
      titulo: 'Publicaciones con más reacciones',
      tituloCorto: 'Top Publicaciones',
      icono: <TrendingUp size={isMobileView ? 16 : 18} className="sm:w-5 sm:h-5" />,
      color: 'from-green-500 to-green-600',
      componente: PublicacionesTopReport
    },
    {
      id: 'usuarios',
      titulo: 'TOP 10 Usuarios más activos',
      tituloCorto: 'Top Usuarios',
      icono: <Users size={isMobileView ? 16 : 18} className="sm:w-5 sm:h-5" />,
      color: 'from-purple-500 to-purple-600',
      componente: UsuariosTopReport
    },
    {
      id: 'actividad',
      titulo: 'Actividad Semanal',
      tituloCorto: 'Actividad',
      icono: <Calendar size={isMobileView ? 16 : 18} className="sm:w-5 sm:h-5" />,
      color: 'from-orange-500 to-orange-600',
      componente: ActividadSemanalReport
    }
  ];

  useEffect(() => {
    if (modalAbierto) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [modalAbierto]);

  const cerrarModal = () => setModalAbierto(null);

  const renderModal = () => {
    if (!modalAbierto || !modalContainer) return null;
    
    const reporte = reportes.find(r => r.id === modalAbierto);
    if (!reporte) return null;
    
    const ModalComponent = reporte.componente;
    
    return createPortal(
      <div 
        className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(8px)' }}
        onClick={cerrarModal}
      >
        <div 
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl"
          style={{ backgroundColor: 'var(--background-slate)', border: `2px solid var(--border-color)` }}
          onClick={(e) => e.stopPropagation()}
        >
          <ModalComponent onClose={cerrarModal} />
        </div>
      </div>,
      modalContainer
    );
  };

  return (
    <>
      <div className="w-full space-y-2 sm:space-y-3">
        {reportes.map((reporte) => (
          <button
            key={reporte.id}
            onClick={() => setModalAbierto(reporte.id)}
            className="w-full text-left group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${reporte.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative bg-slate-800/50 backdrop-blur-sm p-2 sm:p-3 rounded-xl border border-white/10 group-hover:border-transparent transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-current flex-shrink-0">
                  {reporte.icono}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-white truncate">
                    {isMobileView ? reporte.tituloCorto : reporte.titulo}
                  </h4>
                  {!isMobileView && (
                    <p className="text-[10px] sm:text-xs text-gray-400 group-hover:text-gray-300">
                      Click para ver detalles
                    </p>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {renderModal()}
    </>
  );
};

export default ReportesAside;