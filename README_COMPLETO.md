# 🛍️ Sistema de Ventas - Novedades Nays

Sistema completo de gestión de ventas, inventario y clientes con dashboard en tiempo real.

## 🌟 Características Principales

✅ **Dashboard Interactivo** - Estadísticas en tiempo real
✅ **Gestión de Productos** - Control completo de inventario
✅ **Gestión de Clientes** - Base de datos de clientes
✅ **Gestión de Ventas** - Procesamiento de transacciones
✅ **Gestión de Empleados** - Control de vendedores
✅ **Gestión de Proveedores** - Red de suministro
✅ **Reportes y Gráficas** - Análisis de datos
✅ **Inventario en Tiempo Real** - Actualización automática
✅ **Autenticación Segura** - JWT con roles
✅ **Auditoría de Cambios** - Registro de operaciones

## 🚀 Inicio Rápido

### Opción 1: Docker (Recomendado)

```bash
git clone https://github.com/tu-usuario/novedades-nays-sistema.git
cd novedades-nays-sistema
docker-compose up -d
```

Acceder a:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Opción 2: Instalación Manual

Ver [INSTALL.md](./INSTALL.md) para instrucciones detalladas.

## 🔐 Credenciales de Prueba

| Campo | Valor |
|-------|-------|
| Email | admin@nays.com |
| Contraseña | Admin123 |
| Rol | admin |

## 📁 Estructura del Proyecto

```
novedades-nays-sistema/
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   ├── models/         # Modelos de datos
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── routes/         # Rutas API
│   │   ├── middleware/     # Middleware
│   │   └── config/         # Configuración
│   └── Dockerfile
│
├── frontend/                # App React + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes UI
│   │   ├── services/       # Servicios API
│   │   ├── context/        # Context API
│   │   └── pages/          # Páginas
│   └── Dockerfile
│
├── database/
│   └── schema.sql          # SQL de base de datos
│
└── docker-compose.yml      # Orquestación de servicios
```

## 📦 Stack Tecnológico

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **ORM:** Sequelize
- **DB:** MySQL 8.0+
- **Auth:** JWT + bcryptjs
- **Validación:** express-validator

### Frontend
- **Framework:** React 18
- **Lenguaje:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP:** Axios
- **State:** React Query
- **Routing:** React Router v6
- **Gráficas:** Chart.js
- **UI Icons:** React Icons

## 🔌 Endpoints Principales

### Autenticación
```
POST   /api/auth/registro
POST   /api/auth/login
GET    /api/auth/perfil
```

### Clientes
```
GET    /api/clientes
GET    /api/clientes/:id
POST   /api/clientes
PUT    /api/clientes/:id
DELETE /api/clientes/:id
```

### Productos
```
GET    /api/productos
GET    /api/productos/:id
GET    /api/productos/stock-bajo
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id
```

### Ventas
```
GET    /api/ventas
GET    /api/ventas/:id
POST   /api/ventas
POST   /api/ventas/:id/cancelar
```

## 🎯 Módulos del Sistema

### 📊 Dashboard
- Resumen de ventas del día
- Total de clientes
- Inventario
- Gráficos de tendencias

### 👥 Clientes
- CRUD completo
- Búsqueda y filtrado
- Historial de compras
- Datos de contacto

### 📦 Productos
- Catálogo completo
- Control de stock
- Alertas de inventario bajo
- Categorización
- SKU único

### 🛒 Ventas
- Crear ventas rápidas
- Múltiples métodos de pago
- Detalles de transacciones
- Cancelación con devolución de stock
- Historial completo

### 👨‍💼 Empleados
- Gestión de vendedores
- Datos de contacto
- Información de salario
- Historial de contratación

### 🏭 Proveedores
- Base de datos de proveedores
- Información de contacto
- Categorización por tipo

## 🔒 Seguridad

- ✅ Autenticación JWT
- ✅ Contraseñas hasheadas con bcryptjs
- ✅ Control de roles (admin, gerente, vendedor)
- ✅ CORS configurado
- ✅ Helmet para headers de seguridad
- ✅ Validación de entrada
- ✅ Auditoría de cambios

## 📈 Performance

- Paginación en listados
- Caché con React Query
- Índices en base de datos
- Lazy loading de componentes
- Optimización de queries SQL

## 🐛 Troubleshooting

### Conexión a BD fallida
```bash
# Verificar MySQL está corriendo
mysql -u root -p

# Verificar credenciales en backend/.env
```

### CORS Error
```bash
# Asegurar que FRONTEND_URL en backend/.env es correcto
FRONTEND_URL=http://localhost:3000
```

### Puerto en uso
```bash
# Cambiar puerto en .env o usar otro
PORT=5001 npm run dev
```

## 📞 Contacto

**Equipo de Desarrollo:** soporte@nayasnovedades.com

## 📝 Licencia

Proyecto propietario © Novedades Nays 2024

---

**Hecho con ❤️ para Novedades Nays**
