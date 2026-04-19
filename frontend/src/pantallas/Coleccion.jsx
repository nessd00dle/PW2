import React, { useState, useEffect } from 'react';
import Navbar from '../componentes/Layout/navbar';
import '../App.css'
import './index.css'

const Coleccion = ({ setPantalla }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenesPublicacion, setImagenesPublicacion] = useState([]);
  const [imagenActual, setImagenActual] = useState(0);
  const [publicacionActual, setPublicacionActual] = useState(null);

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

  // Prevenir scroll cuando el modal está abierto
  useEffect(() => {
    if (modalAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalAbierto]);

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

  // Modal de detalle de carta - Diseño de dos columnas
  const ModalDetalle = () => {
    if (!modalAbierto || !publicacionActual) return null;

    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflowY: 'auto'
        }}
        onClick={cerrarModal}
      >
        <div 
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '80rem',
            margin: '0 auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={cerrarModal}
            style={{
              position: 'absolute',
              top: '-3rem',
              right: 0,
              width: '2.5rem',
              height: '2.5rem',
              backgroundColor: '#dc2626',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              border: '2px solid white',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <span style={{ color: 'white', fontSize: '1.25rem' }}>✕</span>
          </button>

          {/* Contenido del modal - DISEÑO DE DOS COLUMNAS */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}>
            {/* Columna izquierda - Imagen con navegación (60%) */}
            <div style={{
              flex: '1 1 500px',
              minWidth: '300px',
              minHeight: '500px',
              border: '2px solid #56ab91',
              borderRadius: '1.5rem',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '1rem'
            }}>
              {imagenesPublicacion.length > 1 && (
                <>
                  <button
                    onClick={imagenAnterior}
                    style={{
                      position: 'absolute',
                      left: '0.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '2.5rem',
                      height: '2.5rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #56ab91',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <span style={{ color: 'white', fontSize: '1.5rem' }}>‹</span>
                  </button>
                  <button
                    onClick={imagenSiguiente}
                    style={{
                      position: 'absolute',
                      right: '0.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '2.5rem',
                      height: '2.5rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #56ab91',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <span style={{ color: 'white', fontSize: '1.5rem' }}>›</span>
                  </button>
                </>
              )}

              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={imagenesPublicacion[imagenActual]}
                  alt={`Imagen ${imagenActual + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    borderRadius: '0.75rem'
                  }}
                />
                {imagenesPublicacion.length > 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    color: 'white'
                  }}>
                    {imagenActual + 1} / {imagenesPublicacion.length}
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha - Información (35%) */}
            <div style={{
              flex: '1 1 400px',
              minWidth: '280px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {/* Info de la carta */}
              <div style={{
                border: '2px solid #56ab91',
                borderRadius: '1rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(15, 23, 42, 0.9)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>{publicacionActual.titulo}</h2>
                    <button style={{ color: '#ec4899', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>♥</button>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                      <span style={{ color: '#34d399', fontWeight: 'bold' }}>Usuario:</span> {publicacionActual.usuario}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                      <span style={{ color: '#34d399', fontWeight: 'bold' }}>Fandom:</span> {publicacionActual.franquicia}
                    </p>
                  </div>
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(86, 171, 145, 0.2)' }}>
                    <p style={{ fontWeight: 'bold', color: '#34d399', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Descripción:</p>
                    <p style={{ color: '#d1d5db', fontSize: '0.875rem', marginTop: '0.25rem', lineHeight: '1.5' }}>
                      {publicacionActual.descripcion}
                    </p>
                  </div>
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                    <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      Publicado: {publicacionActual.timestamp}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      ❤️ {publicacionActual.likes} Me gusta
                    </p>
                  </div>
                </div>
              </div>

              {/* Comentarios */}
              <div style={{
                border: '2px solid #56ab91',
                borderRadius: '1rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <h3 style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#34d399' }}>
                  Comentarios ({publicacionActual.comentarios.length})
                </h3>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.75rem', 
                  maxHeight: '250px', 
                  overflowY: 'auto',
                  scrollbarWidth: 'thin'
                }}>
                  {publicacionActual.comentarios.map((comentario, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'rgba(45, 42, 62, 0.6)',
                      padding: '0.75rem',
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      border: '1px solid rgba(86, 171, 145, 0.1)'
                    }}>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        backgroundColor: '#56ab91',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <img src={comentario.avatar} alt={comentario.usuario} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#34d399', display: 'block' }}>{comentario.usuario}</span>
                        <p style={{ fontSize: '0.75rem', color: '#e5e7eb', marginTop: '0.2rem' }}>{comentario.texto}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Escribir comentario */}
                <div style={{
                  marginTop: '0.25rem',
                  border: '2px dashed rgba(86, 171, 145, 0.6)',
                  borderRadius: '1rem',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    backgroundColor: '#2d2a3e',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img src="https://media.tenor.com/pgRHsHG3M2MAAAAe/gato-serio.png" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <input
                    type="text"
                    placeholder="Escribe un comentario..."
                    style={{
                      background: 'transparent',
                      flex: 1,
                      outline: 'none',
                      fontSize: '0.8rem',
                      color: 'white',
                      border: 'none'
                    }}
                  />
                  <button style={{ color: '#34d399', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>➤</button>
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

        {/* Feed de publicaciones */}
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

              {/* Grid de imágenes */}
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