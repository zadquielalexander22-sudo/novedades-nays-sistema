// src/routes/productoRoutes.js
const express = require('express');
const productoController = require('../controllers/productoController');
const { autenticar, autorizar } = require('../middleware/auth');

const router = express.Router();

router.get('/', autenticar, productoController.obtenerProductos);
router.get('/stock-bajo', autenticar, productoController.obtenerStockBajo);
router.get('/:id', autenticar, productoController.obtenerProductoId);
router.post('/', autenticar, autorizar(['admin', 'gerente']), productoController.crearProducto);
router.put('/:id', autenticar, autorizar(['admin', 'gerente']), productoController.actualizarProducto);
router.delete('/:id', autenticar, autorizar(['admin']), productoController.eliminarProducto);

module.exports = router;
