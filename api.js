import express from 'express';
import rutas from './rutas.js';

const router = express.Router();

router.get(rutas.listar, rutas.funcionListar);
router.get(rutas.productoById, rutas.funcionProductoById);
router.get(rutas.id, rutas.funcionId); //ID PARA INSTRUIR
router.get(rutas.items, rutas.funcionItems); //ITEMS
router.get(rutas.itemsRandom, rutas.funcionItemsRandom); //ITEMS-RANDOM
router.get(rutas.visitas, rutas.funcionVisitas); //VISITAS

//app.set('views', path.join(__dirname, '../viewsP'));//motor de plantilla PUG
//app.set('viewsP engine', 'pug');//motor de plantilla PUG
//router.get('/pug', (req,res) => {//motor de plantilla
//    res.render('hello.pug', {mensaje:"estas en PUG"});
//});
export default router;
