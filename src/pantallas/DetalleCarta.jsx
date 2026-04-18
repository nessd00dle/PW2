import React from 'react';

const DetalleCarta = ({ setPantalla }) => { 
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
          className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all">
            <img src="https://www.svgrepo.com/show/324791/store-business-marketplace-shop-sale-buy-marketing.svg" alt="Tienda" className="w-6 h-6 invert opacity-80" />
          </button>
          <button 
            onClick={() => setPantalla('coleccion')}
            className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all"
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
            className="w-10 h-10 bg-white rounded-full border-2 border-pink-500 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all"
          >
            <img
              src="https://media.tenor.com/pgRHsHG3M2MAAAAe/gato-serio.png"
            />
          </button>
        </div>
      </nav>

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