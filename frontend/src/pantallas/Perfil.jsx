import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import Navbar from '../componentes/Layout/navbar';

const Perfil = () => {
  const { usuario, logout, isAuthenticated, loading: authLoading } = useAuth();
  const { setPantallaActual } = useNavigation();
  const [carruselIndex, setCarruselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartasUsuario, setCartasUsuario] = useState([]);
  const [loadingCartas, setLoadingCartas] = useState(true);
  const [fotoKey, setFotoKey] = useState(Date.now());

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      console.log('No autenticado, redirigiendo a login');
      setPantallaActual('auth');
    }
  }, [authLoading, isAuthenticated, setPantallaActual]);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  useEffect(() => {
    if (usuario?.fotoPerfil) {
      setFotoKey(Date.now());
    }
  }, [usuario?.fotoPerfil]);

  const getInitiales = () => {
    if (!usuario?.nombre) return '??';
    return usuario.nombre
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const fetchCartasUsuario = async () => {
      try {
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
    setPantallaActual('auth');
  };

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-white">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 overflow-x-hidden">
      <Navbar />
      <div className="border-2 border-[#56ab91] rounded-[30px] p-8 mb-8 relative bg-slate-900/50">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-40 h-40 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex-shrink-0 shadow-xl border-4 border-[#2d2a3e] flex items-center justify-center overflow-hidden">
            {usuario.fotoPerfil ? (
              <img
                key={fotoKey}
                src={`http://localhost:3000${usuario.fotoPerfil}?t=${fotoKey}`}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Error cargando imagen:', `http://localhost:3000${usuario.fotoPerfil}`);
                  e.target.style.display = 'none';
                  if (e.target.parentElement) {
                    e.target.parentElement.innerHTML = `<span class="text-6xl font-bold text-white">${getInitiales()}</span>`;
                  }
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
                onClick={() => setPantallaActual('editarPerfil')}
                className="bg-[#2d2a3e] px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-all"
              >
                Editar perfil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel - resto del código igual */}
      {!loadingCartas && cartasMostrar.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-emerald-400">Mi Colección</h2>
            <p className="text-sm text-gray-400">{cartasMostrar.length} / {cartasUsuario.length} cartas</p>
          </div>

          <div className="relative min-h-[500px] flex items-center justify-center">
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
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white font-bold text-lg mb-1">{carta.nombre}</p>
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
        </div>
      )}
    </div>
  );
};

export default Perfil;