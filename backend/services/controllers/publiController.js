import Publicacion from '../models/publiModel.js';
import Usuario from '../models/usuarioModel.js';
import { optimizarMultiplesImagenes, eliminarMultiplesImagenes } from '../utils/imageUtils.js';

// Crear nueva publicación
export const crearPublicacion = async (req, res) => {
    try {
        console.log('=== CREANDO PUBLICACIÓN ===');
        console.log('Body:', req.body);
        console.log('Files:', req.files ? req.files.length : 0);
        
        const {
            Titulo,
            Texto,
            Tipo,
            Monto,
            Franquicia,
            Cantidad,
            Condicion,
            CartasColeccion
        } = req.body;
        
        const usuarioId = req.usuario.id;
        
        // Validar usuario
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }
        
        // Validaciones según el tipo
        if (Tipo === 'venta' && (!Monto || Monto <= 0)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Las publicaciones de venta requieren un monto válido' 
            });
        }
        
        if (Tipo === 'coleccion') {
            let cartasArray = CartasColeccion;
            if (typeof CartasColeccion === 'string') {
                try {
                    cartasArray = JSON.parse(CartasColeccion);
                } catch (e) {
                    cartasArray = [];
                }
            }
            
            if (!cartasArray || cartasArray.length === 0) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Las publicaciones de colección requieren al menos una carta' 
                });
            }
        }
        
        if ((Tipo === 'venta' || Tipo === 'intercambio') && (!req.files || req.files.length === 0)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Las publicaciones de venta/intercambio requieren al menos una imagen' 
            });
        }

        if (!Franquicia) {
            return res.status(400).json({
                success: false,
                message: 'La franquicia es obligatoria'
            });
        }
        
        // Optimizar imágenes subidas
        let fotos = [];
        if (req.files && req.files.length > 0) {
            await optimizarMultiplesImagenes(req.files, 'publicaciones');
            fotos = req.files.map(file => file.filename);
        }
        
        // Procesar CartasColeccion si es string
        let cartasProcesadas = [];
        if (Tipo === 'coleccion') {
            if (typeof CartasColeccion === 'string') {
                cartasProcesadas = JSON.parse(CartasColeccion);
            } else if (Array.isArray(CartasColeccion)) {
                cartasProcesadas = CartasColeccion;
            }
        }
        
        const nuevaPublicacion = new Publicacion({
            Idusuario: usuarioId,
            Titulo: Titulo.trim(),
            Texto: Texto ? Texto.trim() : '',
            Tipo,
            Monto: Tipo === 'venta' ? parseFloat(Monto) : null,
            Fotos: fotos,
            Franquicia,
            Cantidad: Cantidad ? parseInt(Cantidad) : 1,
            Condicion: Condicion || 'buena',
            CartasColeccion: cartasProcesadas,
            Estado: 'activo'
        });
        
        console.log('Fotos a guardar:', fotos);
        await nuevaPublicacion.save();
        await nuevaPublicacion.populate('Idusuario', 'nombre nickname correo fotoPerfil');
        
        console.log('✅ Publicación creada exitosamente:', nuevaPublicacion._id);
        
        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            publicacion: nuevaPublicacion
        });
        
    } catch (error) {
        console.error('❌ Error creando publicación:', error);
        
        // Limpiar archivos subidos si hay error
        if (req.files && req.files.length > 0) {
            await eliminarMultiplesImagenes(req.files.map(f => f.filename), 'publicaciones');
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error al crear la publicación: ' + error.message 
        });
    }
};

