// src/models/Venta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Empleado = require('./Empleado');

const Venta = sequelize.define('Venta', {
  id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_venta: {
    type: DataTypes.STRING(20),
    unique: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: 'id_cliente'
    }
  },
  id_empleado: {
    type: DataTypes.INTEGER,
    references: {
      model: Empleado,
      key: 'id_empleado'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completada', 'cancelada'),
    defaultValue: 'completada'
  },
  metodo_pago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia', 'otro'),
    defaultValue: 'efectivo'
  },
  notas: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'ventas',
  timestamps: true,
  underscored: true
});

Venta.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Venta.belongsTo(Empleado, { foreignKey: 'id_empleado' });

module.exports = Venta;
