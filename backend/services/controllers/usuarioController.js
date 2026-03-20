import Usuario from "../models/usuarioModel.js";

export const crearUsuario = async (req, res) => {
    try {

        const usuario = new Usuario(req.body);

        const usuarioGuardado = await usuario.save();

        res.status(201).json(usuarioGuardado);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

export const obtenerUsuarios = async (req, res) => {
    try {

        const usuarios = await Usuario.find();

        res.json(usuarios);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};