import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import rutas from './rutas2.js';
import rC from './api2.js';

import* as ExpressHandlebars from 'express-handlebars'; //Handlebars

const app = express();
const testServer = http.createServer(app);
const io = socketIo(testServer);
const PORT = 8080;
const handlebars = ExpressHandlebars(); //Handlebars

app.use(express.static('public'));
const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server.on('error', error=>console.log('Error en servidor', error));

testServer.listen(3030, () => {
    console.log('escuchando');
});
io.on('connection', (socket) => { //socket es el que se quiere conectar conmigo
    console.log('alguien se está conectando conmigo...');
});

app.use(express.json()); //Linea Clave que sin ella no sirve nada
app.use(express.urlencoded({extended: true})); //Linea Clave que sin ella no sirve nada

//app.use('/beRouterA', rA);Le digo a router que use esa salida
app.use('/router', rC);

//Pug
app.set('views', './viewsP');//motor de plantilla PUG
app.set('views engine', 'pug');//motor de plantilla PUG
rC.get('/routerC', (req,res) => {//motor de plantilla
    res.render('hello.pug', {mensaje:"estas en rA"});
});
//Pug

//Handlebars
//app.set("views", "./viewsH");
//app.set("views engine", "hbs");
//Handlebars
app.get(rutas.listar, rutas.funcionListar); //LISTAR
app.get(rutas.id, rutas.funcionId); //ID PARA INSTRUIR
app.get(rutas.items, rutas.funcionItems); //ITEMS
app.get(rutas.itemsRandom, rutas.funcionItemsRandom); //ITEMS-RANDOM
app.get(rutas.visitas, rutas.funcionVisitas); //VISITAS
app.get(rutas.productoById, rutas.funcionProductoById); //ID POR PRODUCTO

app.post(rutas.guardar, rutas.funcionGuardar);
app.delete(rutas.borrar, rutas.funcionBorrar); //Metodo Delete para borrar por ID
app.put(rutas.actualizar, rutas.funcionActualizar); //Metodo PUT para actualizar por ID
