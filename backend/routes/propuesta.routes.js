const express = require('express');
const routerPropuesta = express.Router();

const propuesta = require('../controllers/propuesta.controller');

routerPropuesta.get('/',propuesta.getPropuestas);
routerPropuesta.post('/',propuesta.createPropuesta);
routerPropuesta.get('/:id',propuesta.getPropuesta);
routerPropuesta.put('/:id',propuesta.editPropuesta);
routerPropuesta.delete('/:id',propuesta.deletePropuesta);

routerPropuesta.get('/usuario/:usuario',propuesta.getPropuestasUsuario);

module.exports = routerPropuesta;