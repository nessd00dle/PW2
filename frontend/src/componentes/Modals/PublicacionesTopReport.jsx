
import React from 'react';
import { X, Heart, MessageCircle, Share2 } from 'lucide-react';
import '../../App.css'
import '../../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../Toggle/ThemeOptions';

const PublicacionesTopReport = ({ onClose }) => {
  const publicacionesEjemplo = [
    { id: 1, usuario: 'Yomero', titulo: 'Mi colección de tipo planta soñada', reacciones: 234, comentarios: 45, fandom: 'Pokemon' },
    { id: 2, usuario: 'Nessie', titulo: 'Las mejores cartas', reacciones: 189, comentarios: 23, fandom: 'Magic' },
    { id: 3, usuario: 'Kratos', titulo: 'Los más potentes', reacciones: 156, comentarios: 67, fandom: 'Dragon Ball' },
  ];

  return (
    <div className='App' id='App'>

      <div className="bg-slate-900 rounded-2xl border-2 border shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            Publicaciones con más reacciones
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {publicacionesEjemplo.map((pub, index) => (
            <div key={pub.id} className="bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold primary-text">#{index + 1}</span>
                    <span className="text-xs px-2 py-1 bg-slate rounded-full button">
                      {pub.fandom}
                    </span>
                    <span className="text-xs px-2 py-1 bg-slate-600 rounded-full text-gray-400">
                      {pub.usuario}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-3">{pub.titulo}</h3>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Heart size={16} className="text-red-500" />
                      <span>{pub.reacciones} reacciones</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} className="text-blue-500" />
                      <span>{pub.comentarios} comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicacionesTopReport;