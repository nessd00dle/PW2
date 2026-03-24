import Usuario from "../models/usuarioModel.js";
import bcrypt from 'bcryptjs';
import { generarToken } from "../config/auth.js";
import { validationResult } from 'express-validator';

// Registrar un nuevo usuario
export const crearUsuario = async (req, res) => {
    try {
        console.log('=== INTENTANDO REGISTRAR USUARIO ===');
        console.log('Body recibido:', req.body);
        
        // Validar errores de express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const { nombre, nickname, correo, contrasena } = req.body;

        // Verificar campos requeridos
        if (!nombre || !nickname || !correo || !contrasena) {
            return res.status(400).json({ 
                error: 'Todos los campos son requeridos: nombre, nickname, correo, contraseña' 
            });
        }

        // Verificar si el correo ya existe
        const correoExistente = await Usuario.findOne({ correo });
        if (correoExistente) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Verificar si el nickname ya existe
        const nicknameExistente = await Usuario.findOne({ nickname });
        if (nicknameExistente) {
            return res.status(400).json({ error: 'El nickname ya está en uso' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        // Crear nuevo usuario
        const usuario = new Usuario({
            nombre,
            nickname,
            correo,
            contrasena: contrasenaEncriptada
        });

        const usuarioGuardado = await usuario.save();
        
        // Generar token
        let token;
        try {
            token = generarToken(usuarioGuardado);
        } catch (tokenError) {
            console.error('Error generando token:', tokenError);
            return res.status(500).json({ error: 'Error al generar token de autenticación' });
        }

        console.log('Usuario registrado exitosamente:', usuarioGuardado.correo);
        
        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: usuarioGuardado,
            token
        });

    } catch (error) {
        console.error('Error detallado en registro:', error);
        res.status(500).json({ error: 'Error al crear el usuario: ' + error.message });
    }
};

// Iniciar sesión
export const loginUsuario = async (req, res) => {
    try {
        console.log('=== INTENTANDO INICIAR SESIÓN ===');
        console.log('Body recibido:', req.body);
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
        }

        // Buscar usuario por correo
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar token
        const token = generarToken(usuario);

        console.log('Login exitoso para:', usuario.correo);

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            usuario,
            token
        });

    } catch (error) {
        console.error('Error detallado en login:', error);
        res.status(500).json({ error: 'Error al iniciar sesión: ' + error.message });
    }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-contrasena');
        res.json(usuarios);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-contrasena');
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        res.status(500).json({ error: error.message });
    }
};

// Cerrar sesión
export const cerrarSesion = async (req, res) => {
    res.json({ mensaje: 'Sesión cerrada exitosamente' });
};