import React from 'react';
import { Filter } from 'lucide-react';

const FandomFilter = ({ selectedFandoms, onFandomChange }) => {
  const fandoms = [
    { id: 'pokemon', label: 'Pokémon', color: 'from-yellow-400 to-red-400' },
    { id: 'magic', label: 'Magic', color: 'from-blue-400 to-purple-400' },
    { id: 'digimon', label: 'Digimon', color: 'from-orange-400 to-red-400' },
    { id: 'dragonball', label: 'DragonBall', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="w-full bg-slate-900/60 p-4 rounded-3xl border-2 border-[#56ab91]/30 shadow-xl">
      <h3 className="font-semibold text-[#56ab91] mb-3 flex items-center gap-2">
        <Filter className="w-4 h-4" /> Filtrar por franquicia
      </h3>
      <div className="space-y-3">
        {fandoms.map(fandom => (
          <label 
            key={fandom.id} 
            className={`flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer border border-transparent w-full
              ${selectedFandoms.includes(fandom.id) 
                ? `bg-[#56ab91]/20 border-[#56ab91]/50 shadow-[0_0_10px_rgba(86,171,145,0.2)]` 
                : 'hover:bg-white/5'}`}
          >
            <input
              type="checkbox"
              checked={selectedFandoms.includes(fandom.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  onFandomChange([...selectedFandoms, fandom.id]);
                } else {
                  onFandomChange(selectedFandoms.filter(f => f !== fandom.id));
                }
              }}
              className="w-4 h-4 rounded border-[#56ab91] bg-transparent text-[#56ab91] focus:ring-[#56ab91]"
            />
            <span className={`text-sm font-medium ${
              selectedFandoms.includes(fandom.id) ? 'text-white' : 'text-gray-400'
            }`}>
              {fandom.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FandomFilter;