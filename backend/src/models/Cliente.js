// src/models/Cliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido_paterno: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido_materno: {
    type: DataTypes.STRING(100)
  },
  telefono: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true
  },
  ine: {
    type: DataTypes.STRING(18),
    allowNull: false,
    unique: true
  },
  direccion: {
    type: DataTypes.STRING(255)
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'clientes',
  timestamps: true,
  underscored: true
});

module.exports = Cliente;
