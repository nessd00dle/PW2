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

dotenv.config();

const app = express();

// Conectar a MongoDB
connectDB();

// Configurar CORS para producción
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL || 'https://tu-frontend.vercel.app'
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log('Origen bloqueado por CORS:', origin);
            callback(null, true);
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas de archivos estáticos - CORREGIDO
const uploadsPath = process.env.UPLOADS_PATH || path.join(__dirname, 'uploads');

console.log('========================================');
console.log('CONFIGURACION DE SERVIDOR');
console.log('========================================');
console.log('Directorio actual:', __dirname);
console.log('Ruta de uploads:', uploadsPath);
console.log('Puerto:', process.env.PORT || 3000);
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Configurada ✅' : 'No configurada ❌');

// Crear directorio uploads si no existe (para producción)
if (!fs.existsSync(uploadsPath)) {
    console.log('Creando directorio uploads...');
    fs.mkdirSync(uploadsPath, { recursive: true });
    
    const subdirs = ['cartas', 'perfiles', 'publicaciones'];
    subdirs.forEach(dir => {
        const subPath = path.join(uploadsPath, dir);
        if (!fs.existsSync(subPath)) {
            fs.mkdirSync(subPath, { recursive: true });
            console.log(`Directorio creado: ${subPath}`);
        }
    });
    
    const cartasSubdirs = ['imagesPokemon', 'imagesMagic', 'imagesDB', 'imagesYugioh', 'imagesDigimon'];
    cartasSubdirs.forEach(subdir => {
        const subPath = path.join(uploadsPath, 'cartas', subdir);
        if (!fs.existsSync(subPath)) {
            fs.mkdirSync(subPath, { recursive: true });
            console.log(`Directorio creado: ${subPath}`);
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

// Rutas de debug (solo para desarrollo)
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

    app.get('/debug/usuario/:id', async (req, res) => {
        try {
            const Usuario = (await import('./models/Usuario.js')).default;
            const usuario = await Usuario.findById(req.params.id).select('nombre nickname fotoPerfil');
            res.json({
                id: usuario._id,
                nombre: usuario.nombre,
                nickname: usuario.nickname,
                fotoPerfil: usuario.fotoPerfil,
                urlCompleta: `${process.env.BACKEND_URL || 'http://localhost:3000'}${usuario.fotoPerfil}`
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}

// Rutas de la API
app.use('/api/publicaciones', publiRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/franquicias', franquiciaRoutes);
app.use('/api/publicaciones/:idPublicacion/comentarios', comentarioRoutes);
app.use('/api/cartas', cartaRoutes);
app.use('/api/colecciones', coleccionRoutes);
app.use('/api/publicaciones/:idPublicacion/reacciones', reaccionRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/estadisticas', estadisticaRoutes);

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});

// Manejador de errores 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(` Servidor corriendo en puerto ${PORT}`);
    console.log(` Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`========================================\n`);
});