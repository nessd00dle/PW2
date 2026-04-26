import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../componentes/Layout/navbar';
import PubliCard from '../componentes/Cards/PubliCard';
import Avatar from '../componentes/Avatar'; 
import '../App.css';
import '../index.css';

const Coleccion = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenesPublicacion, setImagenesPublicacion] = useState([]);
  const [imagenActual, setImagenActual] = useState(0);
  const [publicacionActual, setPublicacionActual] = useState(null);
  const [modalLiked, setModalLiked] = useState(false);
  const [modalLikesCount, setModalLikesCount] = useState(0);
  const [modalComentarios, setModalComentarios] = useState([]);
  const [likesStatus, setLikesStatus] = useState({});
  
  // Usar useRef para el input del comentario
  const comentarioInputRef = useRef(null);
  const comentarioValueRef = useRef('');

  const publicaciones = [
    {
      id: 1,
      usuario: "María González",
      usuarioId: "123",
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
        { id: 1, usuario: "Carlos", usuarioId: "456", texto: "Muy buena elección de cartas", avatar: "https://i.pravatar.cc/150?img=8", timestamp: "Hace 2 días" },
        { id: 2, usuario: "Ana", usuarioId: "789", texto: "Nunca había pensado en combinar esas cartas, pero quedan geniales", avatar: "https://i.pravatar.cc/150?img=5", timestamp: "Hace 1 día" }
      ],
      timestamp: "Hace 2 horas"
    },
    {
      id: 2,
      usuario: "Carlos Ruiz",
      usuarioId: "456",
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
        { id: 3, usuario: "Luis", usuarioId: "101", texto: "Gran torneo, fue increíble", avatar: "https://i.pravatar.cc/150?img=12", timestamp: "Hace 3 horas" }
      ],
      timestamp: "Hace 5 horas"
    },
    {
      id: 3,
      usuario: "Ana Martínez",
      usuarioId: "789",
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
        { id: 4, usuario: "Roberto", usuarioId: "111", texto: "¡Impresionante colección!", avatar: "https://i.pravatar.cc/150?img=12", timestamp: "Hace 5 días" },
        { id: 5, usuario: "Laura", usuarioId: "112", texto: "¿Cuánto tiempo te tomó?", avatar: "https://i.pravatar.cc/150?img=10", timestamp: "Hace 4 días" }
      ],
      timestamp: "Hace 1 día"
    }
  ];

  useEffect(() => {
    if (usuario && usuario.id) {
      const savedLikes = localStorage.getItem(`likes_${usuario.id}`);
      if (savedLikes) {
        setLikesStatus(JSON.parse(savedLikes));
      }
    }
  }, [usuario]);

  useEffect(() => {
    if (modalAbierto) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    };
  }, [modalAbierto]);

  const abrirModal = (publicacion, indiceImagen) => {
    setPublicacionActual(publicacion);
    setImagenesPublicacion(publicacion.imagenes);
    setImagenActual(indiceImagen);
    const userLiked = likesStatus[publicacion.id] || false;
    setModalLiked(userLiked);
    setModalLikesCount(publicacion.likes);
    setModalComentarios(publicacion.comentarios);
    setModalAbierto(true);
    // Resetear el valor del comentario cuando se abre el modal
    comentarioValueRef.current = '';
    if (comentarioInputRef.current) {
      comentarioInputRef.current.value = '';
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPublicacionActual(null);
    setImagenesPublicacion([]);
    setImagenActual(0);
    setModalLiked(false);
    setModalComentarios([]);
  };

  const imagenSiguiente = () => {
    setImagenActual((prev) => (prev + 1) % imagenesPublicacion.length);
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenesPublicacion.length) % imagenesPublicacion.length);
  };

  const handleModalLike = () => {
    if (!publicacionActual) return;
    
    let newLikedStatus;
    let newLikesCount;
    
    if (modalLiked) {
      newLikedStatus = false;
      newLikesCount = modalLikesCount - 1;
    } else {
      newLikedStatus = true;
      newLikesCount = modalLikesCount + 1;
    }
    
    setModalLiked(newLikedStatus);
    setModalLikesCount(newLikesCount);
    
    const newLikesStatus = {
      ...likesStatus,
      [publicacionActual.id]: newLikedStatus
    };
    setLikesStatus(newLikesStatus);
    
    if (usuario && usuario.id) {
      localStorage.setItem(`likes_${usuario.id}`, JSON.stringify(newLikesStatus));
    }
  };

  const handleModalComentario = (e) => {
    e.preventDefault();
    const textoComentario = comentarioValueRef.current;
    if (textoComentario.trim() && usuario) {
      const nuevoComentario = {
        id: Date.now(),
        usuario: usuario.nombre || usuario.correo?.split('@')[0] || "Usuario",
        usuarioId: usuario.id,
        texto: textoComentario,
        avatar: usuario.fotoPerfil,
        timestamp: "Ahora mismo"
      };
      setModalComentarios([...modalComentarios, nuevoComentario]);
      // Limpiar el input después de enviar
      comentarioValueRef.current = '';
      if (comentarioInputRef.current) {
        comentarioInputRef.current.value = '';
      }
    }
  };

  // Resto del código del modal aquí...
  // (Mantén el ModalDetalle como está pero sin el estado nuevoComentarioModal)

  return (      
    <div className='App' id='App'>
      <div className="min-h-screen primary-text font-sans p-4">
        {modalAbierto && publicacionActual && (
          <>
            <style>{`
              .custom-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background: rgba(86, 171, 145, 0.1);
                border-radius: 10px;
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background: rgba(86, 171, 145, 0.5);
                border-radius: 10px;
              }
              .custom-scroll::-webkit-scrollbar-thumb:hover {
                background: rgba(86, 171, 145, 0.8);
              }
            `}</style>
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
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
              onClick={cerrarModal}
            >
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '90rem',
                  margin: '2rem auto',
                  padding: '0 1rem'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={cerrarModal}
                  style={{
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
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
                    zIndex: 20,
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span style={{ color: 'white', fontSize: '1.25rem' }}>✕</span>
                </button>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                  alignItems: 'start',
                }}>
                  
                  <div style={{
                    border: '2px solid #56ab91',
                    borderRadius: '1.5rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: '1rem',
                    minHeight: '400px',
                    width: '100%'
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
                            zIndex: 10,
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(86, 171, 145, 0.5)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
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
                            zIndex: 10,
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(86, 171, 145, 0.5)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                        >
                          <span style={{ color: 'white', fontSize: '1.5rem' }}>›</span>
                        </button>
                      </>
                    )}

                    <div style={{
                      position: 'relative',
                      width: '100%',
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
                          width: 'auto',
                          height: 'auto',
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

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingRight: '0.5rem'
                  }}
                  className="custom-scroll">
                   
                    <div style={{
                      border: '2px solid #56ab91',
                      borderRadius: '1rem',
                      padding: '1.25rem',
                      backgroundColor: 'rgba(15, 23, 42, 0.9)'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#e5e7eb' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>{publicacionActual.titulo}</h2>
                          <button 
                            onClick={handleModalLike}
                            style={{ 
                              fontSize: '1.8rem', 
                              background: 'none', 
                              border: 'none', 
                              cursor: 'pointer',
                              transition: 'transform 0.2s',
                              color: modalLiked ? '#ec4899' : '#9ca3af',
                              padding: '0.25rem',
                              lineHeight: 1
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            {modalLiked ? '❤️' : '🤍'}
                          </button>
                        </div>
                        <div>
                          <p style={{ fontSize: '0.8rem', color: '#d1d5db', textAlign: 'justify', margin: '0.25rem 0' }}>
                            <span style={{ color: '#34d399', fontWeight: 'bold' }}>Usuario:</span> {publicacionActual.usuario}
                          </p>
                          <p style={{ fontSize: '0.8rem', color: '#d1d5db', textAlign: 'justify', margin: '0.25rem 0' }}>
                            <span style={{ color: '#34d399', fontWeight: 'bold' }}>Fandom:</span> {publicacionActual.franquicia}
                          </p>
                        </div>
                        <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(86, 171, 145, 0.2)' }}>
                          <p style={{ fontWeight: 'bold', color: '#34d399', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Descripción:</p>
                          <p style={{ color: '#d1d5db', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: '1.5', textAlign: 'justify' }}>
                            {publicacionActual.descripcion}
                          </p>
                        </div>
                        <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                          <p style={{ fontSize: '0.65rem', color: '#9ca3af', textAlign: 'justify', margin: '0.25rem 0' }}>
                            Publicado: {publicacionActual.timestamp}
                          </p>
                          <p style={{ fontSize: '0.65rem', color: '#9ca3af', textAlign: 'justify', margin: '0.25rem 0' }}>
                            {modalLiked ? '❤️' : '🤍'} {modalLikesCount} Me gusta
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      border: '2px solid #56ab91',
                      borderRadius: '1rem',
                      padding: '1.25rem',
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}>
                      <h3 style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#34d399', margin: 0 }}>
                        Comentarios ({modalComentarios.length})
                      </h3>

                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.75rem', 
                        maxHeight: '300px', 
                        overflowY: 'auto',
                        paddingRight: '0.5rem'
                      }}
                      className="custom-scroll">
                        {modalComentarios.length > 0 ? (
                          modalComentarios.map((comentario, idx) => (
                            <div key={comentario.id || idx} style={{
                              backgroundColor: comentario.usuarioId === usuario?.id ? 'rgba(86, 171, 145, 0.2)' : 'rgba(45, 42, 62, 0.6)',
                              padding: '0.6rem',
                              borderRadius: '0.75rem',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.6rem',
                              border: comentario.usuarioId === usuario?.id ? '1px solid rgba(86, 171, 145, 0.5)' : '1px solid rgba(86, 171, 145, 0.1)'
                            }}>
                              <div style={{ width: '1.8rem', height: '1.8rem', flexShrink: 0 }}>
                                <Avatar
                                  fotoPerfil={comentario.avatar}
                                  nombre={comentario.usuario}
                                  size="w-full h-full"
                                  textSize="text-sm"
                                  borderColor="border-transparent"
                                />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#34d399', display: 'block' }}>
                                    {comentario.usuario}
                                    {comentario.usuarioId === usuario?.id && (
                                      <span style={{ fontSize: '0.6rem', marginLeft: '0.5rem', color: '#56ab91' }}>(Tú)</span>
                                    )}
                                  </span>
                                  {comentario.timestamp && (
                                    <span style={{ fontSize: '0.55rem', color: '#9ca3af' }}>{comentario.timestamp}</span>
                                  )}
                                </div>
                                <p style={{ fontSize: '0.7rem', color: '#e5e7eb', marginTop: '0.2rem', textAlign: 'justify', lineHeight: '1.4' }}>
                                  {comentario.texto}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{ textAlign: 'center', padding: '1rem', color: '#9ca3af', fontSize: '0.75rem' }}>
                            No hay comentarios aún. ¡Sé el primero en comentar!
                          </div>
                        )}
                      </div>

                      <form onSubmit={handleModalComentario} style={{
                        border: '1px solid rgba(86, 171, 145, 0.4)',
                        borderRadius: '0.75rem',
                        padding: '0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        marginTop: '0.25rem',
                        width: '100%' 
                      }}>
                        <div style={{ width: '1.8rem', height: '1.8rem', flexShrink: 0 }}>
                          <Avatar
                            fotoPerfil={usuario?.fotoPerfil}
                            nombre={usuario?.nombre}
                            size="w-full h-full"
                            textSize="text-sm"
                            borderColor="border-transparent"
                          />
                        </div>
                        <input
                          ref={comentarioInputRef}
                          type="text"
                          placeholder={`Comentar como ${usuario?.nombre || 'Usuario'}...`}
                          style={{
                            background: 'transparent',
                            flex: 1,
                            outline: 'none',
                            fontSize: '0.75rem',
                            color: 'white',
                            border: 'none',
                            padding: '0.25rem 0', 
                            minWidth: 0, 
                            width: '100%'
                          }}
                          autoComplete="off"
                          onChange={(e) => {
                            comentarioValueRef.current = e.target.value;
                          }}
                        />
                        <button 
                          type="submit"
                          style={{ 
                            color: '#34d399', 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            fontSize: '1rem',
                            padding: '0.25rem 0.5rem',
                            transition: 'transform 0.2s',
                            flexShrink: 0 
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(3px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                        >
                          ➤
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Navbar />
        
        <div className="max-w-4xl mx-auto space-y-4">
          {publicaciones.map((pub) => (
            <PubliCard 
              key={pub.id} 
              publicacion={pub} 
              abrirModal={abrirModal}
              userLiked={likesStatus[pub.id] || false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coleccion;