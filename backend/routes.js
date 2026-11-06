import express from "express"; // Importa Express para crear un router independiente.
import pool from "./db.js";    // <-- ¡NUEVO! Importamos el pool para conectarnos a MySQL.

const router = express.Router(); // Crea un router para definir y agrupar endpoints de la API.

// 1. ENDPOINT PARA CAMBIAR CLAVE
router.post("/cambiarClave", async (req, res) => {
    try {
        const { cel, clave, nueva } = req.body; // Obtiene los datos del formulario

        // insertar datos : Inserta una nueva credencial con los datos proporcionados
        const [resultado] = await pool.query(
            "INSERT INTO credencial (clave, celular, clave_nueva) VALUES (?, ?, ?)", 
            [nueva, cel, clave]
        );

        // Verifica si la inserción fue exitosa
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: "no se pudo guardar los datos" });
        }

        res.status(200).json({ message: "Clave actualizada exitosamente en la base de datos" });
    } catch (error) {
        // Esto te mostrará en la terminal el error exacto si escribiste mal una columna
        console.error("Error SQL en cambiarClave:", error.message); 
        res.status(500).json({ message: "Error al guardar el formulario" });
    }
});

// 2. ENDPOINT PARA VALIDAR DATOS (INSERTAR REGISTRO)
router.post("/validarDatos", async (req, res) => {
    try {
        // 1. Quitamos 'nueva' de aquí. Solo recibimos los 3 datos del formulario v2
        const { nom, doc, tel } = req.body; 

        // 2. Quitamos la columna 'clave_nueva' y su signo de pregunta (?) de la consulta SQL
        const [resultado] = await pool.query(
            "INSERT INTO validacion (nombre_completo, identificacion, celular) VALUES (?, ?, ?)", 
            [nom, doc, tel]
        );

        // 3. Si la inserción falla, devolvemos un estado 400 (Petición Incorrecta)
        if (resultado.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudieron guardar los datos en la base de datos." });
        }
        
        res.status(200).json({ message: "Validación guardada exitosamente en la base de datos" });
    } catch (error) {
        // Si sale algún error de escritura de columnas en phpMyAdmin, te lo mostrará en tu terminal
        console.error("Error SQL en validarDatos:", error.message);
        res.status(500).json({ message: "Error al guardar el formulario" });
    }
});


export default router; // Exporta el router para que server.js pueda montarlo en /api.
