// src/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const sequelize = require('./config/database');

// Routes
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', mensaje: 'Servidor funcionando' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

// Sync database and start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`\n✅ Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 Base de datos conectada correctamente`);
  });
}).catch(err => {
  console.error('❌ Error conectando a la base de datos:', err);
  process.exit(1);
});

module.exports = app;
