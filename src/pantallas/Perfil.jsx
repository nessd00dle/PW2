import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../componentes/Layout/navbar';
import axios from 'axios';

const Perfil = ({ setPantalla }) => {
  const { usuario, logout, isAuthenticated, loading: authLoading } = useAuth();
  const [carruselIndex, setCarruselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartasUsuario, setCartasUsuario] = useState([]);
  const [loadingCartas, setLoadingCartas] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      console.log('No autenticado, redirigiendo a login');
      setPantalla('auth');
    }
  }, [authLoading, isAuthenticated, setPantalla]);
  useEffect(() => {
    if (!usuario && !authLoading) {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        console.log('Usuario encontrado en localStorage');
        
      }
    }
  }, [usuario, authLoading]);

  // Formatear fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Obtener iniciales del nombre
  const getInitiales = () => {
    if (!usuario?.nombre) return '??';
    return usuario.nombre
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Obtener cartas del usuario 
  useEffect(() => {
    const fetchCartasUsuario = async () => {
      try {
        // Aquí iría la llamada de la api para obtener las cartas del usuario
        // const response = await axios.get(`http://localhost:3000/api/usuarios/${usuario.id}/cartas`);
        // setCartasUsuario(response.data);

        // Datos de ejemplo mientras tanto
        const cartasEjemplo = [
          { id: 1, nombre: "Pikachu", imagen: "https://i.pinimg.com/736x/e7/02/c6/e702c62be77870ff68d2decd19cbd137.jpg", rareza: "Común" },
          { id: 2, nombre: "Charizard", imagen: "https://i.pinimg.com/736x/46/7d/27/467d27d51e4a84775142a54a7534ac89.jpg", rareza: "Rara" },
          { id: 3, nombre: "Mewtwo", imagen: "https://i.pinimg.com/736x/20/09/f5/2009f50fa35d86a8e34e2ea37f2db7be.jpg", rareza: "Épica" },
          { id: 4, nombre: "Dragonite", imagen: "https://i.pinimg.com/736x/81/a0/d3/81a0d302b2800ae247b4833005fd894c.jpg", rareza: "Rara" },
        ];
        setCartasUsuario(cartasEjemplo);
        setLoadingCartas(false);
      } catch (error) {
        console.error('Error obteniendo cartas:', error);
        setLoadingCartas(false);
      }
    };

    fetchCartasUsuario();
  }, [usuario]);

  // Mostrar solo 10 cartas
  const cartasMostrar = cartasUsuario.slice(0, 10);
  const totalCartas = cartasMostrar.length;

  const siguienteCarrusel = () => {
    if (!isAnimating && totalCartas > 0) {
      setIsAnimating(true);
      setCarruselIndex((prev) => (prev + 1) % totalCartas);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const anteriorCarrusel = () => {
    if (!isAnimating && totalCartas > 0) {
      setIsAnimating(true);
      setCarruselIndex((prev) => (prev - 1 + totalCartas) % totalCartas);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const getCartaStyle = (index) => {
    let relativeIndex = (index - carruselIndex + totalCartas) % totalCartas;

    if (relativeIndex > totalCartas / 2) {
      relativeIndex = relativeIndex - totalCartas;
    }

    const position = relativeIndex;
    const absolutePosition = Math.abs(position);

    const scale = position === 0 ? 1.2 : 1 - (absolutePosition * 0.15);
    const opacity = position === 0 ? 1 : Math.max(0.4, 1 - (absolutePosition * 0.3));
    const zIndex = position === 0 ? 20 : 10 - absolutePosition;
    const translateX = position * 220;
    const rotateY = position * -25;
    const blur = position === 0 ? 0 : absolutePosition * 2;

    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      filter: `blur(${blur}px)`,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  const handleCartaClick = (carta, index) => {
    const relativeIndex = (index - carruselIndex + totalCartas) % totalCartas;
    if (relativeIndex === 0) {
      console.log('Carta seleccionada:', carta);
    } else {
      const diff = (index - carruselIndex + totalCartas) % totalCartas;
      if (diff <= totalCartas / 2) {
        for (let i = 0; i < diff; i++) siguienteCarrusel();
      } else {
        for (let i = 0; i < totalCartas - diff; i++) anteriorCarrusel();
      }
    }
  };

  const handleLogout = () => {
    logout();
    setPantalla('auth');
  };

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-white">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-windows p-4 overflow-x-hidden">
     <Navbar setPantalla={setPantalla} />
      {/* header perfil */}
      <div className="border-2 border-[#56ab91] rounded-[30px] p-8 mb-8 relative bg-slate-900/50">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-40 h-40 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex-shrink-0 shadow-xl border-4 border-[#2d2a3e] flex items-center justify-center overflow-hidden">
            {usuario.fotoPerfil ? (
              <img
                src={`http://localhost:3000${usuario.fotoPerfil}`}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150?text=Error';
                }}
              />
            ) : (
              <span className="text-6xl font-bold text-white">
                {getInitiales()}
              </span>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{usuario.nombre}</h1>
            <p className="text-emerald-400 mb-1">@{usuario.nickname}</p>
            <p className="text-gray-400 mb-2">Miembro desde: {formatearFecha(usuario.createdAt)}</p>
            <p className="text-emerald-400 mb-2 font-bold">Colección: {cartasUsuario.length} cartas</p>
           
            {usuario.bio ? (
                <p className="text-gray-300 max-w-md italic">
                    {usuario.bio}
                </p>
            ) : (
                <p className="text-gray-500 max-w-md italic">
                    Sin descripción aún. ¡Agrega una en editar perfil!
                </p>
            )}

            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-all"
              >
                Cerrar sesión
              </button>
              <button
                onClick={() => setPantalla('editarPerfil')}
                className="bg-[#2d2a3e] px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-all"
              >
                Editar perfil
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setPantalla('estadistica')}
              className="flex flex-col items-center group hover:scale-105 transition-transform"
            >
              <img
                src="/img/bar_icon_pink.png"
                alt="Estadísticas"
                className="w-12 h-12 opacity-80"
              />
              <span className="text-[10px] mt-1 text-pink-500 uppercase font-black italic">Estadísticas</span>
            </button>

          
          </div>
        </div>
      </div>

      {/* Carrusel */}
      {!loadingCartas && cartasMostrar.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-emerald-400">Mi Colección</h2>
            <p className="text-sm text-gray-400">{cartasMostrar.length} / {cartasUsuario.length} cartas</p>
          </div>

          <div className="relative min-h-[500px] flex items-center justify-center perspective-container">
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>

            <div className="relative w-full flex justify-center items-center" style={{ perspective: '1200px' }}>
              <div className="relative flex justify-center items-center" style={{ height: '450px' }}>
                {cartasMostrar.map((carta, idx) => {
                  const style = getCartaStyle(idx);
                  const isCenter = (idx - carruselIndex + totalCartas) % totalCartas === 0;

                  return (
                    <div
                      key={carta.id}
                      onClick={() => handleCartaClick(carta, idx)}
                      className="absolute cursor-pointer transition-all duration-500"
                      style={style}
                    >
                      <div className={`relative w-[220px] h-[320px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${isCenter
                        ? 'shadow-[0_0_30px_rgba(86,171,145,0.5)] ring-2 ring-emerald-400'
                        : 'shadow-lg hover:shadow-xl'
                        }`}>
                        <img
                          src={carta.imagen}
                          alt={carta.nombre}
                          className="w-full h-full object-cover"
                        />

                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}>
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 transition-transform">
                            <p className="text-white font-bold text-lg mb-1">{carta.nombre}</p>
                            <div className="flex justify-between items-center">
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${carta.rareza === 'Legendaria' ? 'bg-yellow-500 text-black' :
                                carta.rareza === 'Épica' ? 'bg-purple-500 text-white' :
                                  carta.rareza === 'Rara' ? 'bg-blue-500 text-white' :
                                    'bg-gray-500 text-white'
                                }`}>
                                {carta.rareza}
                              </span>
                            </div>
                          </div>
                        </div>

                        {isCenter && (
                          <div className="absolute top-2 right-2 bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-pulse">
                            <span className="text-white text-xs font-bold">★</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {totalCartas > 0 && (
              <>
                <button
                  onClick={anteriorCarrusel}
                  className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-emerald-400 hover:bg-emerald-600 transition-all z-30 hover:scale-110"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={siguienteCarrusel}
                  className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-emerald-400 hover:bg-emerald-600 transition-all z-30 hover:scale-110"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Indicadores de página */}
          {totalCartas > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {cartasMostrar.map((_, idx) => {
                const isActive = idx === carruselIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const diff = (idx - carruselIndex + totalCartas) % totalCartas;
                      if (diff <= totalCartas / 2) {
                        for (let i = 0; i < diff; i++) siguienteCarrusel();
                      } else {
                        for (let i = 0; i < totalCartas - diff; i++) anteriorCarrusel();
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${isActive
                      ? 'bg-emerald-400 w-8'
                      : 'bg-emerald-400/30 w-2 hover:bg-emerald-400/50'
                      }`}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {!loadingCartas && cartasMostrar.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Aún no tienes cartas en tu colección</p>
          <button
            onClick={() => setPantalla('ventas')}
            className="mt-4 bg-emerald-600 px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Explorar tienda
          </button>
        </div>
      )}

      {loadingCartas && (
        <div className="text-center py-12">
          <p className="text-gray-400">Cargando tu colección...</p>
        </div>
      )}

      {/* botones derecha inferior */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button
          onClick={() => setPantalla('publicar')}
          className="bg-[#2d2a3e] p-3 rounded-full shadow-lg border-2 border-[#56ab91] hover:bg-emerald-800 transition-all flex items-center justify-center w-14 h-14 group"
        >
          <img
            src="https://www.freeiconspng.com/thumbs/plus-icon/plus-icon-black-2.png"
            alt="Agregar"
            className="w-6 h-6 invert opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
          />
        </button>

        <button
          onClick={() => {
            setCarruselIndex(0);
          }}
          className="bg-[#2d2a3e] p-3 rounded-full shadow-lg border-2 border-[#56ab91] hover:bg-emerald-800 transition-all flex items-center justify-center w-14 h-14 group"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Refresh_icon.png"
            alt="Actualizar"
            className="w-6 h-6 invert opacity-80 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500"
          />
        </button>
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 1200px;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%);
        }
      `}</style>
    </div>
  );
};

export default Perfil;