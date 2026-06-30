// src/models/Proveedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

const Proveedor = sequelize.define('Proveedor', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100)
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'id_categoria'
    }
  },
  contacto: {
    type: DataTypes.STRING(100)
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'proveedores',
  timestamps: true,
  underscored: true
});

Proveedor.belongsTo(Categoria, { foreignKey: 'id_categoria' });

module.exports = Proveedor;
