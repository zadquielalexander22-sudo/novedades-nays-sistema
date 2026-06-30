// src/controllers/clienteController.js
const Cliente = require('../models/Cliente');
const { Op } = require('sequelize');

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const { page = 1, limit = 10, buscar } = req.query;
    const offset = (page - 1) * limit;

    let where = { activo: true };

    if (buscar) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${buscar}%` } },
        { apellido_paterno: { [Op.like]: `%${buscar}%` } },
        { email: { [Op.like]: `%${buscar}%` } },
        { telefono: { [Op.like]: `%${buscar}%` } }
      ];
    }

    const { count, rows } = await Cliente.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['created_at', 'DESC']]
    });

    res.json({
      total: count,
      paginas: Math.ceil(count / limit),
      pagina_actual: page,
      clientes: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener cliente por ID
exports.obtenerClienteId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear cliente
exports.crearCliente = async (req, res) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, telefono, email, ine, direccion } = req.body;

    const cliente = await Cliente.create({
      nombre,
      apellido_paterno,
      apellido_materno,
      telefono,
      email,
      ine,
      direccion
    });

    res.status(201).json({
      mensaje: 'Cliente creado exitosamente',
      cliente
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    await cliente.update(req.body);

    res.json({
      mensaje: 'Cliente actualizado exitosamente',
      cliente
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar cliente (soft delete)
exports.eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    await cliente.update({ activo: false });

    res.json({ mensaje: 'Cliente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
