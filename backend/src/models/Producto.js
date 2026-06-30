// src/models/Producto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'id_categoria'
    }
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stock_minimo: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  sku: {
    type: DataTypes.STRING(50),
    unique: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'productos',
  timestamps: true,
  underscored: true
});

Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });

module.exports = Producto;
