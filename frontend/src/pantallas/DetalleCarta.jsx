import React from 'react';
import Navbar from '../componentes/Layout/navbar';

const DetalleCarta = ({ setPantalla }) => { 
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4">
      
      <Navbar setPantalla={setPantalla} />


      {/* contendido detalle */}
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-7xl mx-auto px-4">
        
        {/* btn x */}
        <button 
          onClick={() => setPantalla('ventas')}
          className="w-10 h-10 bg-[#2d2a3e] rounded-full flex-shrink-0 flex items-center justify-center font-bold border border-[#56ab91] hover:bg-red-600 transition-colors shadow-lg"
        >
          X
        </button>

        {/* columna izq */}
        <div className="w-full md:w-[350px] min-h-[500px] border-2 border-[#56ab91] rounded-3xl bg-slate-900/40 flex items-center justify-center relative shadow-2xl">
          <div className="bg-[#4a6b61]/40 px-6 py-3 rounded-xl border border-[#56ab91]">
             <span className="text-gray-300 font-bold text-sm uppercase tracking-widest italic text-center block">
              Imagen de la <br/> carta aquí :3
             </span>
          </div>
        </div>

        {/* columna der */}
        <div className="w-full md:w-[420px] lg:w-[480px] flex flex-col gap-4 flex-shrink-0">
          
          {/* info de la carta */}
          <div className="border-2 border-[#56ab91] rounded-2xl p-6 bg-slate-900/60 relative shadow-xl">
            <div className="space-y-3 text-sm text-gray-200">
              <h2 className="text-2xl font-bold text-white mb-2">pikachu</h2>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Precio: <span className="italic text-emerald-400">$1500.00</span></p>
                <p className="text-xs text-gray-400">Cantidad: <span className="text-white">1</span></p>
                <p className="text-xs text-gray-400">Fandom: <span className="text-white">pokémon</span></p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#56ab91]/20">
                <p className="font-bold text-emerald-400 text-xs uppercase italic">Descripción:</p>
                <p className="text-gray-400 text-xs leading-relaxed mt-1">
                   descripcióndescripcióndescripcióndescripcióndescripción
                </p>
              </div>
            </div>

            {/* like */}
            <div className="mt-6">
              <button className="w-14 h-10 bg-[#2d2a3e] border border-[#56ab91] rounded-xl flex items-center justify-center hover:bg-pink-900/20 transition-all group">
                <span className="text-pink-500 text-2xl group-hover:scale-125 transition-transform">♥</span>
              </button>
            </div>
          </div>

          {/* comentarios */}
          <div className="border-2 border-[#56ab91] rounded-2xl p-6 bg-slate-900/60 flex flex-col gap-4 shadow-xl">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Comentarios</h3>

            <div className="bg-[#2d2a3e]/60 p-4 rounded-2xl flex items-start gap-3 border border-[#56ab91]/10">
              <div className="w-8 h-8 bg-[#56ab91] rounded-full shrink-0 border-2 border-[#2d2a3e]"></div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 block">reyna:3</span>
                <p className="text-xs text-gray-200">wooow q bonita, me encanta</p>
              </div>
            </div>

            {/* escribir comentario */}
            <div className="mt-2 border-2 border-dashed border-[#56ab91]/60 rounded-2xl p-4 flex items-center gap-3 bg-black/30 focus-within:border-emerald-400 transition-colors">
              <div className="w-8 h-8 bg-slate-700 rounded-full shrink-0"></div>
              <input 
                type="text" 
                placeholder="Escribir comentario" 
                className="bg-transparent flex-1 outline-none text-xs placeholder-gray-600 text-white"
              />
              <button className="text-emerald-500 hover:scale-125 transition-transform">➤</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetalleCarta;