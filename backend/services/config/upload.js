import multer from 'multer';
import { storage, eliminarImagenCloudinary } from './cloudinary.js';
import path from 'path';
import fs from 'fs';


const usarCloudinary = process.env.NODE_ENV === 'production' && process.env.CLOUDINARY_CLOUD_NAME;


const getUploadsBase = () => {
    if (process.env.NODE_ENV !== 'production') {
        return path.join(process.cwd(), 'uploads');
    }
    return '/tmp/uploads';
};

const UPLOADS_BASE = getUploadsBase();

export const DIRECTORIOS = {
    perfiles: usarCloudinary ? null : path.join(UPLOADS_BASE, 'perfiles'),
    publicaciones: usarCloudinary ? null : path.join(UPLOADS_BASE, 'publicaciones'),
    cartas: usarCloudinary ? null : path.join(UPLOADS_BASE, 'cartas')
};

// Filtro común para imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WEBP)'));
    }
};

// Configuración de multer para Cloudinary
const cloudinaryMulter = (maxCount = 1) => {
    return multer({
        storage: storage,
        limits: { fileSize: 5 * 1024 * 1024, files: maxCount },
        fileFilter: fileFilter
    });
};

// Configuración de multer para desarrollo local
const localMulter = (tipo, maxCount = 1) => {
    // Crear directorios si no existen
    if (DIRECTORIOS[tipo] && !fs.existsSync(DIRECTORIOS[tipo])) {
        fs.mkdirSync(DIRECTORIOS[tipo], { recursive: true });
    }
    
    const diskStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, DIRECTORIOS[tipo]);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const ext = path.extname(file.originalname);
            const prefix = tipo === 'perfiles' ? 'perf' : (tipo === 'publicaciones' ? 'pub' : 'carta');
            cb(null, `${prefix}-${uniqueSuffix}${ext}`);
        }
    });
    
    return multer({
        storage: diskStorage,
        limits: { fileSize: 5 * 1024 * 1024, files: maxCount },
        fileFilter: fileFilter
    });
};

// Exportar middlewares según el entorno
export const uploadPerfil = usarCloudinary 
    ? cloudinaryMulter(1).single('fotoPerfil')
    : localMulter('perfiles', 1).single('fotoPerfil');

export const uploadPublicacion = usarCloudinary
    ? cloudinaryMulter(10).array('imagenes', 10)
    : localMulter('publicaciones', 10).array('imagenes', 10);

export const uploadCartas = usarCloudinary
    ? cloudinaryMulter(20).array('cartas', 20)
    : localMulter('cartas', 20).array('cartas', 20);

// Middleware para publicaciones
export const uploadPublicacionImages = (req, res, next) => {
    uploadPublicacion(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === 'FILE_TOO_LARGE') {
                    return res.status(400).json({
                        success: false,
                        message: 'El archivo es demasiado grande. Máximo 5MB'
                    });
                }
                if (err.code === 'LIMIT_FILE_COUNT') {
                    return res.status(400).json({
                        success: false,
                        message: 'Máximo 10 imágenes por publicación'
                    });
                }
            }
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        
        if (req.files && req.files.length > 0) {
            console.log(` ${req.files.length} imágenes subidas`);
            
            if (usarCloudinary) {
                req.files = req.files.map(f => ({
                    ...f,
                    url: f.path, 
                    filename: f.filename
                }));
            }
        }
        
        next();
    });
};

console.log(`📁 Configuración de uploads: ${usarCloudinary ? 'Cloudinary (PRODUCCIÓN)' : 'Sistema local (DESARROLLO)'}`);