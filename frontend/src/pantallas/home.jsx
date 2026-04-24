import React, { useEffect, useRef } from 'react';
import { 
  FaRocket, FaThLarge, FaChartBar, FaExchangeAlt, 
  FaTrophy, FaPaperPlane, FaHeart, FaComment,
  FaStar, FaFire, FaShieldAlt, FaGem, FaUsers,
  FaArrowRight, FaRegClock, FaRegEye, FaRegThumbsUp
} from 'react-icons/fa';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import logo from '/logo.png';

const Home = ({ setPantalla }) => {
  const swiperRef = useRef(null);
  const swiperRef2 = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
      });
    }

    if (swiperRef2.current) {
      const swiper2 = new Swiper(swiperRef2.current, {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.testimonial-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        loop: true,
      });
    }

    // Advanced Particle System
    class ParticleSystem {
      constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouseX = null;
        this.mouseY = null;
        this.resize();
        
        this.init();
        this.bindEvents();
        this.animate();
      }

      resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init();
      }

      bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
        });
      }

      init() {
        const particleCount = Math.min(150, Math.floor(window.innerWidth * 0.1));
        this.particles = [];
        for (let i = 0; i < particleCount; i++) {
          this.particles.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 4 + 1,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8,
            opacity: Math.random() * 0.5 + 0.2,
            color: this.getRandomColor(),
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
          });
        }
      }

      getRandomColor() {
        const colors = [
          'rgba(16, 185, 129, ',  // emerald
          'rgba(20, 184, 166, ',  // teal
          'rgba(6, 182, 212, ',   // cyan
          'rgba(139, 92, 246, ',  // purple
          'rgba(59, 130, 246, ',  // blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      drawStar(x, y, size, opacity, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.beginPath();
        
        const spikes = 4;
        const outerRadius = size;
        const innerRadius = size * 0.4;
        
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI * 2 * i) / (spikes * 2);
          const xPos = Math.cos(angle) * radius;
          const yPos = Math.sin(angle) * radius;
          if (i === 0) this.ctx.moveTo(xPos, yPos);
          else this.ctx.lineTo(xPos, yPos);
        }
        
        this.ctx.closePath();
        const colorValue = this.particles && this.particles[0] ? this.particles[0].color : 'rgba(16, 185, 129, ';
        this.ctx.fillStyle = colorValue.replace('rgba', 'rgba').replace(', ', `, ${opacity})`);
        this.ctx.fill();
        this.ctx.restore();
      }

      drawParticle(p) {
        this.ctx.save();
        this.ctx.globalAlpha = p.opacity;
        
        // Dibujar como estrella o círculo según tamaño
        if (p.size > 2.5) {
          this.drawStar(p.x, p.y, p.size, p.opacity, p.rotation);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fillStyle = p.color.replace('rgba', 'rgba').replace(', ', `, ${p.opacity})`);
          this.ctx.fill();
        }
        
        this.ctx.restore();
      }

      update() {
        for (let p of this.particles) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;
          
          // Wrap around edges
          if (p.x > this.canvas.width) p.x = 0;
          if (p.x < 0) p.x = this.canvas.width;
          if (p.y > this.canvas.height) p.y = 0;
          if (p.y < 0) p.y = this.canvas.height;
          
          // Mouse interaction
          if (this.mouseX && this.mouseY) {
            const dx = this.mouseX - p.x;
            const dy = this.mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              const angle = Math.atan2(dy, dx);
              const force = (100 - distance) / 1000;
              p.speedX -= Math.cos(angle) * force;
              p.speedY -= Math.sin(angle) * force;
              
              // Limit max speed
              const maxSpeed = 2;
              p.speedX = Math.min(Math.max(p.speedX, -maxSpeed), maxSpeed);
              p.speedY = Math.min(Math.max(p.speedY, -maxSpeed), maxSpeed);
            }
          }
        }
      }

      drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.15;
              this.ctx.beginPath();
              this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
              this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
              this.ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
              this.ctx.stroke();
            }
          }
        }
      }

      animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.update();
        this.drawConnections();
        
        for (let p of this.particles) {
          this.drawParticle(p);
        }
        
        requestAnimationFrame(() => this.animate());
      }
    }

    const canvas = document.getElementById('particlesCanvas');
    if (canvas) {
      const particleSystem = new ParticleSystem(canvas);
      return () => {
        // Cleanup if needed
      };
    }
  }, []);

 
  const cardImages = [
    "https://i.pinimg.com/736x/de/2e/b6/de2eb6fa73ee8ca0207f369c27d93a41.jpg",
    "https://i.pinimg.com/736x/7c/f3/6d/7cf36d83567dec998f39f71e282196a9.jpg",
    "https://i.pinimg.com/736x/56/a9/e9/56a9e9a90b944a89f2420792198d849a.jpg",
    "https://i.pinimg.com/736x/86/c8/43/86c843d39c75634618eab6599c86a5ea.jpg"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-x-hidden">
      
    
      <canvas id="particlesCanvas" className="fixed inset-0 pointer-events-none z-0"></canvas>
      
    
      <div className="relative z-10">
        
        
        <div className="relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="text-center mb-12" style={{animation: 'fade-in-up 0.8s ease-out'}}>
              <div className="inline-flex items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-50" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
                  <img src={logo} alt="CardDial Logo" className="relative w-16 h-16 md:w-20 md:h-20 object-contain" style={{animation: 'bounce-slow 3s ease-in-out infinite'}} />
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    CardDial
                  </h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto mt-2 rounded-full" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
                Conecta, comparte y colecciona. La comunidad definitiva para amantes de las cartas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setPantalla('auth')}
                  className="group px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 inline-flex items-center gap-2"
                >
                  <FaRocket className="text-xl group-hover:translate-x-1 transition-transform" /> Comienza Ahora
                </button>
                <button
                  onClick={() => setPantalla('auth')}
                  className="group px-8 py-3 bg-slate-800/80 backdrop-blur-sm border-2 border-emerald-400 text-emerald-400 font-bold rounded-full hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                >
                  <FaThLarge className="text-xl group-hover:rotate-12 transition-transform" /> Explorar Galería
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Cartas Destacadas con Swiper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 rounded-full px-4 py-2 mb-4">
              <FaFire className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Cartas Destacadas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Colecciones más impresionantes
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Descubre las cartas más valoradas por nuestra comunidad de coleccionistas
            </p>
          </div>

          <div className="swiper-container" ref={swiperRef}>
            <div className="swiper-wrapper">
              {[
                {
                  img: cardImages[0],
                  title: "Charizard VMAX",
                  author: "María González",
                  category: "Pokémon",
                  likes: 234,
                  comments: 45,
                  gradient: "from-yellow-400/20 to-amber-600/20",
                  border: "border-yellow-400/30"
                },
                {
                  img: cardImages[1],
                  title: "Dragón Blanco de Ojos Azules",
                  author: "Ana Martínez",
                  category: "Yu-Gi-Oh!",
                  likes: 187,
                  comments: 32,
                  gradient: "from-purple-400/20 to-pink-600/20",
                  border: "border-purple-400/30"
                },
                {
                  img: cardImages[2],
                  title: "Chandra, Torch of Defiance",
                  author: "Carlos Ruiz",
                  category: "Magic",
                  likes: 156,
                  comments: 28,
                  gradient: "from-blue-400/20 to-cyan-600/20",
                  border: "border-blue-400/30"
                },
                {
                  img: cardImages[3],
                  title: "Pikachu Ex",
                  author: "Laura Gómez",
                  category: "Pokémon",
                  likes: 312,
                  comments: 67,
                  gradient: "from-red-400/20 to-orange-600/20",
                  border: "border-red-400/30"
                }
              ].map((card, idx) => (
                <div key={idx} className="swiper-slide">
                  <div className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-4 backdrop-blur-sm border ${card.border} hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
                    <div className="relative group">
                      <img 
                        src={card.img} 
                        alt={card.title}
                        className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className={`absolute top-2 right-2 bg-gradient-to-r ${
                        card.category === 'Pokémon' ? 'from-emerald-500 to-teal-500' : 
                        card.category === 'Yu-Gi-Oh!' ? 'from-purple-500 to-pink-500' : 
                        'from-blue-500 to-cyan-500'
                      } text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg`}>
                        {card.category}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-bold text-white text-lg">{card.title}</h3>
                      <p className="text-gray-400 text-sm">Por: {card.author}</p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-3">
                          <span className="text-yellow-400 text-sm flex items-center gap-1">
                            <FaHeart className="text-xs" /> {card.likes}
                          </span>
                          <span className="text-emerald-400 text-sm flex items-center gap-1">
                            <FaComment className="text-xs" /> {card.comments}
                          </span>
                        </div>
                        <FaStar className="text-emerald-400 text-xs opacity-60" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-button-next !text-emerald-400 hover:!text-emerald-300 transition-colors"></div>
            <div className="swiper-button-prev !text-emerald-400 hover:!text-emerald-300 transition-colors"></div>
            <div className="swiper-pagination !bottom-[-2rem]"></div>
          </div>
        </div>

      
        <div className="bg-slate-800/30 py-20 my-10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-8 backdrop-blur-sm border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-500/20 rounded-xl">
                      <FaChartBar className="text-3xl text-emerald-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      Estadísticas en Vivo
                    </h2>
                  </div>
                  <p className="text-gray-300 mb-6 text-justify">
                    Visualiza los fandoms más activos, publicaciones destacadas y el ranking de coleccionistas en tiempo real. Nuestro sistema de análisis te muestra las tendencias más importantes de la comunidad.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all">
                      <div className="text-2xl font-bold text-emerald-400">3K+</div>
                      <div className="text-gray-400 text-xs">Publicaciones</div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all">
                      <div className="text-2xl font-bold text-emerald-400">500+</div>
                      <div className="text-gray-400 text-xs">Usuarios Activos</div>
                    </div>
                  </div>
                  <button className="group text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-2">
                    Ver Estadísticas Completas 
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-30" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
                  <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <FaFire className="text-emerald-400" />
                      <h3 className="text-xl font-bold text-white">Top Fandoms</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-2">
                          <span className="font-semibold">Pokémon TCG</span>
                          <span className="text-emerald-400">45%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full" style={{width: '45%', animation: 'slide-in 1s ease-out'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-2">
                          <span className="font-semibold">Yu-Gi-Oh!</span>
                          <span className="text-purple-400">30%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{width: '30%', animation: 'slide-in 1s ease-out'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-2">
                          <span className="font-semibold">Magic: The Gathering</span>
                          <span className="text-blue-400">25%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style={{width: '25%', animation: 'slide-in 1s ease-out'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Comunidad con cards interactivas mejoradas */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/90 transition-all duration-300">
                <div className="p-3 bg-emerald-500/20 rounded-xl w-fit mb-4">
                  <FaExchangeAlt className="text-4xl text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Modo Venta/Intercambio</h3>
                <p className="text-gray-300 mb-4 text-justify">
                  Publica tus cartas con precio para venta o etiquétalas para intercambio. 
                  ¡Negocia directamente con otros coleccionistas de forma segura!
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-semibold">Venta</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full font-semibold">Intercambio</span>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-slate-800/90 transition-all duration-300">
                <div className="p-3 bg-yellow-500/20 rounded-xl w-fit mb-4">
                  <FaTrophy className="text-4xl text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Ranking de Coleccionistas</h3>
                <p className="text-gray-300 mb-4 text-justify">
                  Sube en el ranking por tu actividad: publicaciones, comentarios y reacciones. 
                  Conviértete en el coleccionista más destacado de la comunidad.
                </p>
                <div className="flex items-center gap-2">
                  <FaGem className="text-yellow-400" />
                  <span className="text-gray-300 text-sm">Top coleccionistas reciben insignias exclusivas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonios con Swiper mejorado */}
        <div className="bg-gradient-to-t from-slate-800/50 to-transparent py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 rounded-full px-4 py-2 mb-4">
                <FaUsers className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Testimonios</span>
              </div>
              <h2 className="text-4xl font-bold text-white">
                Lo que dice nuestra comunidad
              </h2>
            </div>
            <div className="swiper-container" ref={swiperRef2}>
              <div className="swiper-wrapper">
                {[
                  {
                    img: "https://i.pinimg.com/736x/fd/07/d0/fd07d03737bddd7aebaee111acc692d5.jpg",
                    text: "Increíble plataforma para compartir mi colección de Pokémon. La comunidad es muy activa y siempre hay feedback positivo.",
                    name: "María González",
                    role: "Coleccionista Pokémon",
                    color: "emerald"
                  },
                  {
                    img: "https://i.pinimg.com/736x/c3/94/3f/c3943f7c9202e4d262c80b45256317f2.jpg",
                    text: "He hecho varios intercambios exitosos gracias a CardDial. ¡La mejor decisión unirme a esta comunidad!",
                    name: "Carlos Ruiz",
                    role: "Coleccionista Yu-Gi-Oh!",
                    color: "purple"
                  },
                  {
                    img: "https://i.pinimg.com/736x/bf/2b/33/bf2b33435d1bdc31fd48a1e6ecc3e346.jpg",
                    text: "Las estadísticas en tiempo real me ayudan a saber qué cartas son más populares. ¡Excelente herramienta!",
                    name: "Ana Martínez",
                    role: "Coleccionista Magic",
                    color: "blue"
                  }
                ].map((testimonial, idx) => (
                  <div key={idx} className="swiper-slide">
                    <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-slate-800/80 transition-all duration-300">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-${testimonial.color}-400 shadow-lg`}>
                        <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`inline text-${testimonial.color}-400 text-sm mx-0.5`} />
                        ))}
                      </div>
                      <p className="text-gray-300 italic mb-4 text-lg">
                        "{testimonial.text}"
                      </p>
                      <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                      <p className={`text-${testimonial.color}-400 text-sm font-semibold`}>{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="testimonial-pagination mt-8"></div>
            </div>
          </div>
        </div>

        {/* Call to Action final mejorado */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-3xl p-12 text-center border border-emerald-500/30 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 rounded-full px-4 py-2 mb-6">
                <FaShieldAlt className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Completamente Gratis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para comenzar tu colección?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Únete a miles de coleccionistas que ya comparten sus cartas y conectan con otros fans.
              </p>
              <button
                onClick={() => setPantalla('auth')}
                className="group px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 inline-flex items-center gap-2"
              >
                <FaPaperPlane className="group-hover:translate-x-1 transition-transform" /> Crear Cuenta Gratis
              </button>
            </div>
          </div>
        </div>

     
        <footer className="border-t border-gray-800 py-8 mt-8 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <img src={logo} alt="CardDial" className="w-8 h-8" />
                <span className="text-gray-400 font-bold">CardDial</span>
              </div>
              <div className="text-center text-gray-500 text-sm">
                <p>© 2026 CardDial - Conectando coleccionistas de todo el mundo.</p>
                
              </div>
              <div className="flex gap-4">
                <FaRegClock className="text-gray-600" />
                <FaRegEye className="text-gray-600" />
                <FaRegThumbsUp className="text-gray-600" />
              </div>
            </div>
          </div>
        </footer>
      </div>

      
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes slide-in {
          from {
            width: 0%;
          }
          to {
            width: var(--width, 100%);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          background: rgba(16, 185, 129, 0.1);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet {
          background: rgba(16, 185, 129, 0.5);
        }
        
        .swiper-pagination-bullet-active {
          background: rgb(16, 185, 129);
        }
      `}</style>
    </div>
  );
};

export default Home;