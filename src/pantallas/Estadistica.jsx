import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Estadistica = ({ setPantalla }) => { // 1. Recibimos la prop aquí
  const datos = [
    { nombre: 'Publicaciones', valor: 43.5, color: '#f08060' },
    { nombre: 'Comentarios', valor: 34.8, color: '#bc69b8' },
    { nombre: 'Reacciones', valor: 21.7, color: '#ffffa0' },
  ];

  // texto de los lados
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2; 
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-[10px] font-medium"
      >
        {`${datos[index].nombre}`}
        <tspan x={x} dy="1.2em" fill="#9ca3af">{`${(percent * 100).toFixed(1)}%`}</tspan>
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-6 font-sans">
      <div className="relative w-full max-w-sm bg-[#1a1d26] border-2 border-[#2d4a41] rounded-xl p-8 shadow-2xl h-[450px] flex flex-col items-center">
        
        {/* btn cerrar */}
        <button 
          onClick={() => setPantalla('perfil')} // volver
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-[#252836] text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg"
        >
          X
        </button>

        <h2 className="text-center text-white text-2xl font-semibold mt-2 mb-8">Estadísticas</h2>

        {/* contnedor del grafico */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={datos}
                cx="50%"
                cy="50%"
                labelLine={false} 
                label={renderCustomizedLabel} // textos laterales
                outerRadius={70}
                dataKey="valor"
                stroke="none"
              >
                {datos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Estadistica;