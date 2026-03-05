import express from "express";
import cors from "cors";
import connectDB from "./config/dbClient.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", PORT);
});

