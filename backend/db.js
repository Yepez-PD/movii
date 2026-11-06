import mysql from "mysql2/promise";

console.log('--- Inicializando módulo de Base de Datos ---');

// Configuración dinámica adaptada para Producción (Aiven) y Desarrollo (Local)
const pool = mysql.createPool({ 
    host: process.env.DB_HOST || "localhost",         // Host de Aiven
    user: process.env.DB_USER || "root",              // Usuario de Aiven
    password: process.env.DB_PASSWORD || "",          // Contraseña de Aiven
    database: process.env.DB_NAME || "movil",         // Nombre de la base de datos
    port: Number(process.env.DB_PORT) || 3306,        // Puerto de Aiven (usualmente superior a 10000)
    connectionLimit: 15,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false // Obligatorio para Aiven
});

export default pool;
