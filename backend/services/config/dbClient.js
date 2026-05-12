import mongoose from "mongoose";

const connectDB = async () => {
    try {
      
        const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/CardDial";
        
        console.log("Conectando a MongoDB...");
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB conectado exitosamente:", conn.connection.host);
        console.log(" Base de datos:", conn.connection.name);
    } catch (error) {
        console.error("Error conectando a MongoDB:", error.message);
        console.error("Detalles:", error);
        process.exit(1);
    }
};

export default connectDB;