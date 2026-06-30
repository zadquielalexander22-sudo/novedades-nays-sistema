// src/models/index.js
const Usuario = require('./Usuario');
const Cliente = require('./Cliente');
const Empleado = require('./Empleado');
const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Proveedor = require('./Proveedor');
const Venta = require('./Venta');
const DetalleVenta = require('./DetalleVenta');

// Relationships
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Proveedor.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Venta.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Venta.belongsTo(Empleado, { foreignKey: 'id_empleado' });
Venta.hasMany(DetalleVenta, { foreignKey: 'id_venta' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'id_venta' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = {
  Usuario,
  Cliente,
  Empleado,
  Categoria,
  Producto,
  Proveedor,
  Venta,
  DetalleVenta
};
