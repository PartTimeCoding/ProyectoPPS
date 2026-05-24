
USE tevisat_db;

CREATE TABLE inventario_stock (
    numero_serie VARCHAR(50) PRIMARY KEY,
    tipo_equipo VARCHAR(100) NOT NULL,
    falla_reportada VARCHAR(255),
    estado ENUM('Funcional', 'Descarte') DEFAULT 'Funcional',
    fecha_ultimo_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE inventario_ingresos (
    id_ingreso INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(50) NOT NULL,
    tecnico_devolucion VARCHAR(100),
    personal_recepcion VARCHAR(100) NOT NULL,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    
    FOREIGN KEY (numero_serie) REFERENCES inventario_stock(numero_serie) ON DELETE CASCADE
);

CREATE TABLE inventario_salidas (
    id_salida INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(50) NOT NULL,
    tecnico_recibe VARCHAR(100),
    personal_entrega VARCHAR(100) NOT NULL,
    fecha_salida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(255),
    
    FOREIGN KEY (numero_serie) REFERENCES inventario_stock(numero_serie) ON DELETE CASCADE
);

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    rol ENUM('Administrador', 'Bodega', 'Tecnico') DEFAULT 'Bodega',
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bitacora_sesiones (
    id_bitacora INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    accion ENUM('Login', 'Logout') NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES usuarios(username) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO inventario_stock (numero_serie, tipo_equipo, falla_reportada, estado) 
VALUES 
('HWTCCE041382', 'ONU UT-King Doble Banda', 'LOS Parpadeando', 'Funcional'),
('HWTCCAA5A2E3', 'ONU Huawei 2.4GHz', 'Antena Rota', 'Descarte'),
('388141114', 'Caja Digital HD', 'Puerto HDMI quemado', 'Descarte');

INSERT INTO inventario_ingresos (numero_serie, tecnico_devolucion, personal_recepcion, observaciones)
VALUES 
('HWTCCE041382', 'Carlos Martínez', 'Tu Nombre (Admin)', 'Equipo devuelto por cliente cancelado'),
('HWTCCAA5A2E3', 'Luis Gómez', 'Tu Nombre (Admin)', 'Cliente reportó daño físico'),
('388141114', 'Carlos Martínez', 'Tu Nombre (Admin)', 'Sustitución por caja nueva');

INSERT INTO inventario_salidas (numero_serie, tecnico_recibe, personal_entrega, motivo)
VALUES 
('HWTCCE041382', 'Mario Reyes', 'Tu Nombre (Admin)', 'Reasignación para nueva instalación en Zona Norte');

INSERT INTO usuarios (username, password, nombre, apellido, rol)
VALUES 
('admin', 'admin123', 'Administrador', 'Sistema', 'Administrador'),
('bodega1', 'bodega123', 'Juan', 'Pérez', 'Bodega');