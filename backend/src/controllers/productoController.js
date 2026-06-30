// src/controllers/productoController.js
const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');
const { Op } = require('sequelize');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const { page = 1, limit = 10, buscar, id_categoria } = req.query;
    const offset = (page - 1) * limit;

    let where = { activo: true };

    if (buscar) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${buscar}%` } },
        { descripcion: { [Op.like]: `%${buscar}%` } },
        { sku: { [Op.like]: `%${buscar}%` } }
      ];
    }

    if (id_categoria) {
      where.id_categoria = id_categoria;
    }

    const { count, rows } = await Producto.findAndCountAll({
      where,
      include: [{ model: Categoria, attributes: ['id_categoria', 'nombre'] }],
      limit: parseInt(limit),
      offset,
      order: [['created_at', 'DESC']]
    });

    res.json({
      total: count,
      paginas: Math.ceil(count / limit),
      pagina_actual: page,
      productos: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener producto por ID
exports.obtenerProductoId = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [{ model: Categoria, attributes: ['id_categoria', 'nombre'] }]
    });

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, id_categoria, precio, stock, stock_minimo, sku } = req.body;

    const producto = await Producto.create({
      nombre,
      descripcion,
      id_categoria,
      precio,
      stock,
      stock_minimo: stock_minimo || 10,
      sku
    });

    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.update(req.body);

    res.json({
      mensaje: 'Producto actualizado exitosamente',
      producto
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.update({ activo: false });

    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener productos con stock bajo
exports.obtenerStockBajo = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: {
        activo: true,
        [Op.sequelize.where(
          Op.sequelize.col('stock'),
          Op.lte,
          Op.sequelize.col('stock_minimo')
        )]
      },
      include: [{ model: Categoria, attributes: ['id_categoria', 'nombre'] }]
    });

    res.json({
      total: productos.length,
      productos
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
