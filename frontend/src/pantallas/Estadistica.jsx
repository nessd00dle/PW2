import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid
} from 'recharts';
import {
  FaChartLine, FaComments, FaHeart, FaNewspaper,
  FaArrowUp, FaCalendarAlt, FaUserFriends
} from 'react-icons/fa';
import '../App.css'
import '../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../componentes/Toggle/ThemeOptions';
const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;


const Estadistica = ({ setPantalla }) => {
  const [periodo, setPeriodo] = useState('semana');
  const [animacion, setAnimacion] = useState(false);

  // esto va a venir del backend, por ahora lo simulo con datos falsotes
  const datosPrincipales = {
    publicaciones: 24,
    comentarios: 142,
    reacciones: 387,//reacciones obtenidas 
    likesDados: 456,

  };

  // Datos para gráfico de pastel (interacciones recibidas)
  const datosInteracciones = [
    { nombre: 'Publicaciones', valor: datosPrincipales.publicaciones, color: '#f08060' },
    { nombre: 'Comentarios', valor: datosPrincipales.comentarios, color: '#bc69b8' },
    { nombre: 'Reacciones', valor: datosPrincipales.reacciones, color: '#60f0d0' },
  ];


  const datosTendencia = {
    semana: [
      { dia: 'Lun', publicaciones: 3, comentarios: 18, reacciones: 42 },
      { dia: 'Mar', publicaciones: 5, comentarios: 22, reacciones: 58 },
      { dia: 'Mié', publicaciones: 2, comentarios: 15, reacciones: 35 },
      { dia: 'Jue', publicaciones: 4, comentarios: 28, reacciones: 67 },
      { dia: 'Vie', publicaciones: 6, comentarios: 32, reacciones: 89 },
      { dia: 'Sáb', publicaciones: 3, comentarios: 19, reacciones: 54 },
      { dia: 'Dom', publicaciones: 1, comentarios: 8, reacciones: 42 },
    ],
    mes: [
      { dia: 'Sem 1', publicaciones: 12, comentarios: 85, reacciones: 210 },
      { dia: 'Sem 2', publicaciones: 15, comentarios: 98, reacciones: 267 },
      { dia: 'Sem 3', publicaciones: 18, comentarios: 112, reacciones: 298 },
      { dia: 'Sem 4', publicaciones: 14, comentarios: 95, reacciones: 245 },
    ],
    año: [
      { dia: 'Ene', publicaciones: 45, comentarios: 320, reacciones: 890 },
      { dia: 'Feb', publicaciones: 52, comentarios: 380, reacciones: 1020 },
      { dia: 'Mar', publicaciones: 48, comentarios: 350, reacciones: 950 },
    ]
  };


  useEffect(() => {
    setAnimacion(true);
  }, []);


  const totalInteracciones = datosInteracciones.reduce((sum, item) => sum + item.valor, 0);

  // Tarjeta de estadística individual
  const StatCard = ({ icon: Icon, titulo, valor, color, tendencia }) => (
    <div className='App' id='App'>
      <div className="bg-slate rounded-xl p-4 border hover:border-emerald-500 transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg bg-${color}/10`}>
            <Icon className={`text-${color} text-xl`} />
          </div>
          {tendencia && (
            <div className="flex items-center text-green-500 text-xs">
              <FaArrowUp className="mr-1 text-xs" />
              <span>{tendencia}%</span>
            </div>
          )}
        </div>
        <div className="text-2xl font-bold text-white">{valor}</div>
        <div className="text-gray-400 text-sm">{titulo}</div>
      </div>
    </div>
  );

  return (
      <div className="min-h-screen bg-gradient-to-br bg-slate p-6 font-sans">
        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setPantalla('perfil')}
              className="flex items-center gap-2 bg-slate hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 border hover:border-red-600"
            >

              <span>Volver al perfil</span>
            </button>

            <div className="flex gap-2 bg-slate p-1 rounded-lg border">
              {['semana', 'mes', 'año'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriodo(p)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${periodo === p
                    ? 'button text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#252836]'
                    }`}
                >
                  {p === 'semana' ? 'Semana' : p === 'mes' ? 'Mes' : 'Año'}
                </button>
              ))}
            </div>
          </div>


          <div className={`text-center mb-10 transform transition-all duration-700 ${animacion ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl font-bold highlight bg-clip-text mb-2">
              Panel de Estadísticas
            </h1>
            <p className="text-gray-400">Visualiza tu rendimiento y actividad</p>
          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={FaNewspaper} titulo="Publicaciones" valor={datosPrincipales.publicaciones} color="white" tendencia="+12" />
            <StatCard icon={FaComments} titulo="Comentarios" valor={datosPrincipales.comentarios} color="white" tendencia="+8" />
            <StatCard icon={FaHeart} titulo="Reacciones" valor={datosPrincipales.reacciones} color="pink-500" tendencia="+23" />
            <StatCard icon={FaHeart} titulo="Likes dados" valor={datosPrincipales.likesDados} color="pink-500" tendencia="+15" />

          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">


            <div className="bg-slate border-2 border rounded-xl p-6 hover:border-emerald-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Distribución de Interacciones</h3>
                <FaChartLine className="highlight text-xl" />
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={datosInteracciones}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      innerRadius={40}
                      dataKey="valor"
                      stroke="none"
                    >
                      {datosInteracciones.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1d26', border: '1px solid #2d4a41' }}
                      itemStyle={{ color: 'white' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4 flex-wrap">
                {datosInteracciones.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300 text-sm">{item.nombre}: {item.valor}</span>
                  </div>
                ))}
              </div>
            </div>


            <div className="bg-slate border-2 border rounded-xl p-6 hover:border-emerald-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-semibold">Evolución por {periodo === 'semana' ? 'día' : periodo === 'mes' ? 'semana' : 'mes'}</h3>
                <FaChartLine className="highlight text-xl" />
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datosTendencia[periodo]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d4a41" />
                    <XAxis dataKey="dia" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1d26', border: '1px solid #2d4a41' }}
                      labelStyle={{ color: 'white' }}
                    />
                    <Bar dataKey="reacciones" fill="#60f0d0" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="comentarios" fill="#bc69b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="publicaciones" fill="#f08060" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>


          <div className="bg-slate border-2 border rounded-xl p-6 hover:border-emerald-500 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-semibold">Tendencia de Actividad</h3>
              <FaChartLine className="highlight text-xl" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={datosTendencia[periodo]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d4a41" />
                  <XAxis dataKey="dia" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1d26', border: '1px solid #2d4a41' }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Line type="monotone" dataKey="reacciones" stroke="#60f0d0" strokeWidth={2} dot={{ fill: '#60f0d0' }} />
                  <Line type="monotone" dataKey="comentarios" stroke="#bc69b8" strokeWidth={2} dot={{ fill: '#bc69b8' }} />
                  <Line type="monotone" dataKey="publicaciones" stroke="#f08060" strokeWidth={2} dot={{ fill: '#f08060' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>


          <div className="mt-8 p-6 bg-slate rounded-xl border ">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm">Total de interacciones generadas</p>
                <p className="text-3xl font-bold text-white">{totalInteracciones}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
  );
};

export default Estadistica;