import React, { useState } from 'react';
import Gallery from './Gallery'; // Asegúrate de importar el componente Gallery

const PublicarCarta = ({ setPantalla }) => {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedCarta, setSelectedCarta] = useState(null);
  const [tipoPublicacion, setTipoPublicacion] = useState('');

  const handleTipoChange = (e) => {
    const tipo = e.target.value;
    setTipoPublicacion(tipo);
    
    // Si selecciona "colección", abrimos el modal de galería
    if (tipo === 'coleccion') {
      setShowGalleryModal(true);
    }
  };

  const handleSelectCarta = (carta) => {
    setSelectedCarta(carta);
    console.log('Carta seleccionada para colección:', carta);
  };

  const handlePublicar = () => {
    if (tipoPublicacion === 'coleccion' && !selectedCarta) {
      alert('Debes seleccionar una carta para tu colección');
      setShowGalleryModal(true);
      return;
    }
    
    // Aquí va la lógica de publicación
    console.log('Publicando:', { tipoPublicacion, selectedCarta });
    setPantalla('perfil');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4 flex flex-col items-center">
      
      {/* navbar (se mantiene igual) */}
      <nav className="w-full bg-[#56ab91] rounded-full p-3 mb-10 flex items-center justify-between shadow-lg">
        <div className="flex gap-4 ml-4">
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
            className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all"
          >
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
          <input type="text" className="w-full bg-[#3d7a67] rounded-full py-2 px-10 outline-none placeholder-emerald-200 text-white" placeholder="Buscar" />
        </div>

        <div className="flex items-center gap-3 mr-4">
          <span className="text-[#1a202c] font-bold text-sm">Usuario</span>

          <button 
            onClick={() => setPantalla('perfil')}
            className="w-10 h-10 bg-white rounded-full border-2 border-pink-500 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all"
          >
            <img src="https://media.tenor.com/pgRHsHG3M2MAAAAe/gato-serio.png" alt="Usuario" />
          </button>
        </div>
      </nav>

      {/* contenedor */}
      <div className="relative w-full max-w-2xl border-2 border-[#56ab91] rounded-3xl bg-slate-900/40 p-10 shadow-2xl">
        
        {/* btn x */}
        <button 
          onClick={() => setPantalla('perfil')}
          className="absolute top-6 right-6 w-10 h-10 bg-[#2d2a3e] rounded-full flex items-center justify-center font-bold border border-[#56ab91] hover:bg-red-600 transition-all z-10"
        >
          X
        </button>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* filtros */}
          <div className="flex gap-4 mb-4">
            <div className="relative">
              <select 
                className="bg-[#3d7a67] rounded-full py-2 px-6 pr-10 outline-none border-none text-white appearance-none cursor-pointer text-sm font-medium min-w-[130px]"
                value={tipoPublicacion}
                onChange={handleTipoChange}
              >
                <option value="" disabled>Tipo</option>
                <option value="venta">Venta</option>
                <option value="coleccion">Colección</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]">▼</span>
            </div>

            <div className="relative">
              <select className="bg-[#3d7a67] rounded-full py-2 px-6 pr-10 outline-none border-none text-white appearance-none cursor-pointer text-sm font-medium min-w-[130px]">
                <option value="" disabled selected>Fandom</option>
                <option value="pokemon">Pokemon</option>
                <option value="magic">Magic</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]">▼</span>
            </div>
          </div>

          {/* título y cantidad */}
          <div className="flex gap-4 items-end">
            <div className="flex-[4]">
              <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Título</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-2 border-dashed border-[#56ab91]/60 rounded-2xl py-2 px-4 outline-none focus:border-emerald-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Cantidad</label>
              <input 
                type="number" 
                className="w-full bg-transparent border-2 border-dashed border-[#56ab91]/60 rounded-2xl py-2 px-4 outline-none focus:border-emerald-400 text-center"
                placeholder="1"
              />
            </div>
          </div>

          {/* foto carta - MODIFICADO: muestra la carta seleccionada si existe */}
          <div 
            className={`w-full h-40 border-2 border-dashed rounded-3xl flex items-center justify-center transition-all cursor-pointer
              ${selectedCarta 
                ? 'border-[#d91a7a] bg-slate-800/40' 
                : 'border-[#56ab91]/60 hover:bg-slate-800/20'
              }`}
            onClick={() => tipoPublicacion === 'coleccion' && setShowGalleryModal(true)}
          >
            {selectedCarta ? (
              <div className="flex items-center gap-4">
                <img 
                  src={selectedCarta.imagen} 
                  alt={selectedCarta.nombre}
                  className="h-28 w-auto object-contain"
                />
                <div>
                  <p className="font-bold text-[#d91a7a]">{selectedCarta.nombre}</p>
                  <p className="text-sm text-gray-300">Carta seleccionada ✓</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCarta(null);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 mt-1 underline"
                  >
                    Cambiar carta
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#4d5b61] px-6 py-2 rounded-xl border border-slate-500 shadow-lg group">
                <span className="text-gray-200 font-bold text-xs uppercase tracking-wide group-hover:text-white">
                  {tipoPublicacion === 'coleccion' 
                    ? 'Seleccionar carta para colección' 
                    : 'Agregar fotos (opcional)'}
                </span>
              </div>
            )}
          </div>

          {/* descripción */}
          <div>
            <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Descripción</label>
            <textarea 
              rows="4"
              className="w-full bg-transparent border-2 border-dashed border-[#56ab91]/60 rounded-3xl py-4 px-4 outline-none focus:border-emerald-400 resize-none"
              placeholder={tipoPublicacion === 'coleccion' 
                ? 'Describe tu colección...' 
                : 'Describe la carta que vendes...'}
            ></textarea>
          </div>

          {/* btn publicar */}
          <div className="flex justify-center pt-2">
            <button 
              onClick={handlePublicar}
              type="button"
              className="bg-[#d91a7a] hover:bg-[#f22c8e] text-white font-black py-3 px-24 rounded-xl shadow-lg transform active:scale-95 transition-all uppercase tracking-[0.2em] text-xs"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>

      {/* Modal de galería - SOLO para colecciones */}
      <Gallery
        setPantalla={setPantalla}
        isOpen={showGalleryModal}
        onClose={() => {
          setShowGalleryModal(false);
          // Si cierra sin seleccionar y ya había seleccionado antes, mantenemos la selección
        }}
        onSelectCarta={(carta) => {
          handleSelectCarta(carta);
          setShowGalleryModal(false); // Cerramos el modal después de seleccionar
        }}
      />
    </div>
  );
};

export default PublicarCarta;