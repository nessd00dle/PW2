import Comentario from '../models/comentarioModel.js';
import Publicacion from '../models/publiModel.js';

// Obtener comentarios de una publicación
export const obtenerComentarios = async (req, res) => {
    try {
        const { idPublicacion } = req.query; 
        const { pagina = 1, limite = 20 } = req.query;
        
        const resultado = await Comentario.obtenerPorPublicacion(
            idPublicacion,
            parseInt(limite),
            parseInt(pagina)
        );
        
        res.json({
            success: true,
            ...resultado
        });
    } catch (error) {
        console.error('Error obteniendo comentarios:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Crear comentario
export const crearComentario = async (req, res) => {
    try {
        const { idPublicacion, texto, comentarioPadre } = req.body;
        const usuarioId = req.usuario.id;
        
        // Verificar que la publicación existe
        const publicacion = await Publicacion.findById(idPublicacion);
        if (!publicacion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publicación no encontrada' 
            });
        }
        
        const comentario = new Comentario({
            idUsuario: usuarioId,
            idPublicacion,
            texto: texto.trim(),
            esRespuesta: !!comentarioPadre,
            comentarioPadre: comentarioPadre || null
        });
        
        await comentario.save();
        
        // Si es respuesta, agregar al padre
        if (comentarioPadre) {
            const comentarioPadreDoc = await Comentario.findById(comentarioPadre);
            if (comentarioPadreDoc) {
                await comentarioPadreDoc.agregarRespuesta(comentario._id);
            }
        }
        
        await comentario.populate('idUsuario', 'nombre nickname fotoPerfil');
        
        // También agregar comentario a la publicación (para compatibilidad con modelo existente)
        publicacion.Comentarios.push({
            Idusuario: usuarioId,
            Texto: texto,
            Fecha: new Date()
        });
        await publicacion.save();
        
        res.status(201).json({
            success: true,
            message: 'Comentario agregado exitosamente',
            comentario
        });
    } catch (error) {
        console.error('Error creando comentario:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};



// Eliminar comentario-no hay esa opcion en el fronten, pero se deja para futuras implementaciones (como eliminar comentario por parte del admin o el mismo usuario)
export const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;
        
        const comentario = await Comentario.findById(id);
        
        if (!comentario) {
            return res.status(404).json({ 
                success: false, 
                message: 'Comentario no encontrado' 
            });
        }
        
        // Verificar permisos
        if (comentario.idUsuario.toString() !== usuarioId && req.usuario.rol !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'No tienes permiso para eliminar este comentario' 
            });
        }
        
        comentario.activo = false;
        await comentario.save();
        
        res.json({
            success: true,
            message: 'Comentario eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error eliminando comentario:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const toggleLikeComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;

        const comentario = await Comentario.findById(id);

        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        await comentario.toggleLike(usuarioId);

        res.json({
            success: true,
            message: 'Like actualizado',
            meGusta: comentario.meGusta
        });

    } catch (error) {
        console.error('Error en like de comentario:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};