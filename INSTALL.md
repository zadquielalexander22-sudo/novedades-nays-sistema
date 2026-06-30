# Guía de Instalación y Uso

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- MySQL 8.0+
- Git

## 🚀 Instalación Rápida

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/novedades-nays-sistema.git
cd novedades-nays-sistema
```

### 2. Configurar la Base de Datos

```bash
# Crear base de datos
mysql -u root -p < database/schema.sql

# O usando GUI MySQL Workbench
# Importar el archivo database/schema.sql
```

### 3. Configurar Backend

```bash
cd backend

# Copiar archivo de ambiente
cp .env.example .env

# Editar .env con tus datos de MySQL
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=tu_password

# Instalar dependencias
npm install

# Iniciar servidor
npm run dev
```

El backend estará disponible en: `http://localhost:5000`

### 4. Configurar Frontend

```bash
cd ../frontend

# Copiar archivo de ambiente
cp .env.example .env

# Instalar dependencias
npm install

# Iniciar aplicación
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## 🐳 Usando Docker (Opcional)

```bash
# En la raíz del proyecto
docker-compose up -d

# El sistema estará disponible en:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MySQL: localhost:3306
```

## 🔐 Credenciales de Prueba

**Email:** admin@nays.com
**Contraseña:** Admin123

## 📱 Características Principales

### Dashboard
- Estadísticas en tiempo real
- Resumen de ventas
- Inventario
- Clientes activos

### Módulo de Clientes
- Crear, leer, actualizar, eliminar clientes
- Búsqueda avanzada
- Historial de compras

### Módulo de Productos
- Gestión completa de productos
- Control de inventario
- Alertas de stock bajo
- Categorías y SKU

### Módulo de Ventas
- Crear ventas rápidas
- Múltiples métodos de pago
- Historial de transacciones
- Cancelación de ventas con devolución de stock

### Módulo de Empleados
- Gestión de vendedores
- Control de comisiones

### Reportes
- Reporte de ventas por período
- Reporte de productos
- Análisis de clientes

## 📂 Estructura del Proyecto

```
novedades-nays-sistema/
├── backend/
│   ├── src/
│   │   ├── config/       # Configuración de base de datos
│   │   ├── models/       # Modelos de Sequelize
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── routes/       # Rutas API
│   │   ├── middleware/   # Middleware de autenticación
│   │   └── index.js      # Servidor principal
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── services/     # Servicios API
│   │   ├── context/      # Context API
│   │   ├── App.tsx       # App principal
│   │   └── index.tsx     # Entry point
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── database/
│   └── schema.sql        # Script de base de datos
│
└── docker-compose.yml
```

## 🔧 Endpoints API

### Autenticación
- `POST /api/auth/registro` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/perfil` - Obtener perfil

### Clientes
- `GET /api/clientes` - Obtener todos
- `GET /api/clientes/:id` - Obtener uno
- `POST /api/clientes` - Crear
- `PUT /api/clientes/:id` - Actualizar
- `DELETE /api/clientes/:id` - Eliminar

### Productos
- `GET /api/productos` - Obtener todos
- `GET /api/productos/:id` - Obtener uno
- `GET /api/productos/stock-bajo` - Stock bajo
- `POST /api/productos` - Crear
- `PUT /api/productos/:id` - Actualizar
- `DELETE /api/productos/:id` - Eliminar

### Ventas
- `GET /api/ventas` - Obtener todas
- `GET /api/ventas/:id` - Obtener una
- `POST /api/ventas` - Crear venta
- `POST /api/ventas/:id/cancelar` - Cancelar venta

## 🐛 Solución de Problemas

### Error de conexión a MySQL
```bash
# Verificar que MySQL está corriendo
mysql -u root -p

# Verificar credenciales en .env
```

### Error CORS
```bash
# Verificar que FRONTEND_URL en backend .env coincide con donde corre el frontend
```

### Puerto en uso
```bash
# Frontend (cambiar puerto en package.json o usar)
PORT=3001 npm start

# Backend (cambiar PORT en .env)
PORT=5001 npm run dev
```

## 📞 Soporte

Para preguntas o problemas, contacta al equipo de desarrollo.

## 📄 Licencia

Proyecto propietario de Novedades Nays

---

**Creado con ❤️ para Novedades Nays**
