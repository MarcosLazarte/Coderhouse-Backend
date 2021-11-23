import express from 'express';
import rutas from './rutas.js';

const hbs = express.Router();

hbs.get('/post', rutas.funcionHBSPost);
hbs.get('/vista', rutas.funcionHBSListar);
hbs.get('/actualizar', rutas.funcionHBSActualizar);
hbs.get('/actualizarTest', rutas.funcionHBSActualizarTest);
hbs.get('/borrar', rutas.funcionHBSBorrar);
hbs.get('/borrarTest', rutas.funcionHBSBorrarTest);

export {hbs};