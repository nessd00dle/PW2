import Reaccion from '../models/reaccionModel.js';
import Publicacion from '../models/publiModel.js';

// Obtener reacciones de una publicación
export const obtenerReacciones = async (req, res) => {
    try {
        const { idPublicacion } = req.params;
        
        const resultado = await Reaccion.obtenerPorPublicacion(idPublicacion);
        
        res.json({
            success: true,
            ...resultado
        });
    } catch (error) {
        console.error('Error obteniendo reacciones:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Crear o actualizar reacción
export const reaccionar = async (req, res) => {
    try {
        const { idPublicacion } = req.params;
        const { tipo = 'like' } = req.body;
        const usuarioId = req.usuario.id;
        
        // Verificar que la publicación existe
        const publicacion = await Publicacion.findById(idPublicacion);
        if (!publicacion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publicación no encontrada' 
            });
        }
        
        // Buscar si ya existe reacción
        let reaccion = await Reaccion.findOne({
            idPublicacion,
            idUsuario: usuarioId
        });
        
        if (reaccion) {
            // Si ya existe, actualizar tipo
            if (reaccion.tipo === tipo) {
                // Si es el mismo tipo, eliminar reacción
                await reaccion.deleteOne();
                
                // Actualizar contador de la publicación
                publicacion.MeGusta = Math.max(0, publicacion.MeGusta - 1);
                const index = publicacion.UsuariosMeGusta.indexOf(usuarioId);
                if (index !== -1) publicacion.UsuariosMeGusta.splice(index, 1);
                await publicacion.save();
                
                return res.json({
                    success: true,
                    message: 'Reacción eliminada',
                    reaccion: null
                });
            } else {
                // Cambiar tipo
                await reaccion.cambiarTipo(tipo);
            }
        } else {
            // Crear nueva reacción
            reaccion = new Reaccion({
                idPublicacion,
                idUsuario: usuarioId,
                tipo
            });
            await reaccion.save();
            
            // Actualizar contador de la publicación (para compatibilidad)
            publicacion.MeGusta += 1;
            publicacion.UsuariosMeGusta.push(usuarioId);
            await publicacion.save();
        }
        
        await reaccion.populate('idUsuario', 'nombre nickname fotoPerfil');
        
        res.json({
            success: true,
            message: 'Reacción agregada',
            reaccion
        });
    } catch (error) {
        console.error('Error al reaccionar:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Obtener mi reacción a una publicación
export const obtenerMiReaccion = async (req, res) => {
    try {
        const { idPublicacion } = req.params;
        const usuarioId = req.usuario.id;
        
        const reaccion = await Reaccion.findOne({
            idPublicacion,
            idUsuario: usuarioId
        });
        
        res.json({
            success: true,
            reaccion: reaccion ? reaccion.tipo : null
        });
    } catch (error) {
        console.error('Error obteniendo reacción:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};