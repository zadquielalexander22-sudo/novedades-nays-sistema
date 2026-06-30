// src/controllers/ventaController.js
const Venta = require('../models/Venta');
const DetalleVenta = require('../models/DetalleVenta');
const Cliente = require('../models/Cliente');
const Empleado = require('../models/Empleado');
const Producto = require('../models/Producto');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

// Generar número de venta
const generarNumeroVenta = async () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const ultimaVenta = await Venta.max('id_venta');
  const numero = String((ultimaVenta || 0) + 1).padStart(5, '0');
  return `VTA-${año}${mes}-${numero}`;
};

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
  try {
    const { page = 1, limit = 10, estado, fecha_inicio, fecha_fin } = req.query;
    const offset = (page - 1) * limit;

    let where = {};

    if (estado) {
      where.estado = estado;
    }

    if (fecha_inicio || fecha_fin) {
      where.fecha = {};
      if (fecha_inicio) where.fecha[Op.gte] = new Date(fecha_inicio);
      if (fecha_fin) where.fecha[Op.lte] = new Date(fecha_fin);
    }

    const { count, rows } = await Venta.findAndCountAll({
      where,
      include: [
        { model: Cliente, attributes: ['id_cliente', 'nombre', 'apellido_paterno'] },
        { model: Empleado, attributes: ['id_empleado', 'nombre', 'apellido_paterno'] }
      ],
      limit: parseInt(limit),
      offset,
      order: [['fecha', 'DESC']]
    });

    res.json({
      total: count,
      paginas: Math.ceil(count / limit),
      pagina_actual: page,
      ventas: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener venta por ID con detalles
exports.obtenerVentaId = async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id, {
      include: [
        { model: Cliente },
        { model: Empleado },
        {
          model: DetalleVenta,
          include: [{ model: Producto }]
        }
      ]
    });

    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear venta
exports.crearVenta = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id_cliente, id_empleado, detalles, metodo_pago, notas } = req.body;

    // Validar cliente
    const cliente = await Cliente.findByPk(id_cliente, { transaction: t });
    if (!cliente) {
      await t.rollback();
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    // Calcular total
    let total = 0;
    for (let detalle of detalles) {
      const producto = await Producto.findByPk(detalle.id_producto, { transaction: t });
      if (!producto) {
        await t.rollback();
        return res.status(404).json({ mensaje: `Producto ${detalle.id_producto} no encontrado` });
      }

      if (producto.stock < detalle.cantidad) {
        await t.rollback();
        return res.status(400).json({ mensaje: `Stock insuficiente para ${producto.nombre}` });
      }

      total += producto.precio * detalle.cantidad;
    }

    // Crear venta
    const numero_venta = await generarNumeroVenta();
    const venta = await Venta.create(
      {
        numero_venta,
        id_cliente,
        id_empleado,
        total,
        metodo_pago,
        notas
      },
      { transaction: t }
    );

    // Crear detalles y actualizar stock
    for (let detalle of detalles) {
      const producto = await Producto.findByPk(detalle.id_producto, { transaction: t });

      await DetalleVenta.create(
        {
          id_venta: venta.id_venta,
          id_producto: detalle.id_producto,
          cantidad: detalle.cantidad,
          precio_unitario: producto.precio
        },
        { transaction: t }
      );

      // Actualizar stock
      await producto.update(
        { stock: producto.stock - detalle.cantidad },
        { transaction: t }
      );
    }

    await t.commit();

    const ventaCreada = await Venta.findByPk(venta.id_venta, {
      include: [{ model: DetalleVenta, include: [{ model: Producto }] }]
    });

    res.status(201).json({
      mensaje: 'Venta creada exitosamente',
      venta: ventaCreada
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

// Cancelar venta
exports.cancelarVenta = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const venta = await Venta.findByPk(req.params.id, { transaction: t });

    if (!venta) {
      await t.rollback();
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Obtener detalles
    const detalles = await DetalleVenta.findAll({
      where: { id_venta: venta.id_venta },
      transaction: t
    });

    // Devolver stock
    for (let detalle of detalles) {
      const producto = await Producto.findByPk(detalle.id_producto, { transaction: t });
      await producto.update(
        { stock: producto.stock + detalle.cantidad },
        { transaction: t }
      );
    }

    // Actualizar estado de venta
    await venta.update({ estado: 'cancelada' }, { transaction: t });

    await t.commit();

    res.json({
      mensaje: 'Venta cancelada exitosamente',
      venta
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};
