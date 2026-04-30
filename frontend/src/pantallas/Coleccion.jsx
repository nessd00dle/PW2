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
      if (savedLikes) setLikesStatus(JSON.parse(savedLikes));
    }
  }, [usuario]);

  const abrirModal = (publicacion, indiceImagen) => {
    setPublicacionActual(publicacion);
    setImagenesPublicacion(publicacion.imagenes);
    setImagenActual(indiceImagen);
    setModalLiked(likesStatus[publicacion.id] || false);
    setModalLikesCount(publicacion.likes);
    setModalComentarios(publicacion.comentarios);
    setModalAbierto(true);
    comentarioValueRef.current = '';
    if (comentarioInputRef.current) comentarioInputRef.current.value = '';
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPublicacionActual(null);
    setImagenesPublicacion([]);
    setImagenActual(0);
    setModalLiked(false);
    setModalComentarios([]);
  };

  const imagenSiguiente = () => setImagenActual((prev) => (prev + 1) % imagenesPublicacion.length);
  const imagenAnterior = () => setImagenActual((prev) => (prev - 1 + imagenesPublicacion.length) % imagenesPublicacion.length);

  const handleModalLike = () => {
    if (!publicacionActual) return;
    const newLikedStatus = !modalLiked;
    const newLikesCount = newLikedStatus ? modalLikesCount + 1 : modalLikesCount - 1;
    setModalLiked(newLikedStatus);
    setModalLikesCount(newLikesCount);
    const newLikesStatus = { ...likesStatus, [publicacionActual.id]: newLikedStatus };
    setLikesStatus(newLikesStatus);
    if (usuario && usuario.id) localStorage.setItem(`likes_${usuario.id}`, JSON.stringify(newLikesStatus));
  };

  const handleModalComentario = (e) => {
    e.preventDefault();
    const texto = comentarioValueRef.current;
    if (texto.trim() && usuario) {
      setModalComentarios([...modalComentarios, {
        id: Date.now(),
        usuario: usuario.nombre || usuario.correo?.split('@')[0] || "Usuario",
        usuarioId: usuario.id,
        texto,
        avatar: usuario.fotoPerfil,
        timestamp: "Ahora mismo"
      }]);
      comentarioValueRef.current = '';
      if (comentarioInputRef.current) comentarioInputRef.current.value = '';
    }
  };

  return (      
    <div className='App' id='App'>
      <div className="min-h-screen primary-text font-sans p-4">

        {/* ===== MODAL ===== */}
        {modalAbierto && publicacionActual && (
          <>
            <style>{`
              .modal-overlay {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.55);
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                z-index: 999999;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding: 3rem 1rem 2rem;
                box-sizing: border-box;
              }

              /* Contenedor interno: centrado, ancho máximo */
              .modal-inner {
                position: relative;
                width: 100%;
                max-width: 900px;
              }

              /* Botón cerrar */
              .modal-close-btn {
                position: fixed;
                top: 0.75rem;
                right: 0.75rem;
                width: 2.25rem;
                height: 2.25rem;
                background: #dc2626;
                border-radius: 9999px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                border: 2px solid white;
                cursor: pointer;
                z-index: 1000000;
                transition: transform 0.2s;
              }
              .modal-close-btn:hover { transform: scale(1.1); }

              /* Grid: 1 col en móvil → 2 cols en desktop */
              .modal-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1rem;
              }
              @media (min-width: 768px) {
                .modal-grid {
                  grid-template-columns: 1fr 1fr;
                  align-items: start;
                }
              }

              /* Paneles con tema */
              .modal-panel {
                border: 1.5px solid var(--border-color);
                border-radius: 1rem;
                background: var(--background-slate);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
              }

              /* Botones navegación imagen */
              .modal-nav-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 2.25rem;
                height: 2.25rem;
                background: var(--button-color);
                border-radius: 9999px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid var(--border-color);
                cursor: pointer;
                z-index: 10;
                transition: background 0.2s;
                color: var(--primary-text-color);
                font-size: 1.4rem;
              }
              .modal-nav-btn:hover { background: var(--hover-button-color); }

              /* Like */
              .modal-like-btn {
                font-size: 1.6rem;
                background: none;
                border: none;
                cursor: pointer;
                transition: transform 0.2s;
                padding: 0.2rem;
                line-height: 1;
                flex-shrink: 0;
              }
              .modal-like-btn:hover { transform: scale(1.15); }

              /* Enviar comentario */
              .modal-send-btn {
                color: var(--hightlight-text-color);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1rem;
                padding: 0.2rem 0.4rem;
                transition: transform 0.2s;
                flex-shrink: 0;
              }
              .modal-send-btn:hover { transform: translateX(3px); }

              /* Input comentario */
              .modal-comment-input {
                background: transparent;
                flex: 1;
                outline: none;
                font-size: 0.75rem;
                color: var(--primary-text-color);
                border: none;
                padding: 0.2rem 0;
                min-width: 0;
              }
              .modal-comment-input::placeholder { color: var(--secondary-text-color); }

              /* Scrollbar comentarios */
              .modal-scroll::-webkit-scrollbar { width: 4px; }
              .modal-scroll::-webkit-scrollbar-track { background: var(--background-slate); border-radius: 10px; }
              .modal-scroll::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
              .modal-scroll::-webkit-scrollbar-thumb:hover { background: var(--hightlight-text-color); }

              /* Divisor */
              .modal-divider {
                height: 1px;
                background: var(--border-color);
                opacity: 0.35;
                margin: 0.6rem 0 0.5rem;
              }
            `}</style>

            <div className="modal-overlay" onClick={cerrarModal}>
              <div className="modal-inner" onClick={(e) => e.stopPropagation()}>

                {/* Botón cerrar */}
                <button onClick={cerrarModal} className="modal-close-btn">
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>✕</span>
                </button>

                <div className="modal-grid">

                  {/* ===== PANEL IMAGEN ===== */}
                  <div className="modal-panel" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: '1rem',
                    minHeight: '280px'
                  }}>
                    {imagenesPublicacion.length > 1 && (
                      <>
                        <button className="modal-nav-btn" onClick={imagenAnterior} style={{ left: '0.5rem' }}>‹</button>
                        <button className="modal-nav-btn" onClick={imagenSiguiente} style={{ right: '0.5rem' }}>›</button>
                      </>
                    )}

                    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={imagenesPublicacion[imagenActual]}
                        alt={`Imagen ${imagenActual + 1}`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '60vh',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          borderRadius: '0.75rem',
                          display: 'block'
                        }}
                      />
                      {imagenesPublicacion.length > 1 && (
                        <div style={{
                          position: 'absolute',
                          bottom: '0.5rem',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--button-color)',
                          border: '1px solid var(--border-color)',
                          padding: '0.15rem 0.6rem',
                          borderRadius: '9999px',
                          fontSize: '0.7rem',
                          color: 'var(--primary-text-color)'
                        }}>
                          {imagenActual + 1} / {imagenesPublicacion.length}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ===== PANEL DERECHO ===== */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Info publicación */}
                    <div className="modal-panel" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <h2 style={{
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          color: 'var(--primary-text-color)',
                          margin: 0,
                          flex: 1,
                          paddingRight: '0.5rem'
                        }}>
                          {publicacionActual.titulo}
                        </h2>
                        <button
                          onClick={handleModalLike}
                          className="modal-like-btn"
                          style={{ color: modalLiked ? '#ec4899' : 'var(--secondary-text-color)' }}
                        >
                          {modalLiked ? '❤️' : '🤍'}
                        </button>
                      </div>

                      <p style={{ fontSize: '0.78rem', color: 'var(--paragraph-color)', margin: '0.25rem 0' }}>
                        <span style={{ color: 'var(--hightlight-text-color)', fontWeight: 'bold' }}>Usuario:</span> {publicacionActual.usuario}
                      </p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--paragraph-color)', margin: '0.25rem 0' }}>
                        <span style={{ color: 'var(--hightlight-text-color)', fontWeight: 'bold' }}>Fandom:</span> {publicacionActual.franquicia}
                      </p>

                      <div className="modal-divider" />

                      <p style={{
                        fontWeight: 'bold',
                        color: 'var(--hightlight-text-color)',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        margin: '0 0 0.25rem'
                      }}>
                        Descripción:
                      </p>
                      <p style={{
                        color: 'var(--paragraph-color)',
                        fontSize: '0.78rem',
                        lineHeight: '1.5',
                        textAlign: 'justify',
                        margin: 0
                      }}>
                        {publicacionActual.descripcion}
                      </p>

                      <div style={{ marginTop: '0.6rem' }}>
                        <p style={{ fontSize: '0.65rem', color: 'var(--secondary-text-color)', margin: '0.2rem 0' }}>
                          Publicado: {publicacionActual.timestamp}
                        </p>
                        <p style={{ fontSize: '0.65rem', color: 'var(--secondary-text-color)', margin: '0.2rem 0' }}>
                          {modalLiked ? '❤️' : '🤍'} {modalLikesCount} Me gusta
                        </p>
                      </div>
                    </div>

                    {/* Comentarios */}
                    <div className="modal-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <h3 style={{
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--hightlight-text-color)',
                        margin: 0
                      }}>
                        Comentarios ({modalComentarios.length})
                      </h3>

                      <div className="modal-scroll" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.6rem',
                        maxHeight: '220px',
                        overflowY: 'auto',
                        paddingRight: '0.25rem'
                      }}>
                        {modalComentarios.length > 0 ? (
                          modalComentarios.map((comentario, idx) => (
                            <div key={comentario.id || idx} style={{
                              backgroundColor: comentario.usuarioId === usuario?.id
                                ? 'var(--hover-button-color)'
                                : 'var(--button-color)',
                              padding: '0.5rem',
                              borderRadius: '0.65rem',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              border: '1px solid var(--border-color)'
                            }}>
                              <div style={{ width: '1.6rem', height: '1.6rem', flexShrink: 0 }}>
                                <Avatar
                                  fotoPerfil={comentario.avatar}
                                  nombre={comentario.usuario}
                                  size="w-full h-full"
                                  textSize="text-xs"
                                  borderColor="border-transparent"
                                />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
                                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--hightlight-text-color)' }}>
                                    {comentario.usuario}
                                    {comentario.usuarioId === usuario?.id && (
                                      <span style={{ fontSize: '0.6rem', marginLeft: '0.4rem', color: 'var(--border-color)' }}>(Tú)</span>
                                    )}
                                  </span>
                                  {comentario.timestamp && (
                                    <span style={{ fontSize: '0.55rem', color: 'var(--secondary-text-color)' }}>
                                      {comentario.timestamp}
                                    </span>
                                  )}
                                </div>
                                <p style={{
                                  fontSize: '0.7rem',
                                  color: 'var(--primary-text-color)',
                                  marginTop: '0.15rem',
                                  lineHeight: '1.4',
                                  wordBreak: 'break-word',
                                  margin: '0.15rem 0 0'
                                }}>
                                  {comentario.texto}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={{
                            textAlign: 'center',
                            padding: '0.75rem',
                            color: 'var(--secondary-text-color)',
                            fontSize: '0.75rem'
                          }}>
                            No hay comentarios aún. ¡Sé el primero!
                          </div>
                        )}
                      </div>

                      {/* Input comentario */}
                      <form onSubmit={handleModalComentario} style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.65rem',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--button-color)'
                      }}>
                        <div style={{ width: '1.6rem', height: '1.6rem', flexShrink: 0 }}>
                          <Avatar
                            fotoPerfil={usuario?.fotoPerfil}
                            nombre={usuario?.nombre}
                            size="w-full h-full"
                            textSize="text-xs"
                            borderColor="border-transparent"
                          />
                        </div>
                        <input
                          ref={comentarioInputRef}
                          type="text"
                          placeholder={`Comentar como ${usuario?.nombre || 'Usuario'}...`}
                          className="modal-comment-input"
                          autoComplete="off"
                          onChange={(e) => { comentarioValueRef.current = e.target.value; }}
                        />
                        <button type="submit" className="modal-send-btn">➤</button>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* ===== FIN MODAL ===== */}

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