import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '../../../context/NavigationContext';
import axios from 'axios';
import style from '../../App.css'
import '../../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../Toggle/ThemeOptions';

const Navbar = () => {
  const { usuario } = useAuth();
  const { setPantallaActual, setUsuarioPublico } = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fotoKey, setFotoKey] = useState(Date.now());
  const searchRef = useRef(null);
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

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
    if (usuario?.fotoPerfil) {
      setFotoKey(Date.now());
    }
  }, [usuario?.fotoPerfil]);

  const buscarUsuarios = async (query) => {
    if (query.trim().length < 1) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/usuarios/buscar?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Error buscando usuarios:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        buscarUsuarios(searchTerm);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const verPerfilUsuario = (usuarioEncontrado) => {
    setShowResults(false);
    setSearchTerm('');
    setUsuarioPublico(usuarioEncontrado);
    setPantallaActual('perfilPublico');
  };

  return (
    <div className='App' id='App'>
      <nav className="header rounded-full p-3 mb-6 flex items-center justify-between shadow-lg">
        <div className="flex gap-4 ml-4">
          <button
            onClick={() => setPantallaActual('ventas')}
            className="hover:scale-110 transition-transform focus:outline-none"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </button>

          <button
            onClick={() => setPantallaActual('ventas')}
            className="w-10 h-10 button rounded-md flex items-center justify-center hover:bg-[--hover-button-color] transition-all group"
          >
            <img
              src="https://www.svgrepo.com/show/324791/store-business-marketplace-shop-sale-buy-marketing.svg"
              alt="Tienda"
              className="w-6 h-6 invert opacity-80 group-hover:opacity-100"
            />
          </button>

          <button
            onClick={() => setPantallaActual('coleccion')}
            className="w-10 h-10 button rounded-md flex items-center justify-center hover:bg-[--hover-button-color] transition-all group"
          >
            <img
              src="https://static.thenounproject.com/png/2221162-200.png"
              alt="Coleccion"
              className="w-6 h-6 invert opacity-80 group-hover:opacity-100"
            />
          </button>
        </div>

        <div className="flex-1 max-w-xl mx-8 relative" ref={searchRef}>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
              className="w-full search-bar rounded-full py-2 px-10 outline-none border-none text-white"
              placeholder="Buscar usuarios..."
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 search-result rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto border ">
              {searchResults.map((user) => (
                <button
                  key={user._id}
                  onClick={() => verPerfilUsuario(user)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-[--search-hover] transition-colors border-b border last:border-b-0"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border flex items-center justify-center">
                    {user.fotoPerfil ? (
                      <img
                        src={`http://localhost:3000${user.fotoPerfil}`}
                        alt={user.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="primary-text font-bold text-sm">
                        {user.nombre?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="primary-text font-semibold">{user.nombre}</p>
                    <p className="highlight text-sm">@{user.nickname}</p>
                  </div>
                  {user._id === usuario?._id && (
                    <span className="text-xs search-bar px-2 py-1 rounded-full">
                      Tú
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 mr-4">


          <div className="flex items-center gap-3 mr-4">
            <div className='theme-options'>
              <ThemeOption bg="#000000" theme="dark" />
              <ThemeOption bg="#ffffff" theme="light"/>
              <ThemeOption bg="#ca4646" theme="pokemon" />
              <ThemeOption bg="#46ca51" theme="digimon" />
              <ThemeOption bg="#c8ca46" theme="dragonball" />
            </div>

            {/* <Toggle
              isChecked={isDark}
              handleChange={() => setIsDark(!isDark)}
            /> */}
          </div>
          <span className="primary-text font-bold">
            {usuario?.nickname || usuario?.nombre || 'Usuario'}
          </span>
          <button
            onClick={() => setPantallaActual('perfil')}
            className="w-10 h-10 bg-white rounded-full border-2 border-pink-500 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all flex items-center justify-center"
          >
            {usuario?.fotoPerfil ? (
              <img
                key={fotoKey}
                src={`http://localhost:3000${usuario.fotoPerfil}?t=${fotoKey}`}
                alt="Perfil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Error cargando imagen navbar:', `http://localhost:3000${usuario.fotoPerfil}`);
                  e.target.style.display = 'none';
                  if (e.target.parentElement) {
                    e.target.parentElement.innerHTML = `<span class="text-[#2d2a3e] font-bold text-sm">${getInitiales()}</span>`;
                  }
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
    </div>

  );
};

export default Navbar;