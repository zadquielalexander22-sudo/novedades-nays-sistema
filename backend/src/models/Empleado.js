// src/models/Empleado.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empleado = sequelize.define('Empleado', {
  id_empleado: {
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
  puesto: {
    type: DataTypes.STRING(100)
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2)
  },
  fecha_contratacion: {
    type: DataTypes.DATE
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'empleados',
  timestamps: true,
  underscored: true
});

module.exports = Empleado;
