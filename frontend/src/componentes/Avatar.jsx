import React, { useState, useEffect } from 'react';


const API_URL = 'https://pw2-production-ee50.up.railway.app';

const Avatar = ({ 
  fotoPerfil, 
  nombre, 
  size = "w-40 h-40", 
  textSize = "text-6xl",
  borderColor = "border-[#2d2a3e]"
}) => {
  const [fotoError, setFotoError] = useState(false);
  const [fotoUrl, setFotoUrl] = useState(null);

  useEffect(() => {
    if (!fotoPerfil) {
      setFotoUrl(null);
      return;
    }

    // Si ya es una URL completa (http o https) - para desarrollo local
    if (fotoPerfil.startsWith('http://') || fotoPerfil.startsWith('https://')) {
      setFotoUrl(fotoPerfil);
      return;
    }
    
    // Si es ruta relativa, construir URL completa con API_URL
    if (fotoPerfil.startsWith('/uploads')) {
      setFotoUrl(`${API_URL}${fotoPerfil}`);
      return;
    }
    
    // Si es solo el nombre del archivo
    if (!fotoPerfil.startsWith('/')) {
      setFotoUrl(`${API_URL}/uploads/perfiles/${fotoPerfil}`);
      return;
    }
    
    setFotoUrl(null);
  }, [fotoPerfil]);

  const getInitiales = () => {
    if (!nombre) return '??';
    return nombre
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Si no hay foto o hubo error, mostrar iniciales
  if (!fotoPerfil || fotoError || !fotoUrl) {
    return (
      <div className={`${size} bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl border-4 ${borderColor}`}>
        <span className={`${textSize} font-bold text-white`}>
          {getInitiales()}
        </span>
      </div>
    );
  }

  return (
    <div className={`${size} rounded-full overflow-hidden shadow-xl border-4 ${borderColor}`}>
      <img
        src={fotoUrl}
        alt={`Foto de ${nombre}`}
        className="w-full h-full object-cover"
        onError={() => {
          console.warn('Error cargando avatar:', fotoUrl);
          setFotoError(true);
        }}
      />
    </div>
  );
};

export default Avatar;