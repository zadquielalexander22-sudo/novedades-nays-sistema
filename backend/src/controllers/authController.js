// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Registro de usuario
exports.registro = async (req, res) => {
  try {
    const { email, password, nombre, rol } = req.body;

    // Verificar si usuario existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Hashear contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const usuario = await Usuario.create({
      email,
      password: passwordHash,
      nombre,
      rol: rol || 'vendedor'
    });

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: {
        id_usuario: usuario.id_usuario,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    // Generar token
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        email: usuario.email,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener perfil
exports.perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id_usuario, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
