import React, { useState } from 'react';
import '../../App.css'
import '../../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../Toggle/ThemeOptions';
const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

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
      <div className='App' id='App'>
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-slate text-white flex flex-col items-center rounded-3xl border-2 border-[#56ab91] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">

            {/* Header / Navbar - Solo un botón de cerrar */}
            <nav className="w-full header rounded-full p-3 mb-4 mt-4 mx-4 flex items-center justify-between shadow-lg max-w-[95%]">
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={franquicia}
                    onChange={(e) => setFranquicia(e.target.value)}
                    className="bg-slate rounded-full py-2 px-6 pr-10 outline-none border-none text-white appearance-none cursor-pointer text-sm font-medium"
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
              </div>

              <div className="flex-1 max-w-xl mx-8">
                <input
                  type="text"
                  className="w-full search-bar rounded-full py-2 px-10 outline-none text-white text-sm"
                  placeholder="Buscar cartas por nombre..."
                />
              </div>

              {/* Único botón de cerrar */}
              <button
                onClick={onClose}
                className="w-10 h-10 button rounded-full flex items-center justify-center font-bold border hover:bg-red-600 transition-all"
              >
                X
              </button>
            </nav>

            {/* Grid de cartas */}
            <div className="w-full overflow-y-auto custom-scrollbar px-6 py-4">
              <h2 className="text-2xl font-bold mb-6 text-center highlight uppercase tracking-widest">
                {franquicia === 'all' ? 'Mi Colección' : `Cartas de ${franquicia}`}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {cartasFiltradas.map((carta) => (
                  <div
                    key={carta.id}
                    onClick={() => handleSelectCarta(carta)}
                    className={`bg-slate-800/60 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_0_20px_rgba(86,171,145,0.3)]
                    ${selectedCarta?.id === carta.id
                        ? 'border-[#d91a7a] shadow-[0_0_15px_rgba(217,26,122,0.5)]'
                        : 'border hover:border-[--focus-color]'}`}
                  >
                    {/* Contenedor de imagen con proporción de carta real */}
                    <div className="aspect-[2/3] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                      <img
                        src={carta.imagen}
                        alt={carta.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x450/1e293b/56ab91?text=Imagen+No+Encontrada';
                        }}
                      />
                    </div>

                    {/* Info de la carta */}
                    <div className="p-3 text-center bg-slate-800/80">
                      <h3 className="font-bold text-sm truncate uppercase mb-1">{carta.nombre}</h3>
                      <p className="text-[#56ab91] text-xs font-bold">{carta.precio}</p>

                      {selectedCarta?.id === carta.id && (
                        <div className="text-[9px] text-[#d91a7a] font-black mt-1 animate-pulse">
                          SELECCIONADA
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer simplificado - Solo botón Adjuntar carta */}
            <div className="w-full flex justify-end p-6 border-t border-[#56ab91]/20 bg-slate-900/50">
              <button
                onClick={() => {
                  if (selectedCarta) {
                    if (onSelectCarta) onSelectCarta(selectedCarta);
                    onClose();
                  }
                }}
                className={`font-bold py-2 px-8 rounded-xl shadow-lg transition-all transform active:scale-95
                ${selectedCarta
                    ? 'bg-slate hover:bg-[#f22c8e] text-white cursor-pointer'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
              >
                Adjuntar carta
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
      </div>
    </>
  );
};

export default Gallery;