import React, { useState } from 'react';
import '../../App.css';
import '../../pantallas/index.css';

const Gallery = ({ isOpen, onClose, onSelectCartas }) => {
  const [selectedCartas, setSelectedCartas] = useState([]);
  const [franquicia, setFranquicia] = useState('all');
  const [busqueda, setBusqueda] = useState('');

  const cartas = [
    // POKEMON
    { id: 1, nombre: 'Raichu', franquicia: 'pokemon', imagen: '/imagesPokemon/raichu.PNG' },
    { id: 2, nombre: 'Pikachu ex', franquicia: 'pokemon', imagen: '/imagesPokemon/pikachu_ex.PNG' },
    { id: 3, nombre: 'Jolteon', franquicia: 'pokemon', imagen: '/imagesPokemon/jolteon.PNG' },
    { id: 4, nombre: 'Clefairy', franquicia: 'pokemon', imagen: '/imagesPokemon/clefairy.PNG' },
    { id: 5, nombre: 'Minccino', franquicia: 'pokemon', imagen: '/imagesPokemon/minccino.PNG' },
    { id: 6, nombre: 'Rapidash', franquicia: 'pokemon', imagen: '/imagesPokemon/rapidash.PNG' },
    { id: 7, nombre: 'Lapras', franquicia: 'pokemon', imagen: '/imagesPokemon/lapras.PNG' },
    { id: 8, nombre: 'Charizard ex', franquicia: 'pokemon', imagen: '/imagesPokemon/charizard_ex.PNG' },
    // MAGIC
    { id: 10, nombre: 'Caballero Templario', franquicia: 'magic', imagen: '/imagesMagic/caballero_templario.png' },
    { id: 11, nombre: 'Albondiga Siempre Leal', franquicia: 'magic', imagen: '/imagesMagic/albondiga_siempre_leal.png' },
    { id: 12, nombre: 'Herbivoro arboreo', franquicia: 'magic', imagen: '/imagesMagic/herbivoro_arboreo.png' },
    { id: 13, nombre: 'Astillas Oseas', franquicia: 'magic', imagen: '/imagesMagic/astillas_oseas.jpg' },
    { id: 14, nombre: 'Hurgar Cerebro', franquicia: 'magic', imagen: '/imagesMagic/hurgar_cerebro.png' },
    { id: 15, nombre: 'Contendiente Aclamada', franquicia: 'magic', imagen: '/imagesMagic/contendiente_aclamda.png' },
    { id: 16, nombre: 'Rastrero de la Cripta', franquicia: 'magic', imagen: '/imagesMagic/rastrero_de_la_cripta.jpg' },
    { id: 17, nombre: 'Suenos Desenfrenados', franquicia: 'magic', imagen: '/imagesMagic/suenos_desenfrenados.png' },
    // DRAGON BALL
    { id: 20, nombre: 'Exploradores', franquicia: 'dragonball', imagen: '/imagesDB/exploradores.jpg' },
    { id: 21, nombre: 'Sabemos quien ganara', franquicia: 'dragonball', imagen: '/imagesDB/sabemos_quien_ganara.jpg' },
    { id: 22, nombre: 'Big bang kame hame ha', franquicia: 'dragonball', imagen: '/imagesDB/big_bang_kame_hame_ha.jpg' },
    { id: 23, nombre: 'Detener Ataque', franquicia: 'dragonball', imagen: '/imagesDB/detener_ataque.jpg' },
    { id: 24, nombre: 'Humillando', franquicia: 'dragonball', imagen: '/imagesDB/humillando.jpg' },
    { id: 25, nombre: 'Big Bang', franquicia: 'dragonball', imagen: '/imagesDB/big_bang.jpg' },
    { id: 26, nombre: 'Quita aire', franquicia: 'dragonball', imagen: '/imagesDB/quita_aire.jpg' },
    { id: 27, nombre: 'Super Saiyan 2', franquicia: 'dragonball', imagen: '/imagesDB/super_saiyan2.png' },
    // YU-GI-OH
    { id: 28, nombre: 'Chica Maga Oscura', franquicia: 'yugioh', imagen: '/imagesYugioh/chica_maga_oscura.jpg' },
    { id: 29, nombre: 'D Contragolpe', franquicia: 'yugioh', imagen: '/imagesYugioh/d-contragolpe.jpg' },
    { id: 30, nombre: 'Ciber Dragon', franquicia: 'yugioh', imagen: '/imagesYugioh/ciber_dragon.jpg' },
    { id: 31, nombre: 'Coraza del Caos', franquicia: 'yugioh', imagen: '/imagesYugioh/coraza_del_caos.jpg' },
    { id: 32, nombre: 'Dragon Blanco de ojos Azules', franquicia: 'yugioh', imagen: '/imagesYugioh/dragon_blanco_de_ojos_azules.jpg' },
    { id: 33, nombre: 'El Dragon alado de Ra', franquicia: 'yugioh', imagen: '/imagesYugioh/el_dragon_alado_de_ra.jpg' },
    { id: 34, nombre: 'Gil Garth', franquicia: 'yugioh', imagen: '/imagesYugioh/gil_garth.png' },
    { id: 35, nombre: 'Buey de Batalla', franquicia: 'yugioh', imagen: '/imagesYugioh/buey_de_batalla.jpg' },
    // DIGIMON
    { id: 36, nombre: 'Patamon', franquicia: 'digimon', imagen: '/imagesDigimon/patamon.jpg' },
    { id: 37, nombre: 'AncientKazemon', franquicia: 'digimon', imagen: '/imagesDigimon/ancient_kazemon.jpg' },
    { id: 38, nombre: 'Yellow Scramble', franquicia: 'digimon', imagen: '/imagesDigimon/yellow_scramble.jpg' },
    { id: 39, nombre: 'BurningGreymon', franquicia: 'digimon', imagen: '/imagesDigimon/burningGreymon.png' },
    { id: 40, nombre: 'Pulsemon', franquicia: 'digimon', imagen: '/imagesDigimon/pulsemon.jpg' },
    { id: 41, nombre: 'Jijimon', franquicia: 'digimon', imagen: '/imagesDigimon/jijimon.png' },
    { id: 42, nombre: 'GoldVeedramon', franquicia: 'digimon', imagen: '/imagesDigimon/goldveedramon.jpg' },
    { id: 43, nombre: 'Elecmon', franquicia: 'digimon', imagen: '/imagesDigimon/elecmon.jpg' },
  ];

  if (!isOpen) return null;

  const cartasFiltradas = cartas.filter(c => {
    const matchFranquicia = franquicia === 'all' || c.franquicia === franquicia;
    const matchBusqueda = c.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return matchFranquicia && matchBusqueda;
  });

  const handleToggleCarta = (carta) => {
    setSelectedCartas(prev => {
      const existe = prev.find(c => c.id === carta.id);
      if (existe) {
        return prev.filter(c => c.id !== carta.id);
      } else {
        return [...prev, carta];
      }
    });
  };

  const handleSelectAll = () => {
    const allFilteredIds = cartasFiltradas.map(c => c.id);
    const currentSelectedIds = selectedCartas.map(c => c.id);
    
    if (allFilteredIds.every(id => currentSelectedIds.includes(id))) {
      setSelectedCartas(prev => prev.filter(c => !allFilteredIds.includes(c.id)));
    } else {
      const nuevasCartas = cartasFiltradas.filter(c => !currentSelectedIds.includes(c.id));
      setSelectedCartas(prev => [...prev, ...nuevasCartas]);
    }
  };

  const handleClearAll = () => {
    setSelectedCartas([]);
  };

  const handleConfirmar = () => {
    if (onSelectCartas && selectedCartas.length > 0) {
      onSelectCartas(selectedCartas);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4">
      {/* Fondo semi-transparente */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal principal */}
      <div className="relative w-full max-w-6xl h-[92vh] sm:h-[94vh] md:h-[95vh] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl animate-fadeIn" style={{ 
        backgroundColor: 'var(--background-slate)',
        border: `2px solid var(--border-color)`,
        backdropFilter: 'blur(8px)'
      }}>
        
        {/* HEADER FIJO */}
        <div className="flex-shrink-0 sticky top-0 z-20" style={{ backgroundColor: 'var(--background-slate)' }}>
          {/* Boton de cerrar - Ajustado circular perfecto */}
          <div className="flex justify-end p-2 sm:p-3 md:p-4">
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg flex-shrink-0"
              style={{ 
                width: '36px',
                height: '36px',
                backgroundColor: 'var(--button-color)',
                border: `2px solid var(--border-color)`,
                color: 'var(--primary-text-color)'
              }}
            >
              <span className="text-base font-bold">X</span>
            </button>
          </div>

          {/* Filtros y controles fijos */}
          <div className="px-3 sm:px-4 md:px-6 pb-2 sm:pb-3">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
              {/* Select de franquicia */}
              <div className="relative w-full sm:w-48 md:w-56">
                <select
                  value={franquicia}
                  onChange={(e) => setFranquicia(e.target.value)}
                  className="w-full rounded-full py-1.5 sm:py-2 px-3 sm:px-4 pr-7 sm:pr-8 outline-none appearance-none cursor-pointer text-xs sm:text-sm font-medium transition-all"
                  style={{ 
                    backgroundColor: 'var(--search-bar)',
                    color: 'white',
                    border: `1px solid var(--border-color)`
                  }}
                >
                  <option value="all">Todas las franquicias</option>
                  <option value="pokemon">Pokemon</option>
                  <option value="magic">Magic</option>
                  <option value="dragonball">Dragon Ball</option>
                  <option value="yugioh">Yu-Gi-Oh</option>
                  <option value="digimon">Digimon</option>
                </select>
                <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] sm:text-[10px] text-white">▼</span>
              </div>
              
              {/* Buscador */}
              <div className="flex-1 w-full">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full rounded-full py-1.5 sm:py-2 px-3 sm:px-4 outline-none text-xs sm:text-sm transition-all"
                  style={{ 
                    backgroundColor: 'var(--search-bar)',
                    color: 'white',
                    border: `1px solid var(--border-color)`
                  }}
                  placeholder="Buscar cartas por nombre..."
                />
              </div>
              
              {/* Botones de accion */}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleSelectAll}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-full transition-all whitespace-nowrap"
                  style={{ 
                    backgroundColor: 'var(--button-color)',
                    color: 'var(--primary-text-color)',
                    border: `1px solid var(--border-color)`
                  }}
                >
                  {cartasFiltradas.length > 0 && cartasFiltradas.every(c => selectedCartas.some(sc => sc.id === c.id))
                    ? 'Deseleccionar todas'
                    : 'Seleccionar todas'}
                </button>
                {selectedCartas.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-full transition-all whitespace-nowrap"
                    style={{ 
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      color: '#ef4444',
                      border: '1px solid #ef4444'
                    }}
                  >
                    Limpiar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contador de seleccion */}
          <div className="flex justify-between items-center px-3 sm:px-4 md:px-6 py-1 sm:py-2 pb-2 sm:pb-3">
            <div className="text-[10px] sm:text-xs md:text-sm">
              {selectedCartas.length > 0 ? (
                <span className="font-semibold highlight">
                  {selectedCartas.length} carta{selectedCartas.length !== 1 ? 's' : ''} seleccionada{selectedCartas.length !== 1 ? 's' : ''}
                </span>
              ) : (
                <span style={{ color: 'var(--secondary-text-color)' }}>Selecciona las cartas que quieres adjuntar</span>
              )}
            </div>
            <div className="text-[10px] sm:text-xs" style={{ color: 'var(--secondary-text-color)' }}>
              {cartasFiltradas.length} cartas encontradas
            </div>
          </div>
        </div>

        {/* AREA DE SCROLL */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 custom-scrollbar">
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {cartasFiltradas.map((carta) => {
              const isSelected = selectedCartas.some(c => c.id === carta.id);
              return (
                <div
                  key={carta.id}
                  onClick={() => handleToggleCarta(carta)}
                  className="group rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl"
                  style={{ 
                    borderColor: isSelected ? 'var(--border-color)' : 'rgba(86, 171, 145, 0.2)',
                    backgroundColor: isSelected ? 'var(--background-slate)' : 'rgba(51, 65, 85, 0.4)',
                    boxShadow: isSelected ? `0 0 15px var(--border-color)` : 'none'
                  }}
                >
                  <div className="aspect-[2/3] w-full overflow-hidden relative">
                    <img
                      src={carta.imagen}
                      alt={carta.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450/1e293b/56ab91?text=Imagen+No+Encontrada';
                      }}
                    />
                    
                    <div className={`absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-black/70 flex items-center justify-center transition-all
                      ${isSelected ? 'scale-110' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{ backgroundColor: isSelected ? 'var(--border-color)' : 'black' }}>
                      {isSelected ? (
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <div className="p-1.5 sm:p-2 md:p-3 text-center">
                    <h3 className="font-bold text-[10px] sm:text-xs md:text-sm truncate uppercase" style={{ color: 'var(--primary-text-color)' }}>
                      {carta.nombre}
                    </h3>
                    <p className="text-[8px] sm:text-[10px] md:text-xs font-bold highlight capitalize mt-0.5 sm:mt-1">{carta.franquicia}</p>
                    
                    {isSelected && (
                      <div className="text-[6px] sm:text-[8px] md:text-[10px] font-black mt-0.5 sm:mt-1 animate-pulse highlight">
                        SELECCIONADA
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {cartasFiltradas.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'var(--secondary-text-color)' }}>No se encontraron cartas</p>
              <p className="text-[10px] sm:text-xs mt-2" style={{ color: 'var(--secondary-text-color)' }}>Intenta con otra busqueda o franquicia</p>
            </div>
          )}
        </div>

        {/* FOOTER FIJO */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 p-3 sm:p-4 border-t" style={{ 
          backgroundColor: 'var(--background-slate)',
          borderColor: 'var(--border-color)'
        }}>
          <div className="text-[8px] sm:text-[10px] md:text-xs order-2 sm:order-1" style={{ color: 'var(--secondary-text-color)' }}>
            {selectedCartas.length > 0 && (
              <span>Presiona en las cartas para seleccionar multiples</span>
            )}
          </div>
          <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
            <button
              onClick={onClose}
              className="font-bold py-1.5 sm:py-2 px-3 sm:px-4 md:px-6 rounded-xl transition-all text-xs sm:text-sm"
              style={{ 
                backgroundColor: 'var(--button-color)',
                color: 'var(--primary-text-color)'
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmar}
              className={`font-bold py-1.5 sm:py-2 px-4 sm:px-6 md:px-8 rounded-xl shadow-lg transition-all transform active:scale-95 text-xs sm:text-sm
                ${selectedCartas.length > 0 ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              style={{ 
                backgroundColor: selectedCartas.length > 0 ? 'var(--border-color)' : 'var(--button-color)',
                color: 'white'
              }}
              disabled={selectedCartas.length === 0}
            >
              Adjuntar {selectedCartas.length > 0 ? `(${selectedCartas.length})` : ''}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--background-slate);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--hightlight-text-color);
        }
      `}</style>
    </div>
  );
};

export default Gallery;