// src/routes/ventaRoutes.js
const express = require('express');
const ventaController = require('../controllers/ventaController');
const { autenticar, autorizar } = require('../middleware/auth');

const router = express.Router();

router.get('/', autenticar, ventaController.obtenerVentas);
router.get('/:id', autenticar, ventaController.obtenerVentaId);
router.post('/', autenticar, autorizar(['admin', 'vendedor', 'gerente']), ventaController.crearVenta);
router.post('/:id/cancelar', autenticar, autorizar(['admin', 'gerente']), ventaController.cancelarVenta);

module.exports = router;
