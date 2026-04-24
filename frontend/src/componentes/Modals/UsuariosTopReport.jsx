
import React from 'react';
import { X, Award, Medal, Trophy } from 'lucide-react';
import '../../App.css'
import '../../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../Toggle/ThemeOptions';

const UsuariosTopReport = ({ onClose }) => {
  const usuariosEjemplo = [
    { id: 1, nombre: 'Yomero', publicaciones: 45, comentarios: 234, total: 279, avatar: '⭐' },
    { id: 2, nombre: 'Nessie', publicaciones: 38, comentarios: 198, total: 236, avatar: '🎮' },
    { id: 3, nombre: 'Kratos', publicaciones: 67, comentarios: 145, total: 212, avatar: '🎨' },
  ];

  const getMedalla = (index) => {
    if (index === 0) return <Trophy size={24} className="text-yellow-500" />;
    if (index === 1) return <Medal size={24} className="text-gray-400" />;
    if (index === 2) return <Medal size={24} className="text-amber-600" />;
    return <Award size={24} className="text-gray-600" />;
  };

  return (
    <div className='App' id='App'>

      <div className="bg-slate-900 rounded-2xl border-2 border shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            👥 TOP 10 Usuarios más activos
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {usuariosEjemplo.map((usuario, index) => (
              <div key={usuario.id} className="bg-slate-800/30 rounded-xl p-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12">
                    {getMedalla(index)}
                  </div>
                  <div className="text-2xl">{usuario.avatar}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">{usuario.nombre}</span>
                      <span className="primary-text font-bold">{usuario.total} pts</span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>📝 {usuario.publicaciones} posts</span>
                      <span>💬 {usuario.comentarios} comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuariosTopReport;