import React, { useState } from 'react';
import Gallery from '../componentes/Modals/Gallery';
import '../App.css'
import '../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../componentes/Toggle/ThemeOptions';
const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

import Navbar from '../componentes/Layout/navbar';

const PublicarCarta = ({ setPantalla }) => {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedCartas, setSelectedCartas] = useState([]);
  const [tipoPublicacion, setTipoPublicacion] = useState('');
  const [imagenesVenta, setImagenesVenta] = useState([]);
  const [erroresImagen, setErroresImagen] = useState([]);

  const handleTipoChange = (e) => {
    const tipo = e.target.value;
    setTipoPublicacion(tipo);


    if (tipo !== 'venta' && tipo !== 'intercambio') {
      setImagenesVenta([]);
    }


    if (tipo === 'coleccion') {
      setShowGalleryModal(true);
    }
  };

  const handleSelectCartas = (cartas) => {
    setSelectedCartas(cartas);
    console.log('Cartas seleccionadas para colección:', cartas);
  };

  const eliminarCarta = (cartaId) => {
    setSelectedCartas(prev => prev.filter(c => c.id !== cartaId));
  };

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

  const handlePublicar = async () => {


    // Aquí va la lógica de publicación
    try {
      if (tipoPublicacion !== 'venta') {
        alert('Solo venta por ahora');
        return;
      }


      if (!titulo || !precio || imagenesVenta.length === 0) {
        alert('Faltan datos obligatorios');
        return;
      }

      const formDataToSend = new FormData();

    formDataToSend.append('Titulo', titulo);
    formDataToSend.append('Texto', descripcion);
    formDataToSend.append('Tipo', tipoPublicacion);
    formDataToSend.append('Monto', precio);
    formDataToSend.append('Franquicia', franquicia);
    formDataToSend.append('Cantidad', cantidad);
    formDataToSend.append('Condicion', 'buena');

    imagenesVenta.forEach((img) => {
      formDataToSend.append('imagenes', img.file); 
    });

    const response = await fetch('http://localhost:3000/api/publicaciones', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formDataToSend
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    console.log('✅ Publicación creada:', data);

    alert('Publicación creada con éxito');
    setPantalla('perfil');

    } catch (error) {
      console.error('❌ Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className='App' id='App'>
      <div className="min-h-screen bg-slate text-white font-sans p-4 flex flex-col items-center">
        <div className="relative w-full max-w-2xl border-2 border rounded-3xl bg-slate-900/40 p-10 shadow-2xl">
          {!showGalleryModal && (
            <button
              onClick={() => setPantalla('perfil')}
              className="absolute top-6 right-6 w-10 h-10 bg-[#2d2a3e] rounded-full flex items-center justify-center font-bold border hover:bg-red-600 transition-all z-10"
            >
              X
            </button>
          )}
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex gap-4 mb-4">
              <div className="relative">
                <select
                  className="bg-slate rounded-full py-2 px-6 pr-10 outline-none border-none text-white appearance-none cursor-pointer text-sm font-medium min-w-[130px]"
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
                <select className="bg-slate rounded-full py-2 px-6 pr-10 outline-none border-none text-white appearance-none cursor-pointer text-sm font-medium min-w-[130px]">
                  <option value="pokemon">Pokemon</option>
                  <option value="magic">Magic</option>
                  <option value="dragonball">Dragon Ball</option>
                  <option value="yugioh">Yu-Gi-Oh</option>
                  <option value="digimon">Digimon</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]">▼</span>
              </div>
            </div>


            <div className="flex gap-4 items-end">
              <div className="flex-[4]">
                <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Título</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full bg-transparent border-2 border-dashed border rounded-2xl py-2 px-4 outline-none focus:border-[--focus-color]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Cantidad</label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="w-full bg-transparent border-2 border-dashed border rounded-2xl py-2 px-4 outline-none focus:border-[--focus-color] text-center"
                  placeholder="1"
                  min="1"
                  defaultValue="1"
                />
              </div>
            </div>


            {
              tipoPublicacion === 'venta' && (
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Precio</label>
                  <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full bg-transparent border-2 border-dashed border rounded-2xl py-2 px-4 outline-none focus:border-[--focus-color]"
                    placeholder="$0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              )
            }


            {
              (tipoPublicacion === 'venta' || tipoPublicacion === 'intercambio') && (
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">
                    Imágenes de la carta
                    <span className="text-xs text-gray-400 ml-2">(Máximo 10 imágenes, solo formatos de imagen)</span>
                  </label>


                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

                    {imagenesVenta.map((img) => (
                      <div key={img.id} className="relative group">
                        <div className="relative pt-[100%] rounded-xl overflow-hidden border-2 bg-slate-800/40 hover:border-[#56ab91] transition-all">
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
                    {
                      imagenesVenta.length < 10 && (
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
                            <div className="relative pt-[100%] rounded-xl overflow-hidden border-2 border-dashed border bg-slate-800/20 hover:bg-slate-800/40 hover:bg-[--hover-button-color] transition-all group">
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

                  {imagenesVenta.length > 0 && (
                    <p className="text-xs text-emerald-400 mt-2 text-center">
                      {imagenesVenta.length} / 10 imágenes seleccionadas
                    </p>
                  )}

                  {erroresImagen.length > 0 && (
                    <div className="mt-2 p-2 bg-red-900/50 border border-red-500 rounded-lg">
                      {erroresImagen.map((error, idx) => (
                        <p key={idx} className="text-xs text-red-300">{error}</p>
                      ))}
                    </div>
                  )}
                </div>
              )
            }


            {
              tipoPublicacion === 'coleccion' && (
                <div
                  className={`w-full h-40 border-2 border-dashed rounded-3xl flex items-center justify-center transition-all cursor-pointer
                ${selectedCarta
                      ? 'border bg-slate-800/40'
                      : 'border hover:bg-slate-800/20'
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
                    <div className="bg-slate px-6 py-2 rounded-xl border border-slate-500 shadow-lg group">
                      <span className="text-gray-200 font-bold text-xs uppercase tracking-wide group-hover:text-white">
                        Seleccionar carta para colección
                      </span>
                    </div>
                  )}
                </div>
              )
            }


            <div>
              <label className="block text-sm font-bold mb-2 ml-1 tracking-tight">Descripción</label>
              <textarea
                rows="4"
                className="w-full bg-transparent border-2 border-dashed border rounded-3xl py-4 px-4 outline-none focus:border-[--focus-color] resize-none"
                placeholder={tipoPublicacion === 'coleccion'
                  ? 'Describe tu colección...'
                  : tipoPublicacion === 'venta'
                    ? 'Describe la carta que vendes (estado, rareza, etc)...'
                    : 'Describe la carta que ofreces para intercambio...'}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></textarea>
            </div>


            <div className="flex justify-center pt-2">
              <button
                onClick={handlePublicar}
                type="button"
                className="bg-slate hover:bg-[#f22c8e] text-white font-black py-3 px-24 rounded-xl shadow-lg transform active:scale-95 transition-all uppercase tracking-[0.2em] text-xs"
                disabled={!tipoPublicacion}
              >
                Publicar
              </button>
            </div>
          </form >
        </div >


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
      </div >
      {/* SECCIÓN COLECCIÓN - MÚLTIPLES CARTAS */}
      {tipoPublicacion === 'coleccion' && (
        <div>
          <label className="block text-sm font-bold mb-1 ml-1 tracking-tight">
            Cartas en tu colección
            <span className="text-xs text-gray-400 ml-2">(Puedes seleccionar múltiples cartas)</span>
          </label>

          <div
            className={`w-full min-h-[180px] border-2 border-dashed rounded-3xl p-4 transition-all cursor-pointer
                    ${selectedCartas.length > 0
                ? 'border-[#d91a7a] bg-slate-800/40'
                : 'border-[#56ab91]/60 hover:bg-slate-800/20'
              }`}
            onClick={() => setShowGalleryModal(true)}
          >
            {selectedCartas.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-[#d91a7a]">
                    {selectedCartas.length} {selectedCartas.length === 1 ? 'carta seleccionada' : 'cartas seleccionadas'} ✓
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCartas([]);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Limpiar todo
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedCartas.map((carta) => (
                    <div key={carta.id} className="relative group">
                      <div className="bg-slate-700/50 rounded-xl overflow-hidden">
                        <div className="aspect-[2/3] w-full">
                          <img
                            src={carta.imagen}
                            alt={carta.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <p className="text-xs font-bold truncate">{carta.nombre}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            eliminarCarta(carta.id);
                          }}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
                        >
                          <span className="text-white text-xs font-bold">✕</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGalleryModal(true);
                    }}
                    className="bg-slate-700/30 rounded-xl border-2 border-dashed border-[#56ab91]/40 flex items-center justify-center cursor-pointer hover:bg-slate-700/50 transition-all min-h-[150px]"
                  >
                    <div className="text-center">
                      <span className="text-xs text-gray-400">Agregar más</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[150px]">
                <div className="bg-[#4d5b61] px-6 py-2 rounded-xl border border-slate-500 shadow-lg group">
                  <span className="text-gray-200 font-bold text-xs uppercase tracking-wide group-hover:text-white">
                    Seleccionar cartas para colección
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold mb-1 ml-1 tracking-tight">Descripción</label>
        <textarea
          rows="4"
          className="w-full bg-transparent border-2 border-dashed border-[#56ab91]/60 rounded-3xl py-3 px-4 outline-none focus:border-emerald-400 resize-none"
          placeholder={tipoPublicacion === 'coleccion'
            ? 'Describe tu colección...'
            : tipoPublicacion === 'venta'
              ? 'Describe la carta que vendes (estado, rareza, etc)...'
              : 'Describe la carta que ofreces para intercambio...'}
        ></textarea>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={handlePublicar}
          type="button"
          className="bg-slate hover:bg-[#f22c8e] text-white font-black py-3 px-24 rounded-xl shadow-lg transform active:scale-95 transition-all uppercase tracking-[0.2em] text-xs"
          disabled={!tipoPublicacion}
        >
          Publicar
        </button>
      </div>


      <Gallery
        isOpen={showGalleryModal}
        onClose={() => {
          setShowGalleryModal(false);
        }}
        onSelectCartas={handleSelectCartas}
      />
    </div >
  );
};

export default PublicarCarta;