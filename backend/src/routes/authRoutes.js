// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { autenticar } = require('../middleware/auth');

const router = express.Router();

router.post('/registro', authController.registro);
router.post('/login', authController.login);
router.get('/perfil', autenticar, authController.perfil);

module.exports = router;
