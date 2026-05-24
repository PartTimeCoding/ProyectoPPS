import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Tevisat funcionando correctamente 🚀');
});

app.get('/api/inventario', async (req, res) => {
    try {
        const query = `
            SELECT s.*, 
                   (SELECT personal_recepcion 
                    FROM inventario_ingresos i 
                    WHERE i.numero_serie = s.numero_serie 
                    ORDER BY fecha_ingreso DESC LIMIT 1) AS personal
            FROM inventario_stock s
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error consultando inventario:", error);
        res.status(500).json({ error: 'Hubo un error al obtener el inventario' });
    }
});

app.post('/api/inventario', async (req, res) => {
    try {
        const { numero_serie, tipo_equipo, falla_reportada, estado } = req.body;

        // Validación básica
        if (!numero_serie || !tipo_equipo) {
            return res.status(400).json({ error: 'El número de serie y tipo de equipo son obligatorios' });
        }

        const query = 'INSERT INTO inventario_stock (numero_serie, tipo_equipo, falla_reportada, estado) VALUES (?, ?, ?, ?)';
        await pool.query(query, [numero_serie, tipo_equipo, falla_reportada, estado || 'Funcional']);

        res.status(201).json({ message: 'Equipo registrado exitosamente' });
    } catch (error) {
        console.error("Error al registrar equipo:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un equipo con este número de serie' });
        }
        res.status(500).json({ error: 'Hubo un error al guardar el equipo' });
    }
});

app.delete('/api/inventario/:numero_serie', async (req, res) => {
    try {
        const { numero_serie } = req.params;
        const query = 'DELETE FROM inventario_stock WHERE numero_serie = ?';
        const [result] = await pool.query(query, [numero_serie]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        res.json({ message: 'Equipo eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar equipo:", error);
        res.status(500).json({ error: 'Hubo un error al eliminar el equipo' });
    }
});

app.put('/api/inventario/:numero_serie', async (req, res) => {
    try {
        const { numero_serie } = req.params;
        const { tipo_equipo, falla_reportada, estado } = req.body;

        if (!tipo_equipo) {
            return res.status(400).json({ error: 'El tipo de equipo es obligatorio' });
        }

        const query = 'UPDATE inventario_stock SET tipo_equipo = ?, falla_reportada = ?, estado = ? WHERE numero_serie = ?';
        const [result] = await pool.query(query, [tipo_equipo, falla_reportada, estado, numero_serie]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        res.json({ message: 'Equipo actualizado exitosamente' });
    } catch (error) {
        console.error("Error al actualizar equipo:", error);
        res.status(500).json({ error: 'Hubo un error al actualizar el equipo' });
    }
});

app.get('/api/movimientos', async (req, res) => {
    try {
        const query = `
            SELECT 
                'Ingreso' AS tipo_movimiento,
                numero_serie,
                tecnico_devolucion AS tecnico,
                personal_recepcion AS personal,
                fecha_ingreso AS fecha,
                observaciones AS notas
            FROM inventario_ingresos
            UNION ALL
            SELECT 
                'Salida' AS tipo_movimiento,
                numero_serie,
                tecnico_recibe AS tecnico,
                personal_entrega AS personal,
                fecha_salida AS fecha,
                motivo AS notas
            FROM inventario_salidas
            ORDER BY fecha DESC
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error consultando movimientos:", error);
        res.status(500).json({ error: 'Hubo un error al obtener el historial de movimientos' });
    }
});

