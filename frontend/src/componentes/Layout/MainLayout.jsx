import React from "react";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FeedControls from "../Filtros/FeedControls";
import Navbar from './navbar';
import '../../App.css'
import '../../pantallas/index.css'
import { Toggle } from "../Toggle/toggle";
import useLocalStorage from 'use-local-storage';
import { useNavigation } from "../../../context/NavigationContext";
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
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  return (
    <div className='App' data-theme={isDark ? "dark" : "light"}>

      <div className="min-h-screen text-white font-sans flex flex-col p-4">

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
            <div className="flex items-center gap-3 mr-4">

            </div>

            <div className="bg-slate-900/40 p-6 rounded-[40px] border-2 border-[#56ab91]/20 shadow-2xl mt-4 relative z-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;