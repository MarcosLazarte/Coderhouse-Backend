import express from 'express';
import {rutas} from './rutas.js';

const ejs = express.Router();

ejs.get('/vista', rutas.funcionEJSListar);
ejs.get('/post', rutas.funcionEJSPost);
ejs.get('/actualizar', rutas.funcionEJSActualizar);
ejs.get('/actualizarTest', rutas.funcionEJSActualizarTest);
ejs.get('/borrar', rutas.funcionEJSBorrar);
ejs.get('/borrarTest', rutas.funcionEJSBorrarTest);

export {ejs};