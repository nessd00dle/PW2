import React, { useState } from 'react';
import '../../App.css'
import '../../pantallas/index.css'

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
    { id: 11, nombre: 'Albóndiga Siempre Leal', franquicia: 'magic', imagen: '/imagesMagic/albondiga_siempre_leal.png' },
    { id: 12, nombre: 'Herbívoro arbóreo', franquicia: 'magic', imagen: '/imagesMagic/herbivoro_arboreo.png' },
    { id: 13, nombre: 'Astillas Oseas', franquicia: 'magic', imagen: '/imagesMagic/astillas_oseas.jpg' },
    { id: 14, nombre: 'Hurgar Cerebro', franquicia: 'magic', imagen: '/imagesMagic/hurgar_cerebro.png' },
    { id: 15, nombre: 'Contendiente Aclamada', franquicia: 'magic', imagen: '/imagesMagic/contendiente_aclamda.png' },
    { id: 16, nombre: 'Rastrero de la Cripta', franquicia: 'magic', imagen: '/imagesMagic/rastrero_de_la_cripta.jpg' },
    { id: 17, nombre: 'Sueños Desenfrenados', franquicia: 'magic', imagen: '/imagesMagic/suenos_desenfrenados.png' },
    // DRAGON BALL
    { id: 20, nombre: 'Exploradores', franquicia: 'dragonball', imagen: '/imagesDB/exploradores.jpg' },
    { id: 21, nombre: 'Sabemos quien ganará', franquicia: 'dragonball', imagen: '/imagesDB/sabemos_quien_ganara.jpg' },
    { id: 22, nombre: 'Big bang kame hame ha', franquicia: 'dragonball', imagen: '/imagesDB/big_bang_kame_hame_ha.jpg' },
    { id: 23, nombre: 'Detener Ataque', franquicia: 'dragonball', imagen: '/imagesDB/detener_ataque.jpg' },
    { id: 24, nombre: 'Humillando', franquicia: 'dragonball', imagen: '/imagesDB/humillando.jpg' },
    { id: 25, nombre: 'Big Bang', franquicia: 'dragonball', imagen: '/imagesDB/big_bang.jpg' },
    { id: 26, nombre: 'Quita aire', franquicia: 'dragonball', imagen: '/imagesDB/quita_aire.jpg' },
    { id: 27, nombre: 'Súper Saiyan 2', franquicia: 'dragonball', imagen: '/imagesDB/super_saiyan2.png' },
    // YU-GI-OH
    { id: 28, nombre: 'Chica Maga Oscura', franquicia: 'yugioh', imagen: '/imagesYugioh/chica_maga_oscura.jpg' },
    { id: 29, nombre: 'D Contragolpe', franquicia: 'yugioh', imagen: '/imagesYugioh/d-contragolpe.jpg' },
    { id: 30, nombre: 'Ciber Dragón', franquicia: 'yugioh', imagen: '/imagesYugioh/ciber_dragon.jpg' },
    { id: 31, nombre: 'Coraza del Caos', franquicia: 'yugioh', imagen: '/imagesYugioh/coraza_del_caos.jpg' },
    { id: 32, nombre: 'Dragón Blanco de ojos Azules', franquicia: 'yugioh', imagen: '/imagesYugioh/dragon_blanco_de_ojos_azules.jpg' },
    { id: 33, nombre: 'El Dragón alado de Ra', franquicia: 'yugioh', imagen: '/imagesYugioh/el_dragon_alado_de_ra.jpg' },
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

  // seleccionar/deseleccionar carta
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

  // selecc cartas filtradas
  const handleSelectAll = () => {
    const allFilteredIds = cartasFiltradas.map(c => c.id);
    const currentSelectedIds = selectedCartas.map(c => c.id);
    
    // si todas las filtradas ya están seleccionadas se delesccionadn
    if (allFilteredIds.every(id => currentSelectedIds.includes(id))) {
      setSelectedCartas(prev => prev.filter(c => !allFilteredIds.includes(c.id)));
    } else {
      // agrega las q no estan sleeccionadas
      const nuevasCartas = cartasFiltradas.filter(c => !currentSelectedIds.includes(c.id));
      setSelectedCartas(prev => [...prev, ...nuevasCartas]);
    }
  };

  //se limpian selecciones
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
    <div className='App' id='App'>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 text-white flex flex-col rounded-3xl border-2 border-[#56ab91] max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">

          {/* Header / Navbar */}
          <nav className="w-full p-4 border-b border-[#56ab91]/20">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Filtro de franquicia */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={franquicia}
                  onChange={(e) => setFranquicia(e.target.value)}
                  className="bg-slate-800 rounded-full py-2 px-6 pr-10 outline-none border border-[#56ab91]/30 text-white appearance-none cursor-pointer text-sm font-medium"
                >
                  <option value="all">Todas las Franquicias</option>
                  <option value="pokemon">Pokémon</option>
                  <option value="magic">Magic</option>
                  <option value="dragonball">Dragon Ball</option>
                  <option value="yugioh">Yu-Gi-Oh</option>
                  <option value="digimon">Digimon</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]">▼</span>
              </div>

              {/* Buscador */}
              <div className="flex-1 w-full max-w-md">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full bg-slate-800 rounded-full py-2 px-4 outline-none border border-[#56ab91]/30 text-white text-sm placeholder-gray-400"
                  placeholder="Buscar cartas por nombre..."
                />
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1.5 text-xs bg-[#56ab91]/20 hover:bg-[#56ab91]/40 rounded-full transition-colors"
                >
                  {cartasFiltradas.length > 0 && cartasFiltradas.every(c => selectedCartas.some(sc => sc.id === c.id))
                    ? 'Deseleccionar todas'
                    : 'Seleccionar todas'}
                </button>
                {selectedCartas.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="px-3 py-1.5 text-xs bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center font-bold transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
          </nav>

          {/* Contador de selección */}
          <div className="px-6 pt-4 pb-2 flex justify-between items-center">
            <div className="text-sm">
              {selectedCartas.length > 0 ? (
                <span className="text-[#56ab91] font-semibold">
                  {selectedCartas.length} carta{selectedCartas.length !== 1 ? 's' : ''} seleccionada{selectedCartas.length !== 1 ? 's' : ''}
                </span>
              ) : (
                <span className="text-gray-400"> Selecciona las cartas que quieres adjuntar</span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {cartasFiltradas.length} cartas encontradas
            </div>
          </div>

          {/* Grid de cartas */}
          <div className="w-full overflow-y-auto custom-scrollbar px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cartasFiltradas.map((carta) => {
                const isSelected = selectedCartas.some(c => c.id === carta.id);
                return (
                  <div
                    key={carta.id}
                    onClick={() => handleToggleCarta(carta)}
                    className={`group bg-slate-800/60 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(86,171,145,0.3)]
                      ${isSelected
                        ? 'border-[#56ab91] shadow-[0_0_15px_rgba(86,171,145,0.5)] bg-[#56ab91]/10'
                        : 'border-[#56ab91]/20 hover:border-[#56ab91]/50'}`}
                  >
                    {/* Contenedor de imagen */}
                    <div className="aspect-[2/3] w-full bg-slate-900 flex items-center justify-center overflow-hidden relative">
                      <img
                        src={carta.imagen}
                        alt={carta.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x450/1e293b/56ab91?text=Imagen+No+Encontrada';
                        }}
                      />
                      
                      {/* Checkbox de selección */}
                      <div className={`absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center transition-all
                        ${isSelected ? 'bg-[#56ab91] scale-110' : 'opacity-0 group-hover:opacity-100'}`}>
                        {isSelected ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                    </div>

                    {/* Info de la carta */}
                    <div className="p-3 text-center bg-slate-800/80">
                      <h3 className="font-bold text-xs sm:text-sm truncate uppercase mb-1">{carta.nombre}</h3>
                      <p className="text-[#56ab91] text-xs font-bold">{carta.franquicia}</p>
                      
                      {isSelected && (
                        <div className="text-[10px] text-[#56ab91] font-black mt-1 animate-pulse">
                          ✓ SELECCIONADA
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mensaje cuando no hay resultados */}
            {cartasFiltradas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No se encontraron cartas</p>
                <p className="text-sm text-gray-500 mt-2">Intenta con otra búsqueda o franquicia</p>
              </div>
            )}
          </div>

          {/* Footer - Botones de acción */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 p-6 border-t border-[#56ab91]/20 bg-slate-900/50">
            <div className="text-xs text-gray-400 order-2 sm:order-1">
              {selectedCartas.length > 0 && (
                <span>Presiona en las cartas para seleccionar múltiples</span>
              )}
            </div>
            <div className="flex gap-3 order-1 sm:order-2">
              <button
                onClick={onClose}
                className="font-bold py-2 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                className={`font-bold py-2 px-8 rounded-xl shadow-lg transition-all transform active:scale-95
                  ${selectedCartas.length > 0
                    ? 'bg-gradient-to-r from-[#56ab91] to-[#3a8b6f] hover:from-[#3a8b6f] hover:to-[#2a6b5f] text-white cursor-pointer'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
                disabled={selectedCartas.length === 0}
              >
                Adjuntar {selectedCartas.length > 0 ? `(${selectedCartas.length})` : ''}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #56ab91; 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3d7a67; }
      `}</style>
    </div>
  );
};

export default Gallery;