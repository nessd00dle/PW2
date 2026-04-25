import React from 'react';
import { useNavigate } from 'react-router-dom';

const Configuracion = () => { 
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-6 font-sans">
      <div className="relative w-full max-w-sm bg-[#1a1d26] border-2 border-[#2d4a41] rounded-xl p-8 shadow-2xl">
        
        <button 
          onClick={() => navigate('/mi-perfil')} 
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-[#252836] text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg"
        >
          X
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-[#5ea38f] rounded-full flex items-center justify-center mb-4 shadow-inner">
            <svg className="w-10 h-10 text-[#1a1d26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>

          <div className="w-full space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1 ml-1 font-medium">Nombre de usuario</label>
              <input type="text" className="w-full bg-[#468674] border-none rounded-2xl h-10 px-4 focus:ring-2 focus:ring-emerald-400 outline-none text-white placeholder-emerald-100/50" />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1 ml-1 font-medium">Contraseña:</label>
              <input type="password" className="w-full bg-[#468674] border-none rounded-2xl h-10 px-4 focus:ring-2 focus:ring-emerald-400 outline-none text-white" />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1 ml-1 font-medium">Descripción</label>
              <textarea className="w-full bg-[#468674] border-none rounded-3xl h-32 px-4 py-3 focus:ring-2 focus:ring-emerald-400 outline-none resize-none text-white" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/mi-perfil')}
            className="bg-[#2d2a3d] hover:bg-[#3d3852] text-white font-bold py-2 px-10 rounded-2xl text-lg transition-all active:scale-95 border-b-2 border-black/20"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;