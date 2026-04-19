import React, { useState } from 'react';
import Navbar from '../componentes/Layout/navbar';
import '../App.css'
import './index.css'
import ThemeOption from '../componentes/Toggle/ThemeOptions';
import useLocalStorage from 'use-local-storage';

const Coleccion = ({ setPantalla }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenesPublicacion, setImagenesPublicacion] = useState([]);
  const [imagenActual, setImagenActual] = useState(0);
  const [publicacionActual, setPublicacionActual] = useState(null);
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  // Datos de ejemplo para las publicaciones
  const publicaciones = [
    {
      id: 1,
      usuario: "María González",
      avatar: "https://i.pravatar.cc/150?img=1",
      franquicia: "Pokémon TCG",
      titulo: "Mi mazo soñado ✨",
      descripcion: "Por fin conseguí esta carta tan buscada, después de meses de búsqueda la encontré en perfecto estado. ¡Estoy muy emocionada!",
      imagenes: [
        "https://i.pinimg.com/736x/65/ca/29/65ca29f9b651507b5d7f22e026efd934.jpg",
        "https://i.pinimg.com/736x/de/2e/b6/de2eb6fa73ee8ca0207f369c27d93a41.jpg",
        "https://i.pinimg.com/736x/07/82/77/078277c4800956801743a953bd5f99a1.jpg"
      ],

      likes: 24,
      comentarios: [
        { usuario: "Carlos", texto: "Muy buena elección de cartas", avatar: "https://i.pravatar.cc/150?img=8" },
        { usuario: "Ana", texto: "Nunca había pensado en combinar esas cartas, pero quedan geniales", avatar: "https://i.pravatar.cc/150?img=5" }
      ],
      timestamp: "Hace 2 horas"
    },
    {
      id: 2,
      usuario: "Carlos Ruiz",
      avatar: "https://i.pravatar.cc/150?img=8",
      franquicia: "Magic: The Gathering",
      titulo: "Torneo local 🏆",
      descripcion: "Excelente día de juego, logré quedar en tercer lugar con mi mazo de dragones. ¡La comunidad cada vez más grande!",
      imagenes: [
        "https://media.wizards.com/2020/m21/sp_oUXkK8xzpJ.png",
        "https://api.tcg.land/images/mtg/v2/fdn/44/en/a-75.webp"
      ],
      precio: "$800.00",
      cantidad: 2,
      likes: 42,
      comentarios: [
        { usuario: "Luis", texto: "Gran torneo, fue increíble", avatar: "https://i.pravatar.cc/150?img=12" }
      ],
      timestamp: "Hace 5 horas"
    },
    {
      id: 3,
      usuario: "Ana Martínez",
      avatar: "https://i.pravatar.cc/150?img=5",
      franquicia: "Yu-Gi-Oh!",
      titulo: "Mi colección completa",
      descripcion: "Después de años finalmente completé la colección de las cartas originales. ¡Sueño cumplido!",
      imagenes: [
        "https://i.pinimg.com/736x/43/f9/b2/43f9b2a40e6454e58714ef6a5f26618b.jpg",
        "https://i.pinimg.com/736x/8e/0d/1d/8e0d1db60e1243596fbc263ba79d19b6.jpg",
        "https://i.pinimg.com/736x/b0/55/0b/b0550bb7717419b7f745e92c94753ec3.jpg",
        "https://i.pinimg.com/736x/c1/09/de/c109de8ec00ce6e1f0bd7262a75bfb28.jpg"
      ],

      likes: 87,
      comentarios: [
        { usuario: "Roberto", texto: "¡Impresionante colección!", avatar: "https://i.pravatar.cc/150?img=12" },
        { usuario: "Laura", texto: "¿Cuánto tiempo te tomó?", avatar: "https://i.pravatar.cc/150?img=10" }
      ],
      timestamp: "Hace 1 día"
    }
  ];

  const abrirModal = (publicacion, indiceImagen) => {
    setPublicacionActual(publicacion);
    setImagenesPublicacion(publicacion.imagenes);
    setImagenActual(indiceImagen);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPublicacionActual(null);
    setImagenesPublicacion([]);
    setImagenActual(0);
  };

  const imagenSiguiente = () => {
    setImagenActual((prev) => (prev + 1) % imagenesPublicacion.length);
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenesPublicacion.length) % imagenesPublicacion.length);
  };

  // Modal de detalle de carta
  const ModalDetalle = () => {
    if (!modalAbierto || !publicacionActual) return null;

    return (
    <div className='App' id='App'>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-7xl mx-auto">

            {/* Botón cerrar */}
            <button
              onClick={cerrarModal}
              className="absolute -top-12 right-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold border-2 border-white hover:bg-red-700 transition-colors shadow-lg z-10"
            >
              <span className="text-white text-xl">✕</span>
            </button>

            {/* Contenido del modal */}
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

              {/* Columna izquierda - Imagen con navegación */}
              <div className="w-full lg:w-[500px] xl:w-[600px] min-h-[500px] border-2 border-[#56ab91] rounded-3xl bg-slate-900/80 flex items-center justify-center relative shadow-2xl p-4">
                {imagenesPublicacion.length > 1 && (
                  <>
                    <button
                      onClick={imagenAnterior}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center border border-[#56ab91] hover:bg-emerald-900 transition-colors z-10"
                    >
                      <span className="text-white text-2xl">‹</span>
                    </button>
                    <button
                      onClick={imagenSiguiente}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center border border-[#56ab91] hover:bg-emerald-900 transition-colors z-10"
                    >
                      <span className="text-white text-2xl">›</span>
                    </button>
                  </>
                )}

                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={imagenesPublicacion[imagenActual]}
                    alt={`Imagen ${imagenActual + 1}`}
                    className="max-w-full max-h-[500px] object-contain rounded-xl"
                  />
                  {imagenesPublicacion.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full text-xs text-white">
                      {imagenActual + 1} / {imagenesPublicacion.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Columna derecha - Información */}
              <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col gap-4">

                {/* Info de la carta */}
                <div className="border-2 border-[#56ab91] rounded-2xl p-6 bg-slate-900/80 relative shadow-xl">
                  <div className="space-y-3 text-sm text-gray-200">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold text-white mb-2">{publicacionActual.titulo}</h2>
                      <button className="text-pink-500 text-2xl hover:scale-110 transition-transform">
                        ♥
                      </button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">
                        <span className="text-emerald-400 font-semibold">Usuario:</span> {publicacionActual.usuario}
                      </p>

                      <p className="text-sm text-gray-300">
                        <span className="text-emerald-400 font-semibold">Fandom:</span> {publicacionActual.franquicia}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#56ab91]/20">
                      <p className="font-bold text-emerald-400 text-xs uppercase italic">Descripción:</p>
                      <p className="text-gray-300 text-sm leading-relaxed mt-1">
                        {publicacionActual.descripcion}
                      </p>
                    </div>
                    <div className="mt-2 pt-2">
                      <p className="text-xs text-gray-400">
                        Publicado: {publicacionActual.timestamp}
                      </p>
                      <p className="text-xs text-gray-400">
                        ❤️ {publicacionActual.likes} Me gusta
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comentarios */}
                <div className="border-2 border-[#56ab91] rounded-2xl p-6 bg-slate-900/80 flex flex-col gap-4 shadow-xl">
                  <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500">
                    Comentarios ({publicacionActual.comentarios.length})
                  </h3>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {publicacionActual.comentarios.map((comentario, idx) => (
                      <div key={idx} className="bg-[#2d2a3e]/60 p-3 rounded-2xl flex items-start gap-3 border border-[#56ab91]/10">
                        <div className="w-8 h-8 bg-[#56ab91] rounded-full shrink-0 overflow-hidden border-2 border-[#2d2a3e]">
                          <img src={comentario.avatar} alt={comentario.usuario} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-bold text-emerald-400 block">{comentario.usuario}</span>
                          <p className="text-xs text-gray-200">{comentario.texto}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Escribir comentario */}
                  <div className="mt-2 border-2 border-dashed border-[#56ab91]/60 rounded-2xl p-3 flex items-center gap-3 bg-black/30 focus-within:border-emerald-400 transition-colors">
                    <div className="w-8 h-8 bg-slate-700 rounded-full shrink-0 overflow-hidden">
                      <img src="https://media.tenor.com/pgRHsHG3M2MAAAAe/gato-serio.png" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <input
                      type="text"
                      placeholder="Escribir comentario..."
                      className="bg-transparent flex-1 outline-none text-sm placeholder-gray-500 text-white"
                    />
                    <button className="text-emerald-500 hover:scale-125 transition-transform">➤</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (      
    <div className='App' id='App'>

    <div className="min-h-screen primary-text font-sans p-4">

      {/* Modal */}
      <ModalDetalle />

        {/* Navbar reutilizable */}
        <Navbar setPantalla={setPantalla} />

        {/* Feed de publicaciones  */}
        <div className="max-w-4xl mx-auto space-y-6">
          {publicaciones.map((pub) => (
            <div
              key={pub.id}
              className="bg-slate-900/60 rounded-2xl border border-[#56ab91]/30 overflow-hidden hover:border-[#56ab91]/60 transition-all shadow-xl"
            >
              {/* Header de la publicación */}
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#56ab91]">
                    <img
                      src={pub.avatar}
                      alt={pub.usuario}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white hover:underline cursor-pointer">
                        {pub.usuario}
                      </span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-400 text-sm">{pub.timestamp}</span>
                    </div>
                    <span className="text-xs text-emerald-400">{pub.franquicia}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  ⋯
                </button>
              </div>

              {/* Contenido de la publicación */}
              <div className="px-4 pb-3">
                <h3 className="font-bold text-lg text-white mb-2">{pub.titulo}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{pub.descripcion}</p>
              </div>

              {/* Grid de imágenes - Estilo Facebook con click para abrir modal */}
              {pub.imagenes.length > 0 && (
                <div className={`grid gap-1 bg-black/20 ${pub.imagenes.length === 1 ? 'grid-cols-1' :
                  pub.imagenes.length === 2 ? 'grid-cols-2' :
                    pub.imagenes.length === 3 ? 'grid-cols-2' :
                      'grid-cols-2'
                  }`}>
                  {pub.imagenes.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative overflow-hidden bg-slate-800 cursor-pointer ${pub.imagenes.length === 3 && idx === 0 ? 'row-span-2' : ''
                        }`}
                      style={{ paddingBottom: '75%' }}
                      onClick={() => abrirModal(pub, idx)}
                    >
                      <img
                        src={img}
                        alt={`Imagen ${idx + 1}`}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {pub.imagenes.length === 4 && idx === 3 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/60 transition-colors">
                          <span className="text-white font-bold text-lg">+{pub.imagenes.length - 3}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Estadísticas de interacción */}
              <div className="px-4 py-2 border-t border-[#56ab91]/20 flex justify-between text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <span>❤️</span>
                  <span>{pub.likes}</span>
                </div>
                <div>
                  <span>{pub.comentarios.length} comentarios</span>
                </div>
              </div>

              {/* Botones de interacción */}
              <div className="px-4 py-2 border-t border-[#56ab91]/20 flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-800 transition-colors text-gray-300 hover:text-pink-400 group">
                  <span className="text-xl group-hover:scale-110 transition-transform">❤️</span>
                  <span className="text-sm font-medium">Me gusta</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-slate-800 transition-colors text-gray-300 hover:text-emerald-400">
                  <span className="text-xl">💬</span>
                  <span className="text-sm font-medium">Comentar</span>
                </button>
              </div>

              {/* Input de comentario */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-full shrink-0 overflow-hidden">
                    <img src="https://media.tenor.com/pgRHsHG3M2MAAAAe/gato-serio.png" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full bg-slate-800 rounded-full py-2 px-4 outline-none border border-[#56ab91]/30 focus:border-[#56ab91] text-sm text-white placeholder-gray-500"
                      placeholder="Escribe un comentario..."
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  };

export default Coleccion;