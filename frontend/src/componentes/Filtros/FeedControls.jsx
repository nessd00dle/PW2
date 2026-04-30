import React, { useState, useEffect } from 'react';
import { ChevronDown, PlusCircle } from 'lucide-react';

const FeedControls = ({ 
  sortBy, 
  onSortChange, 
  filterType, 
  onFilterChange, 
  onPublicarClick, 
  isMobile, 
  onMobileFilterClick, 
  onMobileReportsClick 
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions = [
    { value: 'popular', label: 'Popularidad' },
    { value: 'price_asc', label: 'Mas baratas' },
    { value: 'price_desc', label: 'Mas caras' }
  ];

  const filterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'sale', label: 'Venta' },
    { value: 'trade', label: 'Intercambio' },
    { value: 'coleccion', label: 'Coleccion' }
  ];

  const selectedSort = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];
  const selectedFilter = filterOptions.find(opt => opt.value === filterType) || filterOptions[0];


  if (isMobile) {
    return (
      <div className="w-full space-y-3">
        {/* boton Publicar */}
        <button 
          onClick={onPublicarClick}
          className="w-full bg-white text-slate-900 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold hover:bg-[--hover-button-color] hover:text-white transition-all shadow-lg"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm">Publicar</span>
        </button>

        {/* 3 botones */}
        <div className="flex justify-center gap-3">
          {/* ordenar */}
          <div className="relative flex-1 max-w-[100px]">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)} 
              className="w-full bg-slate-900 border border-[#56ab91]/30 text-white px-2 py-2 rounded-xl flex items-center justify-between gap-1 text-xs"
            >
              <span>{selectedSort.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
              <div className="absolute top-full left-0 mt-1 w-full rounded-xl overflow-hidden z-50 shadow-2xl" style={{ backgroundColor: 'var(--background-slate)', border: `1px solid var(--border-color)` }}>
                {sortOptions.map(option => (
                  <button 
                    key={option.value} 
                    onClick={() => {
                      onSortChange(option.value);
                      setIsSortOpen(false);
                    }} 
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#56ab91]/20 text-white"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* tipo de publicación */}
          <div className="relative flex-1 max-w-[100px]">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className="w-full bg-slate-900 border border-[#56ab91]/30 text-white px-2 py-2 rounded-xl flex items-center justify-between gap-1 text-xs"
            >
              <span>{selectedFilter.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-1 w-full rounded-xl overflow-hidden z-50 shadow-2xl" style={{ backgroundColor: 'var(--background-slate)', border: `1px solid var(--border-color)` }}>
                {filterOptions.map(option => (
                  <button 
                    key={option.value} 
                    onClick={() => {
                      console.log('Cambiando filtro a:', option.value);
                      onFilterChange(option.value);
                      setIsFilterOpen(false);
                    }} 
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#56ab91]/20 text-white"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* reportes */}
          <button 
            onClick={onMobileReportsClick}
            className="flex-1 max-w-[80px] bg-slate-900 border border-[#56ab91]/30 text-white px-2 py-2 rounded-xl flex items-center justify-center gap-1 text-xs"
          >
            <span>Reportes</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-4 w-full">
      
      <button 
        onClick={onPublicarClick}
        className="bg-white text-slate-900 flex items-center gap-2 px-5 py-2 rounded-full font-bold hover:bg-[--hover-button-color] hover:text-white transition-all shadow-lg text-sm"
      >
        <PlusCircle className="w-4 h-4" />
        Publicar
      </button>

      <div className="flex gap-3">
        {/* ordenar */}
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)} 
            className="bg-slate-900 border border-[#56ab91]/30 text-white px-4 py-2 rounded-xl flex items-center gap-4 min-w-[150px] justify-between"
          >
            <span>{selectedSort.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>
          {isSortOpen && (
            <div className="absolute top-full right-0 mt-2 w-[150px] rounded-xl overflow-hidden z-50 shadow-2xl" style={{ backgroundColor: 'var(--background-slate)', border: `1px solid var(--border-color)` }}>
              {sortOptions.map(option => (
                <button 
                  key={option.value} 
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }} 
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[#56ab91]/20 text-white"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* tipo publicación */}
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)} 
            className="bg-slate-900 border border-[#56ab91]/30 text-white px-4 py-2 rounded-xl flex items-center gap-4 min-w-[150px] justify-between"
          >
            <span>{selectedFilter.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-2 w-[150px] rounded-xl overflow-hidden z-50 shadow-2xl" style={{ backgroundColor: 'var(--background-slate)', border: `1px solid var(--border-color)` }}>
              {filterOptions.map(option => (
                <button 
                  key={option.value} 
                  onClick={() => {
                    console.log('Desktop - Cambiando filtro a:', option.value);
                    onFilterChange(option.value);
                    setIsFilterOpen(false);
                  }} 
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[#56ab91]/20 text-white"
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