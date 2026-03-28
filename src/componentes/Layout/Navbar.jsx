import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const Navbar = ({ setPantalla }) => {
  const { usuario } = useAuth();

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

  return (
    <nav className="bg-[#56ab91] rounded-full p-3 mb-6 flex items-center justify-between shadow-lg">
      {/* Logo y botones de navegación izquierda */}
      <div className="flex gap-4 ml-4">
        <button
          onClick={() => setPantalla('ventas')}
          className="hover:scale-110 transition-transform focus:outline-none"
        >
          <img
            src="/logo.png"
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

      {/* Buscador */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-[#3d7a67] rounded-full py-2 px-10 outline-none border-none placeholder-emerald-200 text-white"
            placeholder="Buscar cartas..."
          />
        </div>
      </div>

      {/* Información del usuario */}
      <div className="flex items-center gap-3 mr-4">
        <span className="text-[#1a202c] font-bold">
          {usuario?.nickname || usuario?.nombre || 'Usuario'}
        </span>
        <button
          onClick={() => setPantalla('perfil')}
          className="w-10 h-10 bg-white rounded-full border-2 border-pink-500 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all flex items-center justify-center"
        >
          {usuario?.fotoPerfil ? (
            <img
              src={`http://localhost:3000${usuario.fotoPerfil}`}
              alt="Perfil"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=Error';
              }}
            />
          ) : (
            <span className="text-[#2d2a3e] font-bold text-sm">
              {getInitiales()}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;