app.post('/api/ingresos', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const {
            numero_serie, tipo_equipo, falla_reportada, estado,
            tecnico_devolucion, personal_recepcion, observaciones
        } = req.body;

        if (!numero_serie || !tipo_equipo || !personal_recepcion) {
            return res.status(400).json({ error: 'Faltan campos obligatorios para registrar el nuevo equipo.' });
        }

        await connection.beginTransaction();

        const stockQuery = 'INSERT INTO inventario_stock (numero_serie, tipo_equipo, falla_reportada, estado) VALUES (?, ?, ?, ?)';
        await connection.query(stockQuery, [numero_serie, tipo_equipo, falla_reportada, estado || 'Funcional']);

        const ingresoQuery = 'INSERT INTO inventario_ingresos (numero_serie, tecnico_devolucion, personal_recepcion, observaciones) VALUES (?, ?, ?, ?)';
        await connection.query(ingresoQuery, [numero_serie, tecnico_devolucion || null, personal_recepcion, observaciones]);

        await connection.commit();
        res.status(201).json({ message: 'Nuevo equipo y su ingreso han sido registrados exitosamente.' });

    } catch (error) {
        await connection.rollback();
        console.error("Error al registrar ingreso:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un equipo con este número de serie.' });
        }
        res.status(500).json({ error: 'Hubo un error al registrar el ingreso.' });
    } finally {
        connection.release();
    }
});

app.post('/api/salidas', async (req, res) => {
    try {
        const { numero_serie, tecnico_recibe, personal_entrega, motivo } = req.body;
        if (!numero_serie || !personal_entrega) {
            return res.status(400).json({ error: 'Faltan campos obligatorios para la salida' });
        }
        const query = 'INSERT INTO inventario_salidas (numero_serie, tecnico_recibe, personal_entrega, motivo) VALUES (?, ?, ?, ?)';
        await pool.query(query, [numero_serie, tecnico_recibe || null, personal_entrega, motivo]);

        res.status(201).json({ message: 'Salida registrada exitosamente' });
    } catch (error) {
        console.error("Error al registrar salida:", error);
        res.status(500).json({ error: 'Hubo un error al registrar la salida' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
        }

        const [users] = await pool.query('SELECT id_usuario, username, password, nombre, apellido, rol, estado FROM usuarios WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const user = users[0];

        if (user.estado !== 'Activo' || password !== user.password) {
            return res.status(401).json({ error: 'Credenciales incorrectas o usuario inactivo' });
        }

        const { password: _, ...userData } = user;

        await pool.query("INSERT INTO bitacora_sesiones (username, accion) VALUES (?, 'Login')", [username]);

        res.json({ message: 'Login exitoso', user: userData });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: 'Hubo un error en el servidor al intentar iniciar sesión' });
    }
});

app.post('/api/logout', async (req, res) => {
    try {
        const { username } = req.body;
        if (username) {
            await pool.query("INSERT INTO bitacora_sesiones (username, accion) VALUES (?, 'Logout')", [username]);
        }
        res.json({ message: 'Logout registrado' });
    } catch (error) {
        console.error("Error al registrar logout:", error);
        res.status(500).json({ error: 'Hubo un error al registrar el logout' });
    }
});

app.get('/api/bitacora-sesiones', async (req, res) => {
    try {
        const query = `
            SELECT b.id_bitacora, b.username, u.nombre, u.apellido, b.accion, b.fecha 
            FROM bitacora_sesiones b JOIN usuarios u ON b.username = u.username 
            ORDER BY b.fecha DESC LIMIT 200
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error consultando bitácora de sesiones:", error);
        res.status(500).json({ error: 'Hubo un error al obtener la bitácora' });
    }
});

app.get('/api/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_usuario, username, nombre, apellido, rol, estado, fecha_creacion FROM usuarios ORDER BY id_usuario DESC');
        res.json(rows);
    } catch (error) {
        console.error("Error consultando usuarios:", error);
        res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
});

app.post('/api/usuarios', async (req, res) => {
    try {
        const { username, password, nombre, apellido, rol } = req.body;

        if (!username || !password || !nombre || !apellido) {
            return res.status(400).json({ error: 'Todos los campos básicos son obligatorios' });
        }

        const query = 'INSERT INTO usuarios (username, password, nombre, apellido, rol) VALUES (?, ?, ?, ?, ?)';
        await pool.query(query, [username, password, nombre, apellido, rol || 'Bodega']);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Este nombre de usuario ya está en uso' });
        }
        res.status(500).json({ error: 'Hubo un error al registrar el usuario' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});