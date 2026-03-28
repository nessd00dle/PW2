import express from "express";
import { 
    crearUsuario, 
    obtenerUsuarios, 
    loginUsuario,
    obtenerUsuarioPorId,
    cerrarSesion,
    crearUsuarioConFoto,  
    actualizarFotoPerfil,
    obtenerPerfil,
    actualizarPerfil
} from "../controllers/usuarioController.js";
import { autenticarToken } from "../middleware/authMiddleware.js";
import { body } from 'express-validator';
import upload from "../middleware/uploadMiddleware.js"; 

const router = express.Router();

// Validaciones para registro
const validarRegistro = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('nickname').notEmpty().withMessage('El nickname es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validaciones para login
const validarLogin = [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria')
];
const validarActualizacion = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('nickname').optional().notEmpty().withMessage('El nickname no puede estar vacío'),
    body('bio').optional().isLength({ max: 500 }).withMessage('La biografía no puede exceder 500 caracteres')
];

// Rutas públicas
router.post('/registro', validarRegistro, crearUsuario);
router.post('/registro-con-foto', upload.single('fotoPerfil'), validarRegistro, crearUsuarioConFoto); 
router.post('/login', validarLogin, loginUsuario);
//actualizaciones de perfil
router.put('/perfil', autenticarToken, validarActualizacion, actualizarPerfil);
router.put('/perfil/foto', autenticarToken, upload.single('fotoPerfil'), actualizarFotoPerfil);

// Rutas protegidas (requieren autenticación)
router.get('/', autenticarToken, obtenerUsuarios);
router.get('/perfil', autenticarToken, obtenerPerfil);
router.get('/:id', autenticarToken, obtenerUsuarioPorId);
router.post('/logout', autenticarToken, cerrarSesion);
router.put('/perfil/foto', autenticarToken, upload.single('fotoPerfil'), actualizarFotoPerfil);
router.put('/perfil', autenticarToken, async (req, res) => {
    try {
        const { nombre, nickname, bio } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(
            req.usuario.id,
            { nombre, nickname, bio },
            { new: true, runValidators: true }
        ).select('-contrasena');
        
        res.json({ mensaje: 'Perfil actualizado', usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



export default router;