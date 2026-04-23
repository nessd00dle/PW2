import React, { useState } from 'react';

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
    { id: 8, nombre: 'Charizad ex', franquicia: 'pokemon', imagen: '/imagesPokemon/charizard_ex.PNG' },
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

  const handleConfirmar = () => {
    if (onSelectCartas && selectedCartas.length > 0) {
      onSelectCartas(selectedCartas);
    }
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0f172a] text-white flex flex-col rounded-3xl border-2 border-[#56ab91] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          
          {/* header */}
          <div className="flex items-center gap-3 p-4 bg-[#56ab91] rounded-full m-4">
            <div className="relative">
              <select 
                value={franquicia}
                onChange={(e) => setFranquicia(e.target.value)}
                className="bg-[#3d7a67] rounded-full py-2 px-5 pr-8 outline-none text-white text-sm font-medium cursor-pointer"
              >
                <option value="all">Todas las Franquicias</option>
                <option value="pokemon">Pokémon</option>
                <option value="magic">Magic</option>
                <option value="dragonball">Dragon Ball</option>
                <option value="yugioh">Yu-Gi-Oh</option>
                <option value="digimon">Digimon</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px]">▼</span>
            </div>

            <input 
              type="text" 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 bg-[#3d7a67] rounded-full py-2 px-5 outline-none text-white text-sm placeholder-emerald-200" 
              placeholder="Buscar cartas por nombre..." 
            />

            <button 
              onClick={onClose} 
              className="w-9 h-9 bg-[#2d2a3e] rounded-full flex items-center justify-center font-bold border border-[#56ab91] hover:bg-red-600 transition-all"
            >
              X
            </button>
          </div>

          {/* contador de cartas sleccionadas */}
          <div className="px-6 pb-2">
            <div className="bg-[#2d2a3e] rounded-full px-4 py-1.5 inline-block">
              <span className="text-sm">
                Cartas seleccionadas: 
                <span className="font-bold text-[#d91a7a] ml-1">{selectedCartas.length}</span>
              </span>
            </div>
          </div>

          {/* grid cartas */}
          <div className="w-full overflow-y-auto custom-scrollbar px-6 py-3">
            <h2 className="text-xl font-bold mb-4 text-center text-[#56ab91] uppercase tracking-widest">
              {franquicia === 'all' ? 'Mi Colección' : `Cartas de ${franquicia}`}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cartasFiltradas.map((carta) => {
                const isSelected = selectedCartas.some(c => c.id === carta.id);
                
                return (
                  <div
                    key={carta.id}
                    onClick={() => handleToggleCarta(carta)}
                    className={`bg-slate-800/60 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(86,171,145,0.3)]
                      ${isSelected 
                        ? 'border-[#d91a7a] shadow-[0_0_15px_rgba(217,26,122,0.5)]' 
                        : 'border-[#56ab91]/30 hover:border-[#56ab91]'}`}
                  >
                    <div className="aspect-[2/3] w-full bg-slate-900 relative">
                      <img 
                        src={carta.imagen} 
                        alt={carta.nombre}
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x450/1e293b/56ab91?text=No+Found';
                        }}
                      />
                      {/* palomita de seleccion*/}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-[#d91a7a] rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-2 text-center bg-slate-800/80">
                      <h3 className="font-bold text-xs truncate uppercase">{carta.nombre}</h3>
                      {isSelected && (
                        <div className="text-[8px] text-[#d91a7a] font-black mt-0.5 animate-pulse">
                          ✓ SELECCIONADA
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* cancelar y adjuntar */}
          <div className="w-full flex justify-between gap-4 p-5 border-t border-[#56ab91]/20 bg-slate-900/50">
            <button
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-7 rounded-xl transition-all text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmar}
              disabled={selectedCartas.length === 0}
              className={`font-bold py-2 px-7 rounded-xl shadow-lg transition-all transform active:scale-95 text-sm
                ${selectedCartas.length > 0 
                  ? 'bg-[#d91a7a] hover:bg-[#f22c8e] text-white cursor-pointer' 
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
            >
              Adjuntar {selectedCartas.length} {selectedCartas.length === 1 ? 'carta' : 'cartas'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #56ab91; 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3d7a67; }
      `}</style>
    </>
  );
};

export default Gallery;