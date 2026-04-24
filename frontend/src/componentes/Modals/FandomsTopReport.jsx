
import React from 'react';
import { X } from 'lucide-react';
import '../../App.css'
import '../../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../Toggle/ThemeOptions';

const FandomsTopReport = ({ onClose }) => {

  const datosEjemplo = [
    { nombre: 'Pokemon', publicaciones: 1234 },
    { nombre: 'Magic', publicaciones: 987 },
    { nombre: 'Dragon Ball', publicaciones: 756 },
  ];

  return (
    <div className='App' id='App'>
      <div className="bg-slate-900 rounded-2xl border-2 border shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            Fandoms con mayor número de publicaciones
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {datosEjemplo.map((fandom, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="text-2xl font-bold primary-text">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-semibold">{fandom.nombre}</span>
                    <span className="text-gray-400">{fandom.publicaciones} publicaciones</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-[highlight] h-2 rounded-full"
                      style={{ width: `${(fandom.publicaciones / datosEjemplo[0].publicaciones) * 100}%` }}
                    />
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

export default FandomsTopReport;