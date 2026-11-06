import express from "express"; 
import routes from "./routes.js"; 
import cors from "cors";
import './db.js';
import dotenv from "dotenv"; // <-- ¡NUEVO! Importa dotenv para leer el archivo .env local

dotenv.config(); // <-- ¡NUEVO! Inicializa la lectura de variables de entorno

const app = express(); 
const port = Number(process.env.PORT) || 3000; 

app.use(express.json()); 
app.use(cors()); 
app.use("/api", routes); 

app.listen(port, "0.0.0.0", () => { 
    console.log(`Servidor escuchando en el puerto ${port}`); 
});
