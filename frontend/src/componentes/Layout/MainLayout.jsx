import React from "react";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FeedControls from "../Filtros/FeedControls";
import Navbar from './navbar';
import { useNavigation } from '../../../context/NavigationContext';

const MainLayout = ({ 
  children, 
  selectedFandoms, 
  onFandomChange, 
  sortBy, 
  onSortChange, 
  filterType, 
  onFilterChange 
}) => {
  
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col p-4">
      
     <Navbar setPantalla={setPantalla} />

      {/* contendio inf */}
      <div className="flex w-full max-w-[1400px] mx-auto px-2 gap-6 pb-10">
        
        {/* sidebar izq */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <LeftSidebar selectedFandoms={selectedFandoms} onFandomChange={onFandomChange} />
        </aside>

        {/* derecga */}
        <main className="flex-1 flex flex-col">
          <div className="relative z-30">
            <FeedControls 
              sortBy={sortBy} 
              onSortChange={onSortChange} 
              filterType={filterType} 
              onFilterChange={onFilterChange}
              onPublicarClick={() => setPantalla('publicar')} 
            />
          </div>
          
          <div className="bg-slate-900/40 p-6 rounded-[40px] border-2 border-[#56ab91]/20 shadow-2xl mt-4 relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;