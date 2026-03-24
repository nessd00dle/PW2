import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres']
    },
    nickname: {
        type: String,
        required: [true, 'El nickname es obligatorio'],
        unique: true,
        trim: true,
        minlength: [3, 'El nickname debe tener al menos 3 caracteres']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un correo válido']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    fotoPerfil: {
        type: String,
        default: null
    }
}, {
    timestamps: true // esto agrega la fecha de creación y actualización automáticamente
});


usuarioSchema.methods.toJSON = function() {
    const usuario = this.toObject();
    delete usuario.contrasena;
    return usuario;
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;