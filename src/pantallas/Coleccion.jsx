import React from 'react';

const Coleccion = ({ setPantalla }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4">
      
      {/* navbar */}
      <nav className="bg-[#56ab91] rounded-full p-3 mb-10 flex items-center justify-between shadow-lg w-full">
        <div className="flex gap-4 ml-4">
          {/* logo */}
        <button 
          onClick={() => setPantalla('ventas')}
          className="hover:scale-110 transition-transform focus:outline-none"
        >
          <img 
            src="public/logo.png" 
            alt="Logo" 
            className="h-10 w-auto object-contain"
          />
        </button>

          <button 
          onClick={() => setPantalla('ventas')}
          className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group"
          >
            <img src="https://www.svgrepo.com/show/324791/store-business-marketplace-shop-sale-buy-marketing.svg" alt="Tienda" className="w-6 h-6 invert opacity-80" />
          </button>


          <button 
            onClick={() => setPantalla('coleccion')}
            className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group"
          >
            <img src="https://static.thenounproject.com/png/2221162-200.png" alt="Coleccion" className="w-6 h-6 invert opacity-80" />
          </button>
        </div>
      
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input 
              type="text" 
              className="w-full bg-[#3d7a67] rounded-full py-2 px-10 outline-none border-none placeholder-emerald-200 text-white"
              placeholder="Buscar" 
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mr-4">
          <span className="text-[#1a202c] font-bold">Usuario</span>

          <button 
            onClick={() => setPantalla('perfil')}
            className="w-10 h-10 bg-white rounded-full border-2 border-pink-500 overflow-hidden"
          >
            <img
              src="https://media.tenor.com/pgRHsHG3M2MAAAAe/gato-serio.png"
            />
          </button>
        </div>
      </nav>

      {/* contendeor principal */}
      <div className="max-w-5xl mx-auto border-2 border-[#56ab91] rounded-[30px] p-8 bg-slate-900/40 relative shadow-2xl">
        
        <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full border-2 border-slate-700"></div>
            <span className="font-bold text-md text-gray-200">usuario</span>
          </div>
          <span className="font-bold text-gray-400 text-sm tracking-widest">Franquicia</span>
        </div>

        {/* campos de texto */}
        <div className="space-y-6 mb-8 px-4">
          <div className="max-w-xs">
            <p className="text-sm font-bold mb-2 ml-1 text-emerald-500">Título</p>
            <div className="w-full border-2 border-dashed border-[#56ab91]/60 rounded-xl py-2 px-4 bg-black/20 text-sm text-gray-200 font-semibold">
              miren mis cartas wow quien es ese pokemon
            </div>
          </div>
          
          <div className="max-w-2xl">
            <p className="text-sm font-bold mb-2 ml-1 text-emerald-500">Descripción</p>
            <div className="w-full border-2 border-dashed border-[#56ab91]/60 rounded-2xl py-4 px-4 bg-black/20 text-xs text-gray-300 leading-relaxed italic">
              descripcióndescripcióndescripcióndescripcióndescripcióndescripción
            </div>
          </div>
        </div>

        {/* carrusel */}
        <div className="relative flex items-center justify-center gap-4 py-6">
          <button className="w-10 h-10 bg-[#2d2a3e] rounded-full flex items-center justify-center border border-[#56ab91] hover:bg-emerald-900 transition-colors shadow-lg">
            ＜
          </button>

          <div className="flex gap-4 items-center px-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                onClick={() => setPantalla('detalle')} 
                className={`w-36 h-52 border-2 border-[#56ab91] rounded-2xl bg-slate-800/80 shadow-xl flex items-center justify-center transition-all cursor-pointer ${i === 2 ? 'scale-110 border-emerald-400 ring-4 ring-emerald-500/20' : 'opacity-40 scale-90'}`}
              >
              </div>
            ))}
          </div>

          <button className="w-10 h-10 bg-[#2d2a3e] rounded-full flex items-center justify-center border border-[#56ab91] hover:bg-emerald-900 transition-colors shadow-lg">
            ＞
          </button>
        </div>

        {/* btn like */}
        <div className="flex justify-end mt-4 px-6">
          <button className="bg-[#3d7a67]/50 p-2 px-5 rounded-xl border border-[#56ab91] hover:bg-pink-900/20 transition-all group">
             <span className="text-pink-400 text-xl group-hover:scale-125 block transition-transform">♥</span>
          </button>
        </div>

        {/* ingresar coemntaario */}
        <div className="mt-8 px-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-700 rounded-full shrink-0"></div>
             <div className="flex-1 border-2 border-dashed border-[#56ab91]/40 rounded-xl py-3 px-4 bg-black/20">
                <p className="text-xs text-gray-500 font-medium italic">Comentar...</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Coleccion;