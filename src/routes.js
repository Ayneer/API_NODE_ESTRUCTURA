const express = require('express');
const routes = express.Router();

//Constroladores
const cUsuario = require('./controllers/usuarios');

//Rutas para funcionalidades del modelo usuario
routes.post('/crear_usuario', cUsuario.crear);

module.exports = routes;