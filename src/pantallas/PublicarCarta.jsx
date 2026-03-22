import React, { useState } from 'react';
import Gallery from '../componentes/Modals/Gallery';

const PublicarCarta = ({ setPantalla }) => {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedCarta, setSelectedCarta] = useState(null);
  const [tipoPublicacion, setTipoPublicacion] = useState('');
  const [imagenesVenta, setImagenesVenta] = useState([]);
  const [erroresImagen, setErroresImagen] = useState([]);

  const handleTipoChange = (e) => {
    const tipo = e.target.value;
    setTipoPublicacion(tipo);
    
    // Limpiar imágenes al cambiar de tipo
    if (tipo !== 'venta' && tipo !== 'intercambio') {
      setImagenesVenta([]);
    }
    
    // Si selecciona "colección", abrimos el modal de galería
    if (tipo === 'coleccion') {
      setShowGalleryModal(true);
    }
  };

  const handleSelectCarta = (carta) => {
    setSelectedCarta(carta);
    console.log('Carta seleccionada para colección:', carta);
  };

  // Validar que el archivo sea una imagen
  const validarImagen = (file) => {
    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
    const extensionesPermitidas = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!tiposPermitidos.includes(file.type) && !extensionesPermitidas.includes(extension)) {
      return {
        valido: false,
        error: `Formato no permitido: ${file.name}. Solo se permiten imágenes (JPG, PNG, GIF, WEBP, BMP)`
      };
    }
    
    // Limitar tamaño máximo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return {
        valido: false,
        error: `Archivo demasiado grande: ${file.name}. Máximo 5MB`
      };
    }
    
    return { valido: true, error: null };
  };

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    const nuevasImagenes = [];
    const nuevosErrores = [];
    
    // Limitar a máximo 10 imágenes
    if (imagenesVenta.length + files.length > 10) {
      alert('Máximo 10 imágenes por publicación');
      return;
    }
    
    files.forEach(file => {
      const validacion = validarImagen(file);
      
      if (validacion.valido) {
        const reader = new FileReader();
        reader.onloadend = () => {
          nuevasImagenes.push({
            id: Date.now() + Math.random(),
            file: file,
            preview: reader.result,
            nombre: file.name
          });
          
          if (nuevasImagenes.length === files.length) {
            setImagenesVenta(prev => [...prev, ...nuevasImagenes]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        nuevosErrores.push(validacion.error);
      }
    });
    
    if (nuevosErrores.length > 0) {
      setErroresImagen(nuevosErrores);
      setTimeout(() => setErroresImagen([]), 5000);
    }
  };

  const eliminarImagen = (id) => {
    setImagenesVenta(prev => prev.filter(img => img.id !== id));
  };

  const handlePublicar = () => {
    if (tipoPublicacion === 'coleccion' && !selectedCarta) {
      alert('Debes seleccionar una carta para tu colección');
      setShowGalleryModal(true);
      return;
    }
    
    if ((tipoPublicacion === 'venta' || tipoPublicacion === 'intercambio') && imagenesVenta.length === 0) {
      alert('Debes agregar al menos una imagen para la publicación');
      return;
    }
    
    // Aquí va la lógica de publicación
    console.log('Publicando:', { 
      tipoPublicacion, 
      selectedCarta, 
      imagenes: imagenesVenta.map(img => img.file)
    });
    setPantalla('perfil');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4 flex flex-col items-center">
      
      {/* navbar */}
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
                <option value="intercambio">Intercambio</option>
                <option value="coleccion">Colección</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]">▼</span>
            </div>

            <div className="relative">
              <select className="bg-[#3d7a67] rounded-full py-2 px-6 pr-10 outline-none border-none text-white appearance-none cursor-pointer text-sm font-medium min-w-[130px]">
                <option value="" disabled selected>Fandom</option>
                <option value="pokemon">Pokemon</option>
                <option value="magic">Magic</option>
                <option value="yugioh">Yu-Gi-Oh</option>
                <option value="digimon">Digimon</option>
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
                min="1"
              />
            </div>
          </div>

          {/* Precio (solo para venta) */}
          {tipoPublicacion === 'venta' && (
            <div>
              <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Precio</label>
              <input 
                type="number" 
                className="w-full bg-transparent border-2 border-dashed border-[#56ab91]/60 rounded-2xl py-2 px-4 outline-none focus:border-emerald-400"
                placeholder="$0.00"
                min="0"
                step="0.01"
              />
            </div>
          )}

          {/* Área de imágenes - Para venta e intercambio - NUEVO DISEÑO */}
          {(tipoPublicacion === 'venta' || tipoPublicacion === 'intercambio') && (
            <div>
              <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">
                Imágenes de la carta
                <span className="text-xs text-gray-400 ml-2">(Máximo 10 imágenes, solo formatos de imagen)</span>
              </label>
              
              {/* Grid interactivo que muestra las imágenes y el botón para agregar más */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {/* Mostrar imágenes existentes */}
                {imagenesVenta.map((img) => (
                  <div key={img.id} className="relative group">
                    <div className="relative pt-[100%] rounded-xl overflow-hidden border-2 border-[#56ab91]/40 bg-slate-800/40 hover:border-[#56ab91] transition-all">
                      <img 
                        src={img.preview} 
                        alt={img.nombre}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        onClick={() => eliminarImagen(img.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 hover:scale-110 shadow-lg"
                      >
                        <span className="text-white text-sm font-bold">✕</span>
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Botón para agregar más imágenes (solo si no se ha alcanzado el límite) */}
                {imagenesVenta.length < 10 && (
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp"
                      multiple
                      onChange={handleImagenesChange}
                      className="hidden"
                      id="imagenes-input"
                    />
                    <label 
                      htmlFor="imagenes-input" 
                      className="cursor-pointer block"
                    >
                      <div className="relative pt-[100%] rounded-xl overflow-hidden border-2 border-dashed border-[#56ab91]/60 bg-slate-800/20 hover:bg-slate-800/40 hover:border-[#56ab91] transition-all group">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                          <span className="text-3xl group-hover:scale-110 transition-transform">📸</span>
                          <p className="text-xs text-gray-400 text-center px-2">
                            {imagenesVenta.length === 0 ? 'Agregar imágenes' : 'Agregar más'}
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Contador de imágenes */}
              {imagenesVenta.length > 0 && (
                <p className="text-xs text-emerald-400 mt-3 text-center">
                  {imagenesVenta.length} / 10 imágenes seleccionadas
                </p>
              )}

              {/* Mostrar errores */}
              {erroresImagen.length > 0 && (
                <div className="mt-3 p-2 bg-red-900/50 border border-red-500 rounded-lg">
                  {erroresImagen.map((error, idx) => (
                    <p key={idx} className="text-xs text-red-300">{error}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Área para seleccionar carta de colección */}
          {tipoPublicacion === 'coleccion' && (
            <div 
              className={`w-full h-40 border-2 border-dashed rounded-3xl flex items-center justify-center transition-all cursor-pointer
                ${selectedCarta 
                  ? 'border-[#d91a7a] bg-slate-800/40' 
                  : 'border-[#56ab91]/60 hover:bg-slate-800/20'
                }`}
              onClick={() => setShowGalleryModal(true)}
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
                    Seleccionar carta para colección
                  </span>
                </div>
              )}
            </div>
          )}

          {/* descripción */}
          <div>
            <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Descripción</label>
            <textarea 
              rows="4"
              className="w-full bg-transparent border-2 border-dashed border-[#56ab91]/60 rounded-3xl py-4 px-4 outline-none focus:border-emerald-400 resize-none"
              placeholder={tipoPublicacion === 'coleccion' 
                ? 'Describe tu colección...' 
                : tipoPublicacion === 'venta'
                ? 'Describe la carta que vendes (estado, rareza, etc)...'
                : 'Describe la carta que ofreces para intercambio...'}
            ></textarea>
          </div>

          {/* btn publicar */}
          <div className="flex justify-center pt-2">
            <button 
              onClick={handlePublicar}
              type="button"
              className="bg-[#d91a7a] hover:bg-[#f22c8e] text-white font-black py-3 px-24 rounded-xl shadow-lg transform active:scale-95 transition-all uppercase tracking-[0.2em] text-xs"
              disabled={!tipoPublicacion}
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
        }}
        onSelectCarta={(carta) => {
          handleSelectCarta(carta);
          setShowGalleryModal(false);
        }}
      />
    </div>
  );
};

export default PublicarCarta;