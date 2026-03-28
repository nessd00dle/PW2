import sharp from 'sharp';
import fs from 'fs';

export const optimizarImagen = async (inputPath, outputPath, width = 200, height = 200) => {
    try {
        console.log('🖼️ Optimizando imagen:', inputPath);
        
        if (!fs.existsSync(inputPath)) {
            throw new Error(`Archivo no encontrado: ${inputPath}`);
        }
        
        await sharp(inputPath)
            .resize(width, height, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 80 })
            .toFile(outputPath);
        
        // Eliminar el archivo original
        if (fs.existsSync(inputPath)) {
            fs.unlinkSync(inputPath);
        }
        
        console.log('✅ Imagen optimizada:', outputPath);
        return true;
    } catch (error) {
        console.error('❌ Error optimizando imagen:', error);
        return false;
    }
};

export const eliminarImagen = (imagePath) => {
    try {
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log('🗑️ Imagen eliminada:', imagePath);
            return true;
        }
        return false;
    } catch (error) {
        console.error('❌ Error eliminando imagen:', error);
        return false;
    }
};