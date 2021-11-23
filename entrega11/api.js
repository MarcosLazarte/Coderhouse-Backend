import express from 'express';
import rutas from './rutas.js';

const pug = express.Router();

pug.get('/post', rutas.funcionPUGPost);
pug.get('/vista', rutas.funcionPUGListar);
pug.get('/actualizar', rutas.funcionPUGActualizar);
pug.get('/actualizarTest', rutas.funcionPUGActualizarTest);
pug.get('/borrar', rutas.funcionPUGBorrar);
pug.get('/borrarTest', rutas.funcionPUGBorrarTest);

export {pug};