import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../componentes/Layout/navbar';
import Avatar from '../componentes/Avatar'; 
import '../App.css'
import '../pantallas/index.css'
import useLocalStorage from 'use-local-storage';
import ThemeOption from '../componentes/Toggle/ThemeOptions';


import axios from 'axios';
import { useLocation } from 'react-router-dom';

const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

const DetalleCarta = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const rutaFotoPerfil="http://localhost:3000";

  //Para traer la publicacion (chris)
  const { id } = useParams();
  const [Publicacion, setPublicacion] = useState( null);

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/publicaciones/${id}`
        );

        const p = res.data.publicacion;

        const publicacionMapeada = {
          id: p._id,
          titulo: p.Titulo,
          descripcion: p.Texto,
          precio: p.Monto,
          cantidad: p.Cantidad,
          fandom: p.Franquicia?.nombre || "Sin franquicia",
          imagen: p.fotosUrls?.[0] || null,
          imagenes: p.fotosUrls || [],
          usuario: {
            id: p.Idusuario?._id,
            nombre: p.Idusuario?.nombre,
            nickname: p.Idusuario?.nickname,
            foto: p.Idusuario?.fotoPerfil
          }
        };

        setPublicacion(publicacionMapeada);    

      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchPublicacion();
  }, [id]);


  //Esto contiene el comentario que se creará (chris)
  const [comentario, setComentario] = useState('');

  //y este contiene los comentarios traidos de la BD y que le pertenecen a la publicacion (chris)
  const [comentarios, setComentarios] = useState([]);


  //Aqui ya se traen los comentarios
  const fetchComentarios = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/comentarios?idPublicacion=${id}`
      );
      
      const comentariosMapeados = res.data.comentarios.map(c => ({
        id: c._id,
        texto: c.texto,
        fecha: c.createdAt,
        usuario: {
          id: c.idUsuario?._id,
          nickname: c.idUsuario?.nickname,
          foto: c.idUsuario?.fotoPerfil
        }
        
      }));

      setComentarios(comentariosMapeados);

    } catch (error) {
      console.error('Error cargando comentarios:', error);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString();
  };

  useEffect(() => {
    if (id) fetchComentarios();
  }, [id]);

  const handleEnviarComentario = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/comentarios",
        {
          idPublicacion: Publicacion.id,
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


  //Para likes
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);

  const handleLike = () => {
    let newLiked = !liked;
    let newLikesCount = newLiked ? likesCount + 1 : likesCount - 1;
    
    setLiked(newLiked);
    setLikesCount(newLikesCount);
    
    if (usuario && usuario.id && Publicacion.id) {
      const savedLikes = localStorage.getItem(`Publicacion_likes_${usuario.id}`);
      const likesState = savedLikes ? JSON.parse(savedLikes) : {};
      likesState[Publicacion.id] = newLiked;
      localStorage.setItem(`Publicacion_likes_${usuario.id}`, JSON.stringify(likesState));
    }
  };

  

  if (!Publicacion) {
    return <div className="text-white p-4">Cargando publicación...</div>;
  }

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
                  src={Publicacion.imagen} 
                  alt={Publicacion.titulo}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </span>
            </div>
          </div>

          {/* columna der */}
          <div className="w-full md:w-[420px] lg:w-[480px] flex flex-col gap-4 flex-shrink-0">

            {/* info de la Publicacion */}
            <div className="border-2 border rounded-2xl p-6 bg-slate-900/60 relative shadow-xl">
              <div className="space-y-3 text-sm">
                <h2 className="text-2xl font-bold text-white mb-2">{Publicacion.titulo}</h2>
                <div className="space-y-1">
                  <p className="text-xs">Precio: <span className="italic highlight">${Publicacion.precio}</span></p>
                  <p className="text-xs">Cantidad: <span className="text-white">{Publicacion.cantidad}</span></p>
                  <p className="text-xs">Fandom: <span className="text-white">{Publicacion.fandom}</span></p>
                </div>
                <div className="mt-4 pt-4 border-t border-">
                  <p className="font-bold highlight text-xs uppercase italic">Descripción:</p>
                  <p className="text-xs leading-relaxed mt-1">
                    {Publicacion.descripcion}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={handleLike}
                  className="w-14 h-10 bg-slate border rounded-xl flex items-center justify-center hover:bg-pink-900/20 transition-all group"
                >
                  <span className={`text-2xl group-hover:scale-125 transition-transform ${liked ? 'text-pink-500' : 'text-gray-400'}`}>
                    {liked ? '❤️' : '🤍'}
                  </span>
                </button>
                <span className="ml-2 text-xs text-gray-400">{likesCount} me gusta</span>
              </div>
            </div>

            <div className="border-2 border rounded-2xl p-6 bg-slate-900/60 flex flex-col gap-4 shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest highlight">
                Comentarios ({comentarios.length})
              </h3>

              <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                {comentarios.map((c) => (
                  <div key={c.id} className={`p-4 rounded-2xl flex items-start gap-3 border ${
                      c.usuario?.id === usuario?.id 
                      ? 'bg-emerald-900/20 border-emerald-500/50' 
                      : 'bg-[#2d2a3e]/60 border-gray-700'
                    }`}>

                    {/* Usar componente Avatar */}
                    <div className="w-8 h-8 shrink-0">
                      <Avatar
                        fotoPerfil= {rutaFotoPerfil + c.usuario.foto}
                        nombre={c.usuario.nickname}
                        size="w-full h-full"
                        textSize="text-xs"
                        borderColor="border-emerald-500"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold highlight block">
                          {c.usuario?.nickname || 'Usuario'}

                          {c.usuario?.id === usuario?.id && (
                            <span className="ml-2 text-emerald-400 text-[8px]">(Tú)</span>
                          )}
                        </span>
                        {c.fecha && (
                          <span className="text-[8px] text-gray-500">{formatearFecha(c.fecha)}</span>
                        )}

                      </div>
                      {/* Texto del comentario JUSTIFICADO */}
                      <p className="text-xs text-gray-200 mt-1 text-justify">{c.texto}</p>
                      {/* Alternativa con estilos en línea:
                      <p style={{ fontSize: '0.75rem', color: '#e5e7eb', marginTop: '0.25rem', textAlign: 'justify', lineHeight: '1.4' }}>
                        {comentario.texto}
                      </p>
                      */}
                    </div>
                  </div>
                ))}
              </div>
              

              <form onSubmit={handleEnviarComentario} className="mt-2 border-2 border-dashed border rounded-2xl p-4 flex items-center gap-3 bg-black/30 focus-within:border-emerald-500 transition-colors">
               
                <div className="w-8 h-8 shrink-0">
                  <Avatar
                    fotoPerfil={usuario?.fotoPerfil}
                    nombre={usuario?.nombre}
                    size="w-full h-full"
                    textSize="text-xs"
                    borderColor="border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder={`Comentar como ${usuario?.nombre || usuario?.correo?.split('@')[0] || 'Usuario'}...`}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-xs placeholder-gray-600 text-white"
                />
                <button type="submit" className="primary-text hover:scale-125 transition-transform">➤</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default DetalleCarta;