import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configurar Cloudinary con tus credenciales
cloudinary.config({
    cloud_name: process.env.ROOT,
    api_key: process.env.936615152173786,
    api_secret: process.env.AFTy2knzq_AEPF0oNsvCkjZ68s0
});

// Configurar el almacenamiento para multer
export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'carddial', // Carpeta donde se guardarán las imágenes
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [
            { width: 500, height: 500, crop: 'limit' }
        ]
    }
});

// Función para eliminar imágenes de Cloudinary
export const eliminarImagenCloudinary = async (publicId) => {
    try {
        if (!publicId) return false;
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Imagen eliminada de Cloudinary:', publicId, result);
        return result.result === 'ok';
    } catch (error) {
        console.error('Error eliminando de Cloudinary:', error);
        return false;
    }
};

export default cloudinary;