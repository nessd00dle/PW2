import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '../../context/NavigationContext';
import Navbar from '../componentes/Layout/navbar';

const PerfilPublico = () => {
  const { usuarioPublico, setPantallaActual, goBack, setUsuarioPublico } = useNavigation(); 
  const [usuario, setUsuario] = useState(usuarioPublico);
  const [cartasUsuario, setCartasUsuario] = useState([]);
  const [loadingCartas, setLoadingCartas] = useState(true);
  const [carruselIndex, setCarruselIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (usuarioPublico) {
      setUsuario(usuarioPublico);
      setLoadingCartas(true); 
    }
  }, [usuarioPublico]);

  
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

 
  useEffect(() => {
    const fetchColeccion = async () => {
      try {
        console.log('Fetching colección para usuario:', usuario._id);
        const response = await axios.get(`http://localhost:3000/api/usuarios/publico/${usuario._id}/coleccion`);
        setCartasUsuario(response.data);
        setLoadingCartas(false);
      } catch (error) {
        console.error('Error obteniendo colección:', error);
        setLoadingCartas(false);
      }
    };

    if (usuario && usuario._id) {
      fetchColeccion();
    }
  }, [usuario]);

  
  useEffect(() => {
    setCarruselIndex(0);
    setIsAnimating(false);
  }, [usuario]);

  // Si no hay usuario, volver
  useEffect(() => {
    if (!usuario) {
      goBack();
    }
  }, [usuario, goBack]);

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

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-white">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-windows p-4 overflow-x-hidden">
      <Navbar />
      
  
      <div className="mb-4">
        <button
          onClick={goBack}
          className="bg-[#2d2a3e] px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-all flex items-center gap-2"
        >
          Volver
        </button>
      </div>


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
            {usuario.bio && (
              <p className="text-gray-300 max-w-md italic">
                {usuario.bio}
              </p>
            )}
          </div>
        </div>
      </div>

     
      {!loadingCartas && cartasMostrar.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">
            Colección de {usuario.nombre}
          </h2>
          
          <div className="relative min-h-[500px] flex items-center justify-center perspective-container">
            <div className="relative w-full flex justify-center items-center" style={{ perspective: '1200px' }}>
              <div className="relative flex justify-center items-center" style={{ height: '450px' }}>
                {cartasMostrar.map((carta, idx) => {
                  const style = getCartaStyle(idx);
                  const isCenter = (idx - carruselIndex + totalCartas) % totalCartas === 0;

                  return (
                    <div
                      key={carta.id}
                      className="absolute cursor-pointer transition-all duration-500"
                      style={style}
                    >
                      <div className={`relative w-[220px] h-[320px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
                        isCenter 
                          ? 'shadow-[0_0_30px_rgba(86,171,145,0.5)] ring-2 ring-emerald-400' 
                          : 'shadow-lg hover:shadow-xl'
                      }`}>
                        <img
                          src={carta.imagen}
                          alt={carta.nombre}
                          className="w-full h-full object-cover"
                        />
                        
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
                          isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white font-bold text-lg mb-1">{carta.nombre}</p>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              carta.rareza === 'Legendaria' ? 'bg-yellow-500 text-black' :
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

      {!loadingCartas && cartasMostrar.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Este usuario aún no tiene cartas en su colección</p>
        </div>
      )}

      <style jsx>{`
        .perspective-container {
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
};

export default PerfilPublico;