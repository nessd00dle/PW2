import React from 'react';

const Perfil = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-windows p-4">
        {/* navbar */}
    <nav className="bg-[#56ab91] rounded-full p-3 mb-6 flex items-center justify-between shadow-lg">
      <div className="flex gap-4 ml-4">
        <button className="w-10 h-10 bg-[#2d2a3e] rounded-full flex items-center justify-center font-bold hover:scale-110 transition-transform">
          <span className="text-white">L</span>
        </button>

        <button className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group">
          <img 
            src="https://www.svgrepo.com/show/324791/store-business-marketplace-shop-sale-buy-marketing.svg" 
            alt="Tienda" 
            className="w-6 h-6 invert opacity-80 group-hover:opacity-100" 
          />
        </button>

        <button className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group">
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
          <span className="absolute left-3 top-2 opacity-50"></span>
        </div>
      </div>

      <div className="flex items-center gap-3 mr-4">
        <span className="text-[#1a202c] font-bold">Usuario</span>
        {/* foto perfil */}
        <button className="w-10 h-10 bg-white rounded-full border-2 border-pink-500 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all">

        </button>
      </div>
    </nav>

      {/* header perfil */}
      <div className="border-2 border-[#56ab91] rounded-[30px] p-8 mb-8 relative bg-slate-900/50">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* foto d perfil a la derecha */}
          <div className="w-40 h-40 bg-[#56ab91] rounded-full flex-shrink-0 shadow-xl border-4 border-[#2d2a3e]"></div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Nombre de usuario</h1>
            <p className="text-emerald-400 mb-4">Fecha de registro: 04/02/26</p>
            <p className="text-gray-300 max-w-md">descripciónndescripciónndescripciónndescripciónndescripciónndescripciónndescripciónndescripciónndescripciónndescripciónndescripciónn</p>
            
            {/* cerrar sesion */}
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
               <button className="bg-[#2d2a3e] px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-all text-red-400">Cerrar sesión</button>
            </div>
          </div>

<div className="hidden lg:flex items-center gap-4">
  
  <button className="flex flex-col items-center group hover:scale-105 transition-transform">
      <img 
        src="img/bar_icon_pink.png" 
        alt="Estadísticas" 
        
          className="w-12 h-12 opacity-80" 
      />
    
    <span className="text-[10px] mt-1 text-pink-500 uppercase font-black italic">Estadísticas</span>
  </button>

  <button className="flex flex-col items-center group hover:scale-105 transition-transform">
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

      {/* carrusel (todavia no esta) */}
      <div className="relative px-12">
        
        <div className="flex gap-6 overflow-x-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[200px] h-72 border-2 border-[#56ab91] rounded-2xl bg-slate-800/80 hover:scale-105 transition-transform cursor-pointer flex items-center justify-center">
              <span className="text-emerald-900 text-6xl">?</span>
            </div>
          ))}
        </div>

        {/* flechas */}
        <button className="absolute left-0 top-1/2 bg-[#2d2a3e] w-10 h-10 rounded-full flex items-center justify-center border border-[#56ab91]">＜</button>
        <button className="absolute right-0 top-1/2 bg-[#2d2a3e] w-10 h-10 rounded-full flex items-center justify-center border border-[#56ab91]">＞</button>
      </div>


    {/* botones derecha inf */}
    <div className="fixed bottom-6 right-6 flex flex-col gap-3">
      {/* agregar coleccion */}
      <button className="bg-[#2d2a3e] p-3 rounded-full shadow-lg border-2 border-[#56ab91] hover:bg-emerald-800 transition-all flex items-center justify-center w-14 h-14">
        <img 
          src="https://www.freeiconspng.com/thumbs/plus-icon/plus-icon-black-2.png" 
          alt="Agregar" 
          className="w-6 h-6 invert opacity-80" 
        />
      </button>
          
      {/* actualizar y agregar mas fotos a coelccion */}
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