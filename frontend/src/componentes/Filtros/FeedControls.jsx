import React, { useState } from 'react';
import { ChevronDown, PlusCircle } from 'lucide-react';

const FeedControls = ({ sortBy, onSortChange, filterType, onFilterChange, onPublicarClick }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  const sortOptions = [
    { value: 'popular', label: 'Popularidad' },
    { value: 'price_asc', label: 'Más baratas' },
    { value: 'price_desc', label: 'Más caras' }
  ];

 
  const filterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'sale', label: 'Venta' },
    { value: 'trade', label: 'Intercambio' },
    { value: 'coleccion', label: 'Colección' }
  ];

  const selectedSort = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];
  const selectedFilter = filterOptions.find(opt => opt.value === filterType) || filterOptions[0];

  return (
    <div className="flex justify-between items-center mb-6 w-full">

      <button 
        onClick={onPublicarClick}
        className="bg-white text-slate-900 flex items-center gap-2 px-6 py-2.5 rounded-full font-bold hover:bg-[--hover-button-color] hover:text-white transition-all shadow-lg"
      >
        <PlusCircle className="w-5 h-5" />
        Publicar
      </button>

      <div className="flex gap-4">

        <div className="relative">
          <button 
            onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }} 
            className="bg-slate-900 border-2 border text-white px-4 py-2 rounded-xl flex items-center gap-4 min-w-[160px] justify-between hover:bg-[--hover-button-color] transition-colors"
          >
            <span>{selectedSort.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortOpen && (
            <div className="absolute top-full right-0 mt-2 w-full bg-[#1a1d26] border-2 border rounded-xl overflow-hidden z-[999] shadow-2xl">
              {sortOptions.map(option => (
                <button 
                  key={option.value} 
                  onClick={() => { onSortChange(option.value); setIsSortOpen(false); }} 
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[--hover-button-color] hover:text-white text-white"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* filtro 2 colección */}
        <div className="relative">
          <button 
            onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }} 
            className="bg-slate-900 border-2 border text-white px-4 py-2 rounded-xl flex items-center gap-4 min-w-[160px] justify-between hover:bg-[--hover-button-color] transition-colors"
          >
            <span>{selectedFilter.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-2 w-full bg-[#1a1d26] border-2 border rounded-xl overflow-hidden z-[999] shadow-2xl">
              {filterOptions.map(option => (
                <button 
                  key={option.value} 
                  onClick={() => { onFilterChange(option.value); setIsFilterOpen(false); }} 
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[--hover-button-color] hover:text-white text-white"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedControls;