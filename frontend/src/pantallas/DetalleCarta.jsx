import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Layout/navbar';
import '../App.css'
import '../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../componentes/Toggle/ThemeOptions';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

const DetalleCarta = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carta = location.state?.carta;

  //Esto contiene el comentario que se creará (chris)
  const [comentario, setComentario] = useState('');

  //y este contiene los comentarios traidos de la BD y que le pertenecen a la publicacion (chris)
  const [comentarios, setComentarios] = useState([]);


  //Aqui ya se traen los comentarios
  const fetchComentarios = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/comentarios?idPublicacion=${carta.id}`
      );
      setComentarios(res.data.comentarios);
    } catch (error) {
      console.error('Error cargando comentarios:', error);
    }
  };

  useEffect(() => {
    if (carta?.id) fetchComentarios();
  }, [carta]);

  const handleEnviarComentario = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/comentarios",
        {
          idPublicacion: carta.id,
          texto: comentario
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchComentarios();
      setComentario(""); // limpiar input
      // opcional: recargar comentarios
    } catch (error) {
      console.error("Error enviando comentario:", error);
    }
  };


  return (
    <div className='App' id='App'>

      <div className="min-h-screen text-white font-sans p-4">

        <Navbar />


        <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-7xl mx-auto px-4">

          
          <button
            onClick={() => navigate('/ventas')}
            className="w-10 h-10 bg-slate rounded-full flex-shrink-0 flex items-center justify-center font-bold border hover:bg-red-600 transition-colors shadow-lg"
          >
            X
          </button>

          
          <div className="w-full md:w-[350px] min-h-[500px] border-2 border rounded-3xl bg-slate-900/40 flex items-center justify-center relative shadow-2xl">
            <div className="bg-slate px-6 py-3 rounded-xl border border">
              <span className="text-gray-300 font-bold text-sm uppercase tracking-widest italic text-center block">
                <img 
                  src={carta.image} 
                  alt={carta.description}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </span>
            </div>
          </div>

          {/* columna der */}
          <div className="w-full md:w-[420px] lg:w-[480px] flex flex-col gap-4 flex-shrink-0">

            {/* info de la carta */}
            <div className="border-2 border rounded-2xl p-6 bg-slate-900/60 relative shadow-xl">
              <div className="space-y-3 text-sm">
                <h2 className="text-2xl font-bold text-white mb-2">{carta.description}</h2>
                <div className="space-y-1">
                  <p className="text-xs">Precio: <span className="italic highlight">{carta.price}</span></p>
                  <p className="text-xs">Cantidad: <span className="text-white">{carta.cantidad}</span></p>
                  <p className="text-xs">Fandom: <span className="text-white">{carta.fandom}</span></p>
                </div>
                <div className="mt-4 pt-4 border-t border-">
                  <p className="font-bold highlight text-xs uppercase italic">Descripción:</p>
                  <p className="text-xs leading-relaxed mt-1">
                    {carta.reverse}
                  </p>
                </div>
              </div>

              {/* like */}
              <div className="mt-6">
                <button className="w-14 h-10 bg-slate border rounded-xl flex items-center justify-center hover:bg-pink-900/20 transition-all group">
                  <span className="text-pink-500 text-2xl group-hover:scale-125 transition-transform">♥</span>
                </button>
              </div>
            </div>

            {/* comentarios */}
            <div className="border-2 border rounded-2xl p-6 bg-slate-900/60 flex flex-col gap-4 shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest highlight">Comentarios</h3>

              {comentarios.map((c) => (
                <div key={c._id} className="bg-[#2d2a3e]/60 p-4 rounded-2xl flex items-start gap-3 border border">
                  <div className="w-8 h-8 bg-[#56ab91] rounded-full shrink-0 border-2 border"></div>
                  <div>
                    <span className="text-[10px] font-bold highlight block">
                      {c.idUsuario?.nickname || 'Usuario'}
                    </span>
                    <p className="text-xs text-gray-200">{c.texto}</p>
                  </div>
                </div>
              ))}

              {/* escribir comentario */}
              <div className="mt-2 border-2 border-dashed border rounded-2xl p-4 flex items-center gap-3 bg-black/30 focus-within:border transition-colors">
                <div className="w-8 h-8 bg-slate-700 rounded-full shrink-0"></div>
                <input
                  type="text"
                  placeholder="Escribir comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-xs placeholder-gray-600 text-white"
                />
                <button onClick={handleEnviarComentario} className="primary-text hover:scale-125 transition-transform">➤</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCarta;