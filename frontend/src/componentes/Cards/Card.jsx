import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const Card = ({ card, onClick }) => {
  return (
    <div
      className="relative overflow-hidden cursor-pointer group bg-slate-800/40 border-2 border-[#56ab91]/20 rounded-[30px] transition-all hover:border-[#56ab91]/50 hover:shadow-[0_0_20px_rgba(86,171,145,0.2)]"
      onClick={() => onClick(card)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={card.image || "https://via.placeholder.com/300x400/1e293b/56ab91?text=Imagen+Carta"}
          alt={card.fandom}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {card.isVenta && (
            <span className="px-2 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white uppercase">
              Venta
            </span>
          )}
          {card.isIntercambio && (
            <span className="px-2 py-1 bg-blue-500/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white uppercase">
              Intercambio
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#56ab91]/20 text-[#56ab91] rounded-full uppercase border border-[#56ab91]/30">
            {card.type || "Carta"}
          </span>
          <span className="text-sm font-bold text-white">
            {card.price}
          </span>
        </div>
        
        <h4 className="font-bold text-[#56ab91] text-xs uppercase mb-1">{card.fandom}</h4>
        <p className="text-white font-bold text-sm mb-1">{card.description}</p>
        <p className="text-gray-400 text-xs italic mb-3">{card.reverse || "Edición Estándar"}</p>
        
        <div className="flex justify-between items-center text-gray-500 border-t border-white/10 pt-3">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 hover:text-rose-400 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-[10px]">24</span>
            </button>
            <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-[10px]">12</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="px-4 py-2 bg-[#56ab91] text-slate-900 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl">
          VER DETALLES
        </span>
      </div>
    </div>
  );
};

export default Card;