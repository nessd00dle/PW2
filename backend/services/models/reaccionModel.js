import mongoose from "mongoose";

const reaccionSchema = new mongoose.Schema({
    idPublicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: [true, 'El ID de la publicación es obligatorio']
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID del usuario es obligatorio']
    },
    
}, {
    timestamps: true
});

// Índice compuesto para evitar duplicados (un usuario solo puede tener una reacción por publicación)
reaccionSchema.index({ idPublicacion: 1, idUsuario: 1 }, { unique: true });

// Método estático para obtener reacciones de una publicación
reaccionSchema.statics.obtenerPorPublicacion = async function(idPublicacion) {
    const reacciones = await this.find({ idPublicacion })
        .populate('idUsuario', 'nombre nickname fotoPerfil')
        .sort({ createdAt: -1 });
    
    const resumen = {
        like: 0,
        love: 0,
        happy: 0,
        surprised: 0,
        sad: 0,
        angry: 0,
        total: 0
    };
    
    reacciones.forEach(reaccion => {
        resumen[reaccion.tipo]++;
        resumen.total++;
    });
    
    return {
        reacciones,
        resumen
    };
};

// Método estático para verificar si un usuario ha reaccionado
reaccionSchema.statics.usuarioHaReaccionado = async function(idPublicacion, idUsuario) {
    const reaccion = await this.findOne({ idPublicacion, idUsuario });
    return reaccion ? reaccion.tipo : null;
};





reaccionSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

const Reaccion = mongoose.model("Reaccion", reaccionSchema);

export default Reaccion;