// Obtener todas las publicaciones
export const obtenerPublicaciones = async (req, res) => {
    try {
        const { tipo, pagina = 1, limite = 20 } = req.query;
        const skip = (pagina - 1) * limite;
        
        let query = { Estado: 'activo' };
        if (tipo && ['venta', 'intercambio', 'coleccion'].includes(tipo)) {
            query.Tipo = tipo;
        }
        
        const publicaciones = await Publicacion.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limite))
            .populate('Idusuario', 'nombre nickname correo fotoPerfil')
            .populate('Franquicia', 'nombre slug');
        
        const total = await Publicacion.countDocuments(query);
        
        res.json({
            success: true,
            publicaciones,
            paginacion: {
                total,
                pagina: parseInt(pagina),
                totalPaginas: Math.ceil(total / limite)
            }
        });
    } catch (error) {
        console.error('Error obteniendo publicaciones:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Obtener publicaciones por usuario
export const obtenerPublicacionesPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { pagina = 1, limite = 20 } = req.query;
        const skip = (pagina - 1) * limite;
        
        const publicaciones = await Publicacion.find({ Idusuario: usuarioId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limite))
            .populate('Idusuario', 'nombre nickname correo fotoPerfil');
        
        const total = await Publicacion.countDocuments({ Idusuario: usuarioId });
        
        res.json({
            success: true,
            publicaciones,
            paginacion: {
                total,
                pagina: parseInt(pagina),
                totalPaginas: Math.ceil(total / limite)
            }
        });
    } catch (error) {
        console.error('Error obteniendo publicaciones del usuario:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Obtener publicación por ID
export const obtenerPublicacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        
        const publicacion = await Publicacion.findById(id)
            .populate('Idusuario', 'nombre nickname correo fotoPerfil')
            .populate('Franquicia', 'nombre');
            
        
        if (!publicacion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publicación no encontrada' 
            });
        }
        
        // Incrementar visitas
        publicacion.Visitas += 1;
        await publicacion.save();
        
        res.json({
            success: true,
            publicacion
        });
    } catch (error) {
        console.error('Error obteniendo publicación:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Actualizar publicación
export const actualizarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;
        
        const publicacion = await Publicacion.findById(id);
        
        if (!publicacion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publicación no encontrada' 
            });
        }
        
        if (publicacion.Idusuario.toString() !== usuarioId) {
            return res.status(403).json({ 
                success: false, 
                message: 'No tienes permiso para editar esta publicación' 
            });
        }
        
        const { Titulo, Texto, Monto, Cantidad, Condicion } = req.body;
        
        if (Titulo) publicacion.Titulo = Titulo.trim();
        if (Texto !== undefined) publicacion.Texto = Texto.trim();
        if (Monto && publicacion.Tipo === 'venta') publicacion.Monto = parseFloat(Monto);
        if (Cantidad) publicacion.Cantidad = parseInt(Cantidad);
        if (Condicion) publicacion.Condicion = Condicion;
        
        await publicacion.save();
        
        res.json({
            success: true,
            message: 'Publicación actualizada exitosamente',
            publicacion
        });
    } catch (error) {
        console.error('Error actualizando publicación:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Eliminar publicación
export const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;
        
        const publicacion = await Publicacion.findById(id);
        
        if (!publicacion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publicación no encontrada' 
            });
        }
        
        if (publicacion.Idusuario.toString() !== usuarioId) {
            return res.status(403).json({ 
                success: false, 
                message: 'No tienes permiso para eliminar esta publicación' 
            });
        }
        
        // Eliminar imágenes asociadas
        if (publicacion.Fotos && publicacion.Fotos.length > 0) {
            await eliminarMultiplesImagenes(publicacion.Fotos, 'publicaciones');
        }
        
        // Soft delete
        publicacion.Estado = 'cancelado';
        await publicacion.save();
        
        res.json({
            success: true,
            message: 'Publicación eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error eliminando publicación:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Dar/Quitar like
export const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;
        
        const publicacion = await Publicacion.findById(id);
        
        if (!publicacion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publicación no encontrada' 
            });
        }
        
        await publicacion.toggleLike(usuarioId);
        
        res.json({
            success: true,
            message: publicacion.UsuariosMeGusta.includes(usuarioId) ? 'Like agregado' : 'Like removido',
            likes: publicacion.MeGusta
        });
    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Agregar comentario
export const agregarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto } = req.body;
        const usuarioId = req.usuario.id;
        
        const publicacion = await Publicacion.findById(id);
        
        if (!publicacion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publicación no encontrada' 
            });
        }
        
        await publicacion.agregarComentario(usuarioId, texto);
        await publicacion.populate('Comentarios.Idusuario', 'nombre nickname fotoPerfil');
        
        res.json({
            success: true,
            message: 'Comentario agregado',
            comentario: publicacion.Comentarios[publicacion.Comentarios.length - 1]
        });
    } catch (error) {
        console.error('Error agregando comentario:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Eliminar comentario
export const eliminarComentario = async (req, res) => {
    try {
        const { id, comentarioId } = req.params;
        const usuarioId = req.usuario.id;
        
        const publicacion = await Publicacion.findById(id);
        
        if (!publicacion) {
            return res.status(404).json({ 
                success: false, 
                message: 'Publicación no encontrada' 
            });
        }
        
        const comentario = publicacion.Comentarios.id(comentarioId);
        
        if (!comentario) {
            return res.status(404).json({ 
                success: false, 
                message: 'Comentario no encontrado' 
            });
        }
        
        if (comentario.Idusuario.toString() !== usuarioId) {
            return res.status(403).json({ 
                success: false, 
                message: 'No tienes permiso para eliminar este comentario' 
            });
        }
        
        comentario.deleteOne();
        await publicacion.save();
        
        res.json({
            success: true,
            message: 'Comentario eliminado'
        });
    } catch (error) {
        console.error('Error eliminando comentario:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};