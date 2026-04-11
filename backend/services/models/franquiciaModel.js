import mongoose from "mongoose";

const franquiciaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la franquicia es obligatorio'],
        unique: true,
        trim: true,
        uppercase: true,
        enum: {
            values: ['POKEMON', 'MAGIC', 'YU-GI-OH', 'DIGIMON', 'ONE PIECE', 'DRAGON BALL', 'OTRO'],
            message: 'Franquicia no válida'
        }
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [50, 'La descripción no puede exceder los 50 caracteres']
    },
   
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


franquiciaSchema.index({ nombre: 1 });


franquiciaSchema.statics.obtenerActivas = async function() {
    return await this.find({ activo: true }).sort({ nombre: 1 });
};

// Configuración JSON
franquiciaSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

const Franquicia = mongoose.model("Franquicia", franquiciaSchema);

// Inicializar franquicias por defecto
export const inicializarFranquicias = async () => {
    const franquiciasDefault = [
        { nombre: 'POKEMON', descripcion: 'Pokémon Trading Card Game' },
        { nombre: 'MAGIC', descripcion: 'Magic: The Gathering' },
        { nombre: 'YU-GI-OH', descripcion: 'Yu-Gi-Oh! Trading Card Game' },
        { nombre: 'DIGIMON', descripcion: 'Digimon Card Game' },
        { nombre: 'ONE PIECE', descripcion: 'One Piece Card Game' },
        { nombre: 'DRAGON BALL', descripcion: 'Dragon Ball Super Card Game' },
        { nombre: 'OTRO', descripcion: 'Otras franquicias' }
    ];
    
    for (const franq of franquiciasDefault) {
        await Franquicia.findOneAndUpdate(
            { nombre: franq.nombre },
            franq,
            { upsert: true, new: true }
        );
    }
    console.log(' Franquicias inicializadas');
};

export default Franquicia;