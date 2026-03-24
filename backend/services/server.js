import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbClient.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // el frontend corre en este puerto
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/usuarios', usuarioRoutes);

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Rutas disponibles:`);
    console.log(`- POST http://localhost:${PORT}/api/usuarios/registro`);
    console.log(`- POST http://localhost:${PORT}/api/usuarios/login`);
    console.log(`- GET  http://localhost:${PORT}/api/usuarios`);
    console.log(`JWT_SECRET configurado: ${process.env.JWT_SECRET ? 'Sí' : 'No'}`);
});