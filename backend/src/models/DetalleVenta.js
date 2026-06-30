// src/models/DetalleVenta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Venta = require('./Venta');
const Producto = require('./Producto');

const DetalleVenta = sequelize.define('DetalleVenta', {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_venta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Venta,
      key: 'id_venta'
    }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id_producto'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.cantidad * this.precio_unitario;
    }
  }
}, {
  tableName: 'detalle_venta',
  timestamps: true,
  underscored: true
});

DetalleVenta.belongsTo(Venta, { foreignKey: 'id_venta' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = DetalleVenta;
