import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';
import FandomsTopReport from '../Modals/FandomsTopReport';
import PublicacionesTopReport from '../Modals/PublicacionesTopReport';
import UsuariosTopReport from '../Modals/UsuariosTopReport';
import ActividadSemanalReport from '../Modals/ActividadSemanalReport';

const ReportesAside = () => {
  const [modalAbierto, setModalAbierto] = useState(null);
  const [modalContainer, setModalContainer] = useState(null);

  useEffect(() => {
   
    let container = document.getElementById('modal-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-root';
      container.style.position = 'relative';
      container.style.zIndex = '999999';
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
      icono: <BarChart3 size={20} />,
      color: 'from-blue-500 to-blue-600',
      componente: FandomsTopReport
    },
    {
      id: 'publicaciones',
      titulo: 'Publicaciones con más reacciones',
      icono: <TrendingUp size={20} />,
      color: 'from-green-500 to-green-600',
      componente: PublicacionesTopReport
    },
    {
      id: 'usuarios',
      titulo: 'TOP 10 Usuarios más activos',
      icono: <Users size={20} />,
      color: 'from-purple-500 to-purple-600',
      componente: UsuariosTopReport
    },
    {
      id: 'actividad',
      titulo: 'Actividad Semanal',
      icono: <Calendar size={20} />,
      color: 'from-orange-500 to-orange-600',
      componente: ActividadSemanalReport
    }
  ];

  useEffect(() => {
    if (modalAbierto) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [modalAbierto]);

  const cerrarModal = () => setModalAbierto(null);

  const ModalContent = ({ children, onClose }) => (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full bg-slate-900/60 p-4 rounded-3xl border-2 border-[#56ab91]/30 shadow-xl">
        <h3 className="font-semibold text-[#56ab91] mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Reportes Rápidos
        </h3>
        <div className="space-y-3">
          {reportes.map((reporte) => (
            <button
              key={reporte.id}
              onClick={() => setModalAbierto(reporte.id)}
              className="w-full text-left group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${reporte.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative bg-slate-800/50 backdrop-blur-sm p-3 rounded-xl border border-white/10 group-hover:border-transparent transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="text-current">
                    {reporte.icono}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white group-hover:text-white">
                      {reporte.titulo}
                    </h4>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300">
                      Click para ver detalles
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      
      {modalContainer && reportes.map((reporte) => {
        const ModalComponent = reporte.componente;
        return modalAbierto === reporte.id && createPortal(
          <ModalContent onClose={cerrarModal}>
            <ModalComponent onClose={cerrarModal} />
          </ModalContent>,
          modalContainer
        );
      })}
    </>
  );
};

export default ReportesAside;