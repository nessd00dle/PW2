import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';

import connectDB from "./config/dbClient.js";  
import usuarioRoutes from "./routes/usuarioRoutes.js";  
import publiRoutes from "./routes/publiRoutes.js";
import reaccionRoutes from './routes/reaccionRoutes.js';
import franquiciaRoutes from "./routes/franquiciaRoutes.js";
import comentarioRoutes from "./routes/comentarioRoutes.js";
import cartaRoutes from "./routes/cartaRoutes.js";
import coleccionRoutes from "./routes/coleccionRoutes.js";
import reporteRoutes from './routes/reporteRoutes.js';
import estadisticaRoutes from './routes/estadisticaRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

const app = express();

// ============================================
// CONEXIÓN A MONGODB
// ============================================
connectDB();

// ============================================
// CONFIGURACIÓN CORS (para producción)
// ============================================
const allowedOrigins = [
    'http://localhost:5000',
    'http://localhost:3000',
    'https://carddial.com',
    'https://www.carddial.com',
    'https://pw-2-v3vq.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // Permitir requests sin origin (como Postman o mobile apps)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            console.log('⚠️ Origen bloqueado por CORS:', origin);
            callback(null, true); // Temporalmente permitimos todos para pruebas
        }
    },
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uploadsPath = process.env.UPLOADS_PATH || path.join(__dirname, 'uploads');


console.log(` Directorio actual: ${__dirname}`);
console.log(` Ruta de uploads: ${uploadsPath}`);
console.log(` Puerto: ${process.env.PORT || 3000}`);
console.log(` MongoDB: ${process.env.MONGODB_URI ? ' Conectada' : ' No configurada'}`);
console.log(` Entorno: ${process.env.NODE_ENV || 'development'}`);
console.log('========================================\n');

// Crear directorio uploads si no existe
if (!fs.existsSync(uploadsPath)) {
    console.log('📁 Creando directorio uploads...');
    fs.mkdirSync(uploadsPath, { recursive: true });
    
    const subdirs = ['cartas', 'perfiles', 'publicaciones'];
    subdirs.forEach(dir => {
        const subPath = path.join(uploadsPath, dir);
        if (!fs.existsSync(subPath)) {
            fs.mkdirSync(subPath, { recursive: true });
            console.log(`   ✅ Creado: ${subPath}`);
        }
    });
    
    const cartasSubdirs = ['imagesPokemon', 'imagesMagic', 'imagesDB', 'imagesYugioh', 'imagesDigimon'];
    cartasSubdirs.forEach(subdir => {
        const subPath = path.join(uploadsPath, 'cartas', subdir);
        if (!fs.existsSync(subPath)) {
            fs.mkdirSync(subPath, { recursive: true });
            console.log(`   ✅ Creado: ${subPath}`);
        }
    });
}

// Servir archivos estáticos
app.use('/uploads', express.static(uploadsPath));
app.use('/uploads/cartas', express.static(path.join(uploadsPath, 'cartas')));
app.use('/uploads/perfiles', express.static(path.join(uploadsPath, 'perfiles')));
app.use('/uploads/publicaciones', express.static(path.join(uploadsPath, 'publicaciones')));
app.use('/imagesPokemon', express.static(path.join(uploadsPath, 'cartas', 'imagesPokemon')));
app.use('/imagesMagic', express.static(path.join(uploadsPath, 'cartas', 'imagesMagic')));
app.use('/imagesDB', express.static(path.join(uploadsPath, 'cartas', 'imagesDB')));
app.use('/imagesYugioh', express.static(path.join(uploadsPath, 'cartas', 'imagesYugioh')));
app.use('/imagesDigimon', express.static(path.join(uploadsPath, 'cartas', 'imagesDigimon')));

// ============================================
// RUTA PRINCIPAL (¡IMPORTANTE PARA RAILWAY!)
// ============================================
app.get('/', (req, res) => {
    res.json({
        nombre: 'CardDial Backend API',
        version: '1.0.0',
        estado: '🟢 Funcionando correctamente',
        endpoints_disponibles: {
            test: '/test',
            api: {
                publicaciones: '/api/publicaciones',
                usuarios: '/api/usuarios',
                franquicias: '/api/franquicias',
                cartas: '/api/cartas',
                colecciones: '/api/colecciones',
                reportes: '/api/reportes',
                estadisticas: '/api/estadisticas'
            }
        },
        documentacion: 'https://carddial.com/api/usuarios',
        entorno: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});


app.get('/test', (req, res) => {
    res.json({ 
        mensaje: ' Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        entorno: process.env.NODE_ENV
    });
});


app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Rutas de debug (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
    app.get('/debug/imagen/:ruta', (req, res) => {
        const rutaCompleta = path.join(uploadsPath, 'cartas', req.params.ruta);
        const existe = fs.existsSync(rutaCompleta);
        res.json({
            buscado: req.params.ruta,
            rutaCompleta: rutaCompleta,
            existe: existe,
            uploadsPath: uploadsPath
        });
    });

    app.get('/debug/listar-imagenes', (req, res) => {
        const cartasPath = path.join(uploadsPath, 'cartas');
        const resultado = {};
        if (fs.existsSync(cartasPath)) {
            const carpetas = fs.readdirSync(cartasPath);
            carpetas.forEach(carpeta => {
                const carpetaPath = path.join(cartasPath, carpeta);
                if (fs.statSync(carpetaPath).isDirectory()) {
                    resultado[carpeta] = fs.readdirSync(carpetaPath);
                }
            });
        }
        res.json({
            uploadsPath: uploadsPath,
            cartasPath: cartasPath,
            imagenes: resultado
        });
    });
}

// ============================================
// RUTAS DE LA API
// ============================================
app.use('/api/publicaciones', publiRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/franquicias', franquiciaRoutes);
app.use('/api/publicaciones/:idPublicacion/comentarios', comentarioRoutes);
app.use('/api/cartas', cartaRoutes);
app.use('/api/colecciones', coleccionRoutes);
app.use('/api/publicaciones/:idPublicacion/reacciones', reaccionRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/estadisticas', estadisticaRoutes);

// ============================================
// MANEJADOR DE ERROR 404 (si no coincide ninguna ruta)
// ============================================
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        mensaje: `La ruta ${req.method} ${req.url} no existe en el servidor`,
        rutas_validas: [
            '/',
            '/test',
            '/health',
            '/api/publicaciones',
            '/api/usuarios',
            '/api/franquicias',
            '/api/cartas'
        ]
    });
});

// ============================================
// MANEJADOR DE ERRORES GLOBAL
// ============================================
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        mensaje: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error inesperado'
    });
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n========================================`);
    console.log(`✅ SERVIDOR INICIADO CORRECTAMENTE`);
    console.log(`========================================`);
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 URL base: https://hearty-wonder.up.railway.app`);
    console.log(`🧪 Probar ruta test: https://hearty-wonder.up.railway.app/test`);
    console.log(`========================================\n`);
});