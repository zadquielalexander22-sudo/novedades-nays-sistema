-- Base de datos mejorada: novedades_nays
CREATE DATABASE IF NOT EXISTS `novedades_nays`;
USE `novedades_nays`;

-- 1. Tabla de Categorías
CREATE TABLE `categorias` (
  `id_categoria` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL UNIQUE,
  `descripcion` VARCHAR(255),
  `activo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabla de Clientes
CREATE TABLE `clientes` (
  `id_cliente` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido_paterno` VARCHAR(100) NOT NULL,
  `apellido_materno` VARCHAR(100),
  `telefono` VARCHAR(15) NOT NULL UNIQUE,
  `email` VARCHAR(100) UNIQUE,
  `ine` VARCHAR(18) NOT NULL UNIQUE,
  `direccion` VARCHAR(255),
  `activo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nombre (nombre),
  INDEX idx_ine (ine)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabla de Empleados
CREATE TABLE `empleados` (
  `id_empleado` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido_paterno` VARCHAR(100) NOT NULL,
  `apellido_materno` VARCHAR(100),
  `telefono` VARCHAR(15) NOT NULL UNIQUE,
  `email` VARCHAR(100) UNIQUE,
  `ine` VARCHAR(18) NOT NULL UNIQUE,
  `puesto` VARCHAR(100),
  `salario` DECIMAL(10,2),
  `fecha_contratacion` DATE,
  `activo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nombre (nombre)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Tabla de Proveedores
CREATE TABLE `proveedores` (
  `id_proveedor` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL UNIQUE,
  `telefono` VARCHAR(15) NOT NULL,
  `email` VARCHAR(100),
  `direccion` VARCHAR(255) NOT NULL,
  `id_categoria` INT NOT NULL,
  `contacto` VARCHAR(100),
  `activo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_categoria) REFERENCES `categorias`(id_categoria),
  INDEX idx_nombre (nombre)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Tabla de Productos
CREATE TABLE `productos` (
  `id_producto` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  `id_categoria` INT NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `stock_minimo` INT DEFAULT 10,
  `sku` VARCHAR(50) UNIQUE,
  `activo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_categoria) REFERENCES `categorias`(id_categoria),
  INDEX idx_nombre (nombre),
  INDEX idx_categoria (id_categoria),
  INDEX idx_precio (precio)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Tabla de Usuarios (para autenticación)
CREATE TABLE `usuarios` (
  `id_usuario` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `rol` ENUM('admin', 'vendedor', 'gerente') DEFAULT 'vendedor',
  `activo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Tabla de Ventas
CREATE TABLE `ventas` (
  `id_venta` INT PRIMARY KEY AUTO_INCREMENT,
  `numero_venta` VARCHAR(20) UNIQUE,
  `id_cliente` INT NOT NULL,
  `id_empleado` INT,
  `fecha` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NOT NULL,
  `estado` ENUM('pendiente', 'completada', 'cancelada') DEFAULT 'completada',
  `metodo_pago` ENUM('efectivo', 'tarjeta', 'transferencia', 'otro') DEFAULT 'efectivo',
  `notas` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cliente) REFERENCES `clientes`(id_cliente),
  FOREIGN KEY (id_empleado) REFERENCES `empleados`(id_empleado),
  INDEX idx_cliente (id_cliente),
  INDEX idx_fecha (fecha),
  INDEX idx_estado (estado)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Tabla de Detalles de Venta
CREATE TABLE `detalle_venta` (
  `id_detalle` INT PRIMARY KEY AUTO_INCREMENT,
  `id_venta` INT NOT NULL,
  `id_producto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_venta) REFERENCES `ventas`(id_venta) ON DELETE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES `productos`(id_producto),
  INDEX idx_venta (id_venta)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Tabla de Auditoría
CREATE TABLE `auditoria` (
  `id_auditoria` INT PRIMARY KEY AUTO_INCREMENT,
  `tabla` VARCHAR(50) NOT NULL,
  `operacion` ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
  `id_registro` INT,
  `usuario` VARCHAR(100),
  `datos_antiguos` JSON,
  `datos_nuevos` JSON,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tabla (tabla),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de prueba

-- Categorías
INSERT INTO `categorias` (`nombre`, `descripcion`) VALUES
('joyería', 'Brazaletes y accesorios'),
('peluches', 'Peluches y muñecos'),
('tazas', 'Tazas personalizadas'),
('papelería', 'Pegamento, libretas y útiles'),
('juguetes', 'Casa de muñecas y juguetes');

-- Usuarios
INSERT INTO `usuarios` (`email`, `password`, `nombre`, `rol`) VALUES
('admin@nays.com', '$2b$10$YourHashedPasswordHere', 'Administrador', 'admin'),
('gerente@nays.com', '$2b$10$YourHashedPasswordHere', 'Gerente', 'gerente'),
('vendedor@nays.com', '$2b$10$YourHashedPasswordHere', 'Vendedor', 'vendedor');

-- Empleados
INSERT INTO `empleados` (`nombre`, `apellido_paterno`, `apellido_materno`, `telefono`, `email`, `ine`, `puesto`, `fecha_contratacion`) VALUES
('Juan', 'Pardo', 'Villegas', '5021417015', 'juan@nays.com', 'INE001', 'Vendedor', '2025-01-15'),
('Jonathan', 'Consuelo', 'Galván', '5650162208', 'jonathan@nays.com', 'INE002', 'Vendedor', '2025-02-10'),
('Julio', 'Manzo', 'Santillan', '5637002507', 'julio@nays.com', 'INE003', 'Gerente', '2024-06-01');

-- Clientes
INSERT INTO `clientes` (`nombre`, `apellido_paterno`, `apellido_materno`, `telefono`, `email`, `ine`, `direccion`) VALUES
('Manuel', 'Miranda', 'Trujillo', '5622151420', 'manuel@email.com', 'INE_CLIENT_001', 'Calle 1, No. 100'),
('Sherlyn', 'Rivera', 'Piña', '5002314789', 'sherlyn@email.com', 'INE_CLIENT_002', 'Calle 2, No. 200'),
('Ximena', 'Marina', 'Vigueras', '5010203040', 'ximena@email.com', 'INE_CLIENT_003', 'Calle 3, No. 300');

-- Productos
INSERT INTO `productos` (`nombre`, `descripcion`, `id_categoria`, `precio`, `stock`, `stock_minimo`, `sku`) VALUES
('Brazaletes', 'Brazaletes de joyería variada', 1, 500.00, 15, 5, 'SKU001'),
('Peluches de oso', 'Peluches suaves de oso', 2, 560.00, 30, 10, 'SKU002'),
('Tazas personalizadas', 'Tazas de cerámica personalizadas', 3, 600.00, 25, 5, 'SKU003'),
('Libretas', 'Libretas y cuadernos', 4, 250.00, 50, 15, 'SKU004'),
('Casa de muñecas', 'Casa de muñecas de madera', 5, 1500.00, 8, 2, 'SKU005');

-- Proveedores
INSERT INTO `proveedores` (`nombre`, `telefono`, `email`, `direccion`, `id_categoria`, `contacto`) VALUES
('Julian Joyería', '5652455355', 'julian@proveedor.com', 'Tepotzotlán', 1, 'Julián'),
('Pedro Peluches', '5652358998', 'pedro@proveedor.com', 'Teoloyucan', 2, 'Pedro'),
('Julio Tazas', '5523148950', 'julio@proveedor.com', 'Coyote', 3, 'Julio'),
('Daniel Papelería', '5652154780', 'daniel@proveedor.com', 'Tepotzotlán', 4, 'Daniel'),
('Antonio Juguetes', '5658987400', 'antonio@proveedor.com', 'Trébol', 5, 'Antonio');

COMMIT;
