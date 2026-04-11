import React, { useState, useEffect } from 'react';
import '../App.css'
import './index.css'
import { Toggle } from '../componentes/Toggle/toggle';
import useLocalStorage from 'use-local-storage';

const Perfil = ({ setPantalla }) => {
  // Datos de ejemplo para las cartas del usuario
  const [carruselIndex, setCarruselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  const cartasUsuario = [
    { id: 1, nombre: "Pikachu", imagen: "https://i.pinimg.com/736x/e7/02/c6/e702c62be77870ff68d2decd19cbd137.jpg", rareza: "Común" },
    { id: 2, nombre: "Charizard", imagen: "https://i.pinimg.com/736x/46/7d/27/467d27d51e4a84775142a54a7534ac89.jpg", rareza: "Rara" },
    { id: 3, nombre: "Mewtwo", imagen: "https://i.pinimg.com/736x/20/09/f5/2009f50fa35d86a8e34e2ea37f2db7be.jpg", rareza: "Épica" },
    { id: 4, nombre: "Dragonite", imagen: "https://i.pinimg.com/736x/81/a0/d3/81a0d302b2800ae247b4833005fd894c.jpg", rareza: "Rara" },
    { id: 5, nombre: "Gengar", imagen: "https://i.pinimg.com/736x/e3/37/d0/e337d055ca6e842896bb8f9fe2946fe4.jpg", rareza: "Épica" },
    { id: 6, nombre: "Rayquaza", imagen: "https://i.pinimg.com/736x/69/52/da/6952da935f56233c9d64cc84d7aa92bc.jpg", rareza: "Legendaria" },
    { id: 7, nombre: "Lucario", imagen: "https://i.pinimg.com/736x/13/d5/d4/13d5d4ad07886477d12d80260678f63c.jpg", rareza: "Rara" },
    { id: 8, nombre: "Greninja", imagen: "https://i.pinimg.com/736x/08/c0/57/08c0575c74cc24351e72ec3e25e5ca53.jpg", rareza: "Épica" },
    { id: 9, nombre: "Eevee", imagen: "https://i.pinimg.com/736x/b5/ef/f2/b5eff2853e29d5e4a7bcce6f9bc3152c.jpg", rareza: "Común" },
    { id: 10, nombre: "Arceus", imagen: "https://i.pinimg.com/736x/42/68/28/4268280760490a1566c7089d75d6c022.jpg", rareza: "Legendaria" },
  ];

  // Mostrar solo 10 cartas
  const cartasMostrar = cartasUsuario.slice(0, 10);
  const totalCartas = cartasMostrar.length;

  const siguienteCarrusel = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCarruselIndex((prev) => (prev + 1) % totalCartas);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const anteriorCarrusel = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCarruselIndex((prev) => (prev - 1 + totalCartas) % totalCartas);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Calcular la posición y estilo de cada carta en el carrusel 3D
  const getCartaStyle = (index) => {
    let relativeIndex = (index - carruselIndex + totalCartas) % totalCartas;


    if (relativeIndex > totalCartas / 2) {
      relativeIndex = relativeIndex - totalCartas;
    }

    // Calcular posición en el carrusel (desde -2 a 2)
    const position = relativeIndex;
    const absolutePosition = Math.abs(position);

    // Escala basada en la distancia al centro
    const scale = position === 0 ? 1.2 : 1 - (absolutePosition * 0.15);
    const opacity = position === 0 ? 1 : Math.max(0.4, 1 - (absolutePosition * 0.3));
    const zIndex = position === 0 ? 20 : 10 - absolutePosition;


    const translateX = position * 220;

    // Rotación 3D
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
      // Si es la carta central
      console.log('Carta seleccionada:', carta);
      // Aquí no se si hay que poner el detalle
    } else {
      // Si no es la central, mover el carrusel para centrarla
      const diff = (index - carruselIndex + totalCartas) % totalCartas;
      if (diff <= totalCartas / 2) {
        for (let i = 0; i < diff; i++) siguienteCarrusel();
      } else {
        for (let i = 0; i < totalCartas - diff; i++) anteriorCarrusel();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-windows p-4 overflow-x-hidden">
      <div className='App' data-theme={isDark ? "dark" : "light"}>
        {/* navbar */}
        <nav className="bg-[#56ab91] rounded-full p-3 mb-6 flex items-center justify-between shadow-lg">
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
              className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group"
            >
              <img
                src="https://www.svgrepo.com/show/324791/store-business-marketplace-shop-sale-buy-marketing.svg"
                alt="Tienda"
                className="w-6 h-6 invert opacity-80 group-hover:opacity-100"
              />
            </button>

            <button
              onClick={() => setPantalla('coleccion')}
              className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group"
            >
              <img
                src="https://static.thenounproject.com/png/2221162-200.png"
                alt="Coleccion"
                className="w-6 h-6 invert opacity-80 group-hover:opacity-100"
              />
            </button>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-[#3d7a67] rounded-full py-2 px-10 outline-none border-none placeholder-emerald-200 text-white"
                placeholder="Buscar cartas..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mr-4">
            <Toggle
              isChecked={isDark}
              handleChange={() => setIsDark(!isDark)}
            />
            <span className="text-[#1a202c] font-bold">Usuario</span>
            <button
              onClick={() => setPantalla('perfil')}
              className="w-10 h-10 bg-white rounded-full border-2 border-pink-500 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all"
            >
              <img
                src="https://media.tenor.com/pgRHsHG3M2MAAAAe/gato-serio.png"
                alt="Perfil"
              />
            </button>
          </div>
        </nav>

        {/* header perfil */}
        <div className="border-2 border-[#56ab91] rounded-[30px] p-8 mb-8 relative bg-slate-900/50">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-40 h-40 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex-shrink-0 shadow-xl border-4 border-[#2d2a3e] flex items-center justify-center">
              <span className="text-6xl">⭐</span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Nombre de usuario :p</h1>
              <p className="text-gray-400 mb-2">Fecha de registro: 04/02/26</p>
              <p className="text-emerald-400 mb-2">Colección: {cartasMostrar.length} cartas</p>
              <p className="text-gray-300 max-w-md italic">Coleccionista apasionado de cartas, siempre buscando nuevas adquisiciones para mi colección.</p>

              <div className="mt-6 flex gap-4 justify-center md:justify-start">
                <button
                  onClick={() => setPantalla('auth')}
                  className="bg-[#2d2a3e] px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-all text-red-400"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setPantalla('estadistica')}
                className="flex flex-col items-center group hover:scale-105 transition-transform"
              >
                <img
                  src="img/bar_icon_pink.png"
                  alt="Estadísticas"
                  className="w-12 h-12 opacity-80"
                />
                <span className="text-[10px] mt-1 text-pink-500 uppercase font-black italic">Estadísticas</span>
              </button>

              <button
                onClick={() => setPantalla('configuracion')}
                className="flex flex-col items-center group hover:scale-105 transition-transform"
              >
                <img
                  src="img/config_icon.png"
                  alt="config"
                  className="w-12 h-12 opacity-80"
                />
                <span className="text-[10px] mt-1 text-pink-500 uppercase font-black italic">Configuración</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carrusel 3D estilo coverflow */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-emerald-400">Mi Colección 3D</h2>
            <p className="text-sm text-gray-400">{cartasMostrar.length} / 10 cartas</p>
          </div>

          <div className="relative min-h-[500px] flex items-center justify-center perspective-container">
            {/* Efecto de luz de fondo */}
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Contenedor del carrusel 3D */}
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

                        {/* Overlay con información */}
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
                              <span className="text-emerald-400 font-bold text-sm">{carta.precio}</span>
                            </div>
                          </div>
                        </div>

                        {/* Indicador de carta central */}
                        {isCenter && (
                          <div className="absolute top-2 right-2 bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-pulse">
                            <span className="text-white text-xs font-bold">★</span>
                          </div>
                        )}
                      </div>

                      {/* Nombre de la carta (visible solo para la central en móvil) */}
                      {isCenter && (
                        <p className="text-center text-emerald-400 font-bold mt-3 md:hidden">
                          {carta.nombre}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botones de navegación estilizados */}
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
          </div>

          {/* Indicadores de página */}
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

          {/* Información de la carta central */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              carta y cartota
            </p>
          </div>
        </div>

        {/* mensaje si no hay cartas */}
        {cartasMostrar.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Aún no tienes cartas en tu colección</p>
            <button
              onClick={() => setPantalla('publicar')}
              className="mt-4 bg-emerald-600 px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Agregar mi primera carta
            </button>
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

        {/* Estilos adicionales */}
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
    </div>
  );
};

export default Perfil;