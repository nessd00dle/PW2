import React from "react";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FeedControls from "../Filtros/FeedControls";
import Navbar from './navbar';
import '../../App.css'
import '../../pantallas/index.css'
import ReportesAside from "./ReportesAside";

const MainLayout = ({
  children,
  selectedFandoms,
  onFandomChange,
  setPantalla,
  sortBy,
  onSortChange,
  filterType,
  onFilterChange
}) => {
  return (
    <div className='App' id='App' style={{ isolation: 'isolate' }}>
      <div className="min-h-screen text-white font-sans flex flex-col p-4">
        
        <Navbar setPantalla={setPantalla} />
       
        <div className="flex w-full max-w-[1400px] mx-auto px-2 gap-6 pb-10">
         
          <aside className="hidden md:block w-[280px] flex-shrink-0">
            <div className="sticky top-4 space-y-6">
              <LeftSidebar 
                selectedFandoms={selectedFandoms} 
                onFandomChange={onFandomChange} 
              />
              <ReportesAside />
            </div>
          </aside>
          
          <main className="flex-1 flex flex-col min-w-0" style={{ position: 'relative', zIndex: 1 }}>
            <div className="relative">
              <FeedControls
                sortBy={sortBy}
                onSortChange={onSortChange}
                filterType={filterType}
                onFilterChange={onFilterChange}
                onPublicarClick={() => setPantalla('publicar')}
              />
            </div>
            
            <div className="bg-slate-900/40 p-6 rounded-[40px] border-2 border-[#56ab91]/20 shadow-2xl mt-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;