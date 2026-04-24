import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import Navbar from '../componentes/Layout/navbar';
import '../App.css'
import '../pantallas/index.css'
import '../componentes/Cards/cartas_efecto.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../componentes/Toggle/ThemeOptions';
import CartaConEfecto from '../componentes/Cards/CartaConEfecto';

const Perfil = () => {
  const { usuario, logout, isAuthenticated, loading: authLoading } = useAuth();
  const { setPantallaActual } = useNavigation();
  const [carruselIndex, setCarruselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cartasUsuario, setCartasUsuario] = useState([]);
  const [loadingCartas, setLoadingCartas] = useState(true);
  const [fotoKey, setFotoKey] = useState(Date.now());
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

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

  const handleLogout = () => {
    logout();
    setPantallaActual('auth');
  };

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className='App' id='App'>
      <div className="min-h-screen text-white p-4 overflow-x-hidden">
        <Navbar />
        <div className="border-2 border rounded-[30px] p-8 mb-8 relative bg-slate-900/50">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-40 h-40 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex-shrink-0 shadow-xl border-4 border flex items-center justify-center overflow-hidden">
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
                      e.target.parentElement.innerHTML = `<span className="text-6xl font-bold text-white">${getInitiales()}</span>`;
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
              <h1 className="text-4xl text-white font-bold mb-2">{usuario.nombre}</h1>
              <p className="highlight mb-1">@{usuario.nickname}</p>
              <p className="mb-2">Miembro desde: {formatearFecha(usuario.createdAt)}</p>
              <p className="highlight mb-2 font-bold">Colección: {cartasUsuario.length} cartas</p>

              {usuario.bio ? (
                <p className="max-w-md italic">
                  {usuario.bio}
                </p>
              ) : (
                <p className="max-w-md italic">
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
                {/* Botón de Estadísticas */}
                <button
                  onClick={() => setPantallaActual('estadistica')}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 rounded-lg text-sm hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Ver Estadísticas
                </button>
              </div>
            </div>
          </div>
        </div>

        {!loadingCartas && cartasMostrar.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6 px-4">
              <h2 className="text-2xl font-bold highlight">Mi Colección</h2>
              <p className="text-sm highlight">{cartasMostrar.length} / {cartasUsuario.length} cartas</p>
            </div>

            <div className="relative min-h-[500px] flex items-center justify-center">
              <div className="relative w-full flex justify-center items-center" style={{ perspective: '1200px', overflow: 'visible' }}>
                <div className="relative flex justify-center items-center" style={{ height: '450px' }}>
                  {cartasMostrar.map((carta, idx) => {
                    const style = getCartaStyle(idx);
                    const isCenter = (idx - carruselIndex + totalCartas) % totalCartas === 0;
                    
                    // Función para navegar al hacer click en carta no central
                    const handleCardNavigation = () => {
                      const diff = (idx - carruselIndex + totalCartas) % totalCartas;
                      if (diff <= totalCartas / 2) {
                        for (let i = 0; i < diff; i++) siguienteCarrusel();
                      } else {
                        for (let i = 0; i < totalCartas - diff; i++) anteriorCarrusel();
                      }
                    };

                    return (
                      <div
                        key={carta.id}
                        className="absolute transition-all duration-500"
                        style={style}
                      >
                        <CartaConEfecto 
                          carta={carta}
                          isCenter={isCenter}
                          onClick={handleCardNavigation}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {totalCartas > 0 && (
                <>
                  <button
                    onClick={anteriorCarrusel}
                    className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border hover:bg-emerald-600 transition-all z-30 hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={siguienteCarrusel}
                    className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border hover:bg-emerald-600 transition-all z-30 hover:scale-110"
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
    </div>
  );
};

export default Perfil;