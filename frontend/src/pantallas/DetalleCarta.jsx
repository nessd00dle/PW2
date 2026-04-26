import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../componentes/Layout/navbar';
import Avatar from '../componentes/Avatar'; 
import '../App.css'
import '../pantallas/index.css'

const DetalleCarta = () => {
  const navigate = useNavigate();
  const { tipo, id } = useParams();
  const { usuario } = useAuth();
  
  const [carta, setCarta] = useState({
    id: id || 1,
    nombre: "Pikachu",
    precio: "$1500.00",
    cantidad: 1,
    fandom: "Pokémon",
    descripcion: "Pikachu, el Pokémon Ratón. Es conocido por sus mejillas eléctricas y su personalidad amigable. Esta carta es extremadamente rara y buscada por coleccionistas de todo el mundo.",
    imagen: "https://i.pinimg.com/736x/65/ca/29/65ca29f9b651507b5d7f22e026efd934.jpg",
    likesCount: 42
  });
  
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(42);
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      usuario: "reyna:3",
      usuarioId: "user123",
      texto: "wooow q bonita, me encanta",
      avatar: "https://i.pravatar.cc/150?img=3",
      timestamp: "Hace 2 horas"
    },
    {
      id: 2,
      usuario: "CarlosRuiz",
      usuarioId: "user456",
      texto: "Excelente carta, la tengo en mi colección también",
      avatar: "https://i.pravatar.cc/150?img=8",
      timestamp: "Hace 1 día"
    }
  ]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  useEffect(() => {
    if (usuario && usuario.id && carta.id) {
      const savedLikes = localStorage.getItem(`carta_likes_${usuario.id}`);
      if (savedLikes) {
        const parsedLikes = JSON.parse(savedLikes);
        if (parsedLikes[carta.id]) {
          setLiked(true);
        }
      }
    }
  }, [usuario, carta.id]);

  const handleLike = () => {
    let newLiked = !liked;
    let newLikesCount = newLiked ? likesCount + 1 : likesCount - 1;
    
    setLiked(newLiked);
    setLikesCount(newLikesCount);
    
    if (usuario && usuario.id && carta.id) {
      const savedLikes = localStorage.getItem(`carta_likes_${usuario.id}`);
      const likesState = savedLikes ? JSON.parse(savedLikes) : {};
      likesState[carta.id] = newLiked;
      localStorage.setItem(`carta_likes_${usuario.id}`, JSON.stringify(likesState));
    }
  };

  const handleComentario = (e) => {
    e.preventDefault();
    if (nuevoComentario.trim() && usuario) {
      const nuevoComentarioObj = {
        id: Date.now(),
        usuario: usuario.nombre || usuario.correo?.split('@')[0] || "Usuario",
        usuarioId: usuario.id,
        texto: nuevoComentario,
        avatar: usuario.fotoPerfil, // Guardamos el path de la foto
        timestamp: "Ahora mismo"
      };
      setComentarios([...comentarios, nuevoComentarioObj]);
      setNuevoComentario('');
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

          <div className="w-full md:w-[350px] min-h-[500px] border-2 border rounded-3xl bg-slate-900/40 flex items-center justify-center relative shadow-2xl overflow-hidden">
            <img 
              src={carta.imagen} 
              alt={carta.nombre}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/350x500?text=Imagen+no+disponible";
              }}
            />
          </div>

          <div className="w-full md:w-[420px] lg:w-[480px] flex flex-col gap-4 flex-shrink-0">
            <div className="border-2 border rounded-2xl p-6 bg-slate-900/60 relative shadow-xl">
              <div className="space-y-3 text-sm">
                <h2 className="text-2xl font-bold text-white mb-2">{carta.nombre}</h2>
                <div className="space-y-1">
                  <p className="text-xs">Precio: <span className="italic highlight">{carta.precio}</span></p>
                  <p className="text-xs">Cantidad: <span className="text-white">{carta.cantidad}</span></p>
                  <p className="text-xs">Fandom: <span className="text-white">{carta.fandom}</span></p>
                </div>
                <div className="mt-4 pt-4 border-t border-">
                  <p className="font-bold highlight text-xs uppercase italic">Descripción:</p>
                  <p className="text-xs leading-relaxed mt-1">
                    {carta.descripcion}
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
                {comentarios.map((comentario) => (
                  <div 
                    key={comentario.id} 
                    className={`p-4 rounded-2xl flex items-start gap-3 border ${
                      comentario.usuarioId === usuario?.id 
                        ? 'bg-emerald-900/20 border-emerald-500/50' 
                        : 'bg-[#2d2a3e]/60 border-gray-700'
                    }`}
                  >
                    {/* Usar componente Avatar */}
                    <div className="w-8 h-8 shrink-0">
                      <Avatar
                        fotoPerfil={comentario.avatar}
                        nombre={comentario.usuario}
                        size="w-full h-full"
                        textSize="text-xs"
                        borderColor="border-emerald-500"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold highlight block">
                          {comentario.usuario}
                          {comentario.usuarioId === usuario?.id && (
                            <span className="ml-2 text-emerald-400 text-[8px]">(Tú)</span>
                          )}
                        </span>
                        {comentario.timestamp && (
                          <span className="text-[8px] text-gray-500">{comentario.timestamp}</span>
                        )}
                      </div>
                      {/* Texto del comentario JUSTIFICADO */}
                      <p className="text-xs text-gray-200 mt-1 text-justify">{comentario.texto}</p>
                      {/* Alternativa con estilos en línea:
                      <p style={{ fontSize: '0.75rem', color: '#e5e7eb', marginTop: '0.25rem', textAlign: 'justify', lineHeight: '1.4' }}>
                        {comentario.texto}
                      </p>
                      */}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleComentario} className="mt-2 border-2 border-dashed border rounded-2xl p-4 flex items-center gap-3 bg-black/30 focus-within:border-emerald-500 transition-colors">
               
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
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  placeholder={`Comentar como ${usuario?.nombre || usuario?.correo?.split('@')[0] || 'Usuario'}...`}
                  className="bg-transparent flex-1 outline-none text-xs placeholder-gray-600 text-white"
                />
                <button 
                  type="submit"
                  className="primary-text hover:scale-125 transition-transform text-emerald-400"
                >
                  ➤
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCarta;