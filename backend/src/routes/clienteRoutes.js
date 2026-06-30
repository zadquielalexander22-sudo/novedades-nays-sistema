// src/routes/clienteRoutes.js
const express = require('express');
const clienteController = require('../controllers/clienteController');
const { autenticar, autorizar } = require('../middleware/auth');

const router = express.Router();

router.get('/', autenticar, clienteController.obtenerClientes);
router.get('/:id', autenticar, clienteController.obtenerClienteId);
router.post('/', autenticar, autorizar(['admin', 'gerente']), clienteController.crearCliente);
router.put('/:id', autenticar, autorizar(['admin', 'gerente']), clienteController.actualizarCliente);
router.delete('/:id', autenticar, autorizar(['admin']), clienteController.eliminarCliente);

module.exports = router;
