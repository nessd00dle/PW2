import React from "react";
import LeftSidebar from "../Sidebar/LeftSidebar";
import FeedControls from "../Filtros/FeedControls";
import '../../App.css'
import '../../index.css'
import { Toggle } from "../Modos/toggle";
import useLocalStorage from 'use-local-storage';


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

    <div className="min-h-screen text-white font-sans flex flex-col p-4">
      <div className='App' data-theme={isDark ? "dark" : "light"}>
        <nav className="w-full bg-[#56ab91] rounded-full p-3 mb-6 flex items-center justify-between shadow-lg">
          <div className="flex gap-4 ml-4">
            {/* logo */}
            <button
              onClick={() => setPantalla('ventas')}
              className="hover:scale-110 transition-transform focus:outline-none"
            >
              <img
                src="public/logo.png"
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </button>

            <button
              onClick={() => setPantalla('ventas')}
              className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group"
            >
              <img
                src="https://www.svgrepo.com/show/324791/store-business-marketplace-shop-sale-buy-marketing.svg"
                alt="Tienda"
                className="w-6 h-6 invert opacity-80 group-hover:opacity-100"
              />
            </button>

            <button
              onClick={() => setPantalla('coleccion')}
              className="w-10 h-10 bg-[#2d2a3e] rounded-md flex items-center justify-center hover:bg-slate-700 transition-all group"
            >
              <img
                src="https://static.thenounproject.com/png/2221162-200.png"
                alt="Coleccion"
                className="w-6 h-6 invert opacity-80 group-hover:opacity-100"
              />
            </button>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-[#3d7a67] rounded-full py-2 px-10 outline-none border-none placeholder-emerald-200 text-white"
                placeholder="Buscar"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mr-4">
            <Toggle
              isChecked={isDark}
              handleChange={() => setIsDark(!isDark)}
            />

            <span className="font-bold">Usuario</span>
            <button
              onClick={() => setPantalla('perfil')}
              className="w-10 h-10 bg-white rounded-full border-2 border-pink-500 overflow-hidden hover:ring-2 hover:ring-pink-300 transition-all"
            >
              <img
                src="https://media.tenor.com/pgRHsHG3M2MAAAAe/gato-serio.png"
              />
            </button>
          </div>
        </nav>

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
    </div>
  );
};

export default MainLayout;