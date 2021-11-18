import express from 'express';
import rutas from './rutas.js';

const router = express.Router();
const pug = express.Router();
const hbs = express.Router();

router.get(rutas.listar, rutas.funcionListar);
router.get(rutas.productoById, rutas.funcionProductoById);
router.get(rutas.id, rutas.funcionId); //ID PARA INSTRUIR
router.get(rutas.items, rutas.funcionItems); //ITEMS
router.get(rutas.itemsRandom, rutas.funcionItemsRandom); //ITEMS-RANDOM
router.get(rutas.visitas, rutas.funcionVisitas); //VISITAS

hbs.get('/post', rutas.funcionHBSPost);
hbs.get('/vista', rutas.funcionHBSListar);
hbs.get('/actualizar', rutas.funcionHBSActualizar);
hbs.get('/actualizarTest', rutas.funcionHBSActualizarTest);
hbs.get('/borrar', rutas.funcionHBSBorrar);
hbs.get('/borrarTest', rutas.funcionHBSBorrarTest);

pug.get('/vista', rutas.funcionPUGListar);

//app.set('views', path.join(__dirname, '../viewsP'));//motor de plantilla PUG
//app.set('viewsP engine', 'pug');//motor de plantilla PUG
//router.get('/pug', (req,res) => {//motor de plantilla
//    res.render('hello.pug', {mensaje:"estas en PUG"});
//});
export {router, hbs, pug};
//module.exports = router;
//module.exports = hbs;
//export default router;