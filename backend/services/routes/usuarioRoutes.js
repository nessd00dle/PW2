import express from "express";
import { 
    crearUsuario, 
    obtenerUsuarios, 
    loginUsuario,
    obtenerUsuarioPorId,
    cerrarSesion
} from "../controllers/usuarioController.js";
import { autenticarToken } from "../middleware/authMiddleware.js";
import { body } from 'express-validator';

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

// Rutas públicas
router.post('/registro', validarRegistro, crearUsuario);
router.post('/login', validarLogin, loginUsuario);

// Rutas protegidas (requieren autenticación)
router.get('/', autenticarToken, obtenerUsuarios);
router.get('/:id', autenticarToken, obtenerUsuarioPorId);
router.post('/logout', autenticarToken, cerrarSesion);

router.get('/perfil', autenticarToken, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-contrasena');
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/perfil', autenticarToken, async (req, res) => {
    try {
        const { nombre, nickname, bio, fotoPerfil } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(
            req.usuario.id,
            { nombre, nickname, bio, fotoPerfil },
            { new: true, runValidators: true }
        ).select('-contrasena');
        
        res.json({ mensaje: 'Perfil actualizado', usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;