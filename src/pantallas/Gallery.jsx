import React, { useState } from 'react';

const Gallery = ({ setPantalla, isOpen, onClose, onSelectCarta }) => {
  const [selectedCarta, setSelectedCarta] = useState(null);
  
  // Datos de ejemplo de cartas disponibles
  const cartas = [
    { id: 1, nombre: 'Pikachu', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png', precio: '$10.99' },
    { id: 2, nombre: 'Charizard', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png', precio: '$25.99' },
    { id: 3, nombre: 'Bulbasaur', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', precio: '$8.99' },
    { id: 4, nombre: 'Squirtle', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', precio: '$8.99' },
    { id: 5, nombre: 'Eevee', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png', precio: '$12.99' },
    { id: 6, nombre: 'Mewtwo', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png', precio: '$30.99' },
    { id: 7, nombre: 'Gengar', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png', precio: '$15.99' },
    { id: 8, nombre: 'Dragonite', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png', precio: '$20.99' },
    { id: 9, nombre: 'Snorlax', imagen: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png', precio: '$18.99' },
  ];

  if (!isOpen) return null;

  const handleSelectCarta = (carta) => {
    setSelectedCarta(carta);
    // Aquí puedes pasar la carta seleccionada al componente padre
    if (onSelectCarta) {
      onSelectCarta(carta);
    }
  };

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0f172a] text-white font-sans p-4 flex flex-col items-center rounded-3xl border-2 border-[#56ab91] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          
          {/* navbar del modal */}
          <nav className="w-full bg-[#56ab91] rounded-full p-3 mb-4 flex items-center justify-between shadow-lg">
            <div className="flex gap-4 ml-4">
              <div className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center">
                <img src="public/logo.png" alt="Logo" className="h-6 w-auto object-contain invert" />
              </div>

              <div className="relative">
                <select className="bg-[#3d7a67] rounded-full py-2 px-6 pr-10 outline-none border-none text-white appearance-none cursor-pointer text-sm font-medium">
                  <option value="pokemon">Pokemon</option>
                  <option value="magic">Magic</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]">▼</span>
              </div>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <input 
                type="text" 
                className="w-full bg-[#3d7a67] rounded-full py-2 px-10 outline-none placeholder-emerald-200 text-white" 
                placeholder="Buscar cartas..." 
              />
            </div>

            <div className="flex items-center gap-3 mr-4">
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-[#2d2a3e] rounded-full flex items-center justify-center font-bold border border-[#56ab91] hover:bg-red-600 transition-all"
              >
                X
              </button>
            </div>
          </nav>

          {/* contenido - galería de cartas */}
          <div className="w-full overflow-y-auto custom-scrollbar px-2 py-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#56ab91]">
              Selecciona una carta para adjuntar
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cartas.map((carta) => (
                <div
                  key={carta.id}
                  onClick={() => handleSelectCarta(carta)}
                  className={`bg-slate-800/40 rounded-xl p-3 border-2 transition-all cursor-pointer hover:scale-105 hover:shadow-xl
                    ${selectedCarta?.id === carta.id 
                      ? 'border-[#d91a7a] ring-2 ring-[#d91a7a]/50' 
                      : 'border-[#56ab91]/30 hover:border-[#56ab91]'
                    }`}
                >
                  <div className="aspect-square mb-2 bg-slate-700/30 rounded-lg overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src={carta.imagen} 
                      alt={carta.nombre}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-sm truncate">{carta.nombre}</h3>
                  <p className="text-[#56ab91] text-xs font-semibold">{carta.precio}</p>
                  
                  {selectedCarta?.id === carta.id && (
                    <div className="mt-1 text-[10px] text-[#d91a7a] font-bold uppercase tracking-wider">
                      ✓ Seleccionada
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* pie del modal con acciones */}
          <div className="w-full flex justify-end gap-3 pt-4 border-t border-[#56ab91]/30 mt-2">
            <button
              onClick={onClose}
              className="bg-transparent hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-xl border border-[#56ab91] transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (selectedCarta) {
                  alert(`Carta seleccionada: ${selectedCarta.nombre}`);
                  onClose();
                } else {
                  alert('Por favor selecciona una carta');
                }
              }}
              className="bg-[#d91a7a] hover:bg-[#f22c8e] text-white font-bold py-2 px-8 rounded-xl shadow-lg transform active:scale-95 transition-all"
            >
              Adjuntar carta
            </button>
          </div>
        </div>
      </div>

      {/* Estilos para el scrollbar personalizado */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #56ab91;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3d7a67;
        }
      `}</style>
    </>
  );
};

export default Gallery;