import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSidebar from "../Sidebar/LeftSidebar";
import FeedControls from "../Filtros/FeedControls";
import Navbar from './navbar';
import '../../App.css';
import '../../pantallas/index.css';
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
  const navigate = useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileReportsOpen, setMobileReportsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='App' id='App' style={{ isolation: 'isolate' }}>
      <div className="min-h-screen text-white font-sans flex flex-col">
        
       
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 pt-16 pb-6 sm:pb-8">
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
           
            <aside className="hidden md:block md:w-[260px] lg:w-[280px] flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <LeftSidebar 
                  selectedFandoms={selectedFandoms} 
                  onFandomChange={onFandomChange} 
                />
                <ReportesAside />
              </div>
            </aside>
            
            {/* main content */}
            <main className="flex-1 flex flex-col min-w-0">
              <div className="relative">
                <FeedControls
                  sortBy={sortBy}
                  onSortChange={onSortChange}
                  filterType={filterType}
                  onFilterChange={onFilterChange}
                  onPublicarClick={() => navigate('/publicar')}
                  isMobile={isMobile}
                  onMobileFilterClick={() => setMobileFiltersOpen(true)}
                  onMobileReportsClick={() => setMobileReportsOpen(true)}
                />
              </div>
              
              <div className="bg-slate-900/40 p-2 sm:p-3 md:p-5 rounded-2xl sm:rounded-3xl md:rounded-[32px] border-2 border-[#56ab91]/20 shadow-2xl mt-3 sm:mt-4">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* filtros izq*/}
      {isMobile && mobileFiltersOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] z-50 transform transition-transform duration-300 ease-out shadow-2xl overflow-y-auto rounded-r-2xl" style={{ backgroundColor: 'var(--background-slate)' }}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <h2 className="text-lg font-bold highlight">Filtros</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--button-color)', border: `1px solid var(--border-color)` }}
                >
                  <span className="text-sm font-bold">X</span>
                </button>
              </div>
              <LeftSidebar 
                selectedFandoms={selectedFandoms} 
                onFandomChange={(fandoms) => {
                  onFandomChange(fandoms);
                }} 
              />
            </div>
          </div>
        </>
      )}

      {/* reportes der */}
      {isMobile && mobileReportsOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setMobileReportsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-[320px] z-50 transform transition-transform duration-300 ease-out shadow-2xl overflow-y-auto rounded-l-2xl" style={{ backgroundColor: 'var(--background-slate)' }}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <h2 className="text-lg font-bold highlight">Reportes Rapidos</h2>
                <button
                  onClick={() => setMobileReportsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--button-color)', border: `1px solid var(--border-color)` }}
                >
                  <span className="text-sm font-bold">X</span>
                </button>
              </div>
              <ReportesAside isMobileView={true} />
            </div>
          </div>
        </>
      )}

      {/* botones de filtro y reportes */}
      {isMobile && !mobileFiltersOpen && !mobileReportsOpen && (
        <>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="fixed bottom-6 left-6 z-30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
            style={{ backgroundColor: 'var(--button-color)', border: `2px solid var(--border-color)` }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          
          <button
            onClick={() => setMobileReportsOpen(true)}
            className="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
            style={{ backgroundColor: 'var(--button-color)', border: `2px solid var(--border-color)` }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default MainLayout;