import React from 'react';

const Perfil = ({ setPantalla }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-windows p-4">
      {/* navbar */}
      <nav className="bg-[#56ab91] rounded-full p-3 mb-6 flex items-center justify-between shadow-lg">
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
            <img 
              src="https://www.svgrepo.com/show/324791/store-business-marketplace-shop-sale-buy-marketing.svg" 
              alt="Tienda" 
              className="w-6 h-6 invert opacity-80 group-hover:opacity-100" 
            />
          </button>

          <button 
            onClick={() => setPantalla('coleccion')}
            className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group"
          >
            <img 
              src="https://static.thenounproject.com/png/2221162-200.png" 
              alt="Coleccion" 
              className="w-6 h-6 invert opacity-80 group-hover:opacity-100" 
            />
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

      {/* header perfil */}
      <div className="border-2 border-[#56ab91] rounded-[30px] p-8 mb-8 relative bg-slate-900/50">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-40 h-40 bg-[#56ab91] rounded-full flex-shrink-0 shadow-xl border-4 border-[#2d2a3e]"></div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Nombre de usuario :p</h1>
            <p className="text-400 mb-4">Fecha de registro: 04/02/26</p>
            <p className="text-gray-300 max-w-md italic">descripciónndescripciónndescripciónndescripciónndescripciónndescripciónn</p>
            
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
               <button 
                 onClick={() => setPantalla('auth')}
                 className="bg-[#2d2a3e] px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-all text-red-400"
                >
                  Cerrar sesión
                </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => setPantalla('estadistica')}
              className="flex flex-col items-center group hover:scale-105 transition-transform"
            >
                <img 
                  src="img/bar_icon_pink.png" 
                  alt="Estadísticas" 
                  className="w-12 h-12 opacity-80" 
                />
              <span className="text-[10px] mt-1 text-pink-500 uppercase font-black italic">Estadísticas</span>
            </button>

            <button 
              onClick={() => setPantalla('configuracion')}
              className="flex flex-col items-center group hover:scale-105 transition-transform"
            >
              <img 
                  src="img/config_icon.png" 
                  alt="config" 
                  className="w-12 h-12 opacity-80" 
                />
              <span className="text-[10px] mt-1 text-pink-500 uppercase font-black italic">Configuración</span>
            </button>
          </div>
        </div>
      </div>

      {/* carrusel */}
      <div className="relative px-12 py-4 flex items-center justify-center gap-6">
        {/* flecha izq */}
        <button className="bg-[#2d2a3e] w-10 h-10 rounded-full flex items-center justify-center border border-[#56ab91] z-10 hover:bg-emerald-900 transition-colors">＜</button>
        
        <div className="flex gap-6 items-center overflow-x-hidden py-4">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              onClick={() => setPantalla('coleccion')}
              className={`min-w-[180px] h-64 border-2 border-[#56ab91] rounded-2xl bg-slate-800/80 transition-all duration-300 cursor-pointer flex items-center justify-center ${i === 2 ? 'scale-110 border-emerald-400 shadow-[0_0_20px_rgba(86,171,145,0.3)]' : 'opacity-40 scale-95'}`}
            >
            </div>
          ))}
        </div>

        {/* flecha der */}
        <button className="bg-[#2d2a3e] w-10 h-10 rounded-full flex items-center justify-center border border-[#56ab91] z-10 hover:bg-emerald-900 transition-colors">＞</button>
      </div>

      {/* botones derecha inf */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button 
          onClick={() => setPantalla('publicar')}
          className="bg-[#2d2a3e] p-3 rounded-full shadow-lg border-2 border-[#56ab91] hover:bg-emerald-800 transition-all flex items-center justify-center w-14 h-14"
        >
          <img 
            src="https://www.freeiconspng.com/thumbs/plus-icon/plus-icon-black-2.png" 
            alt="Agregar" 
            className="w-6 h-6 invert opacity-80" 
          />
        </button>
          
        <button className="bg-[#2d2a3e] p-3 rounded-full shadow-lg border-2 border-[#56ab91] hover:bg-emerald-800 transition-all flex items-center justify-center w-14 h-14">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Refresh_icon.png" 
            alt="Actualizar" 
            className="w-6 h-6 invert opacity-80" 
          />
        </button>
      </div>
    </div>
  );
};

export default Perfil;