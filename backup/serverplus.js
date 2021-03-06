import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import rutas from './rutas.js';
import {router, hbs, pug} from './api.js';
//import hbs from './api.js';
//import pug from './api.js';

const test = 4; //constante test
const app = express();
const server = http.Server(app);
const io = socketIo(server);
const PORT = 8080;

//Para que funcione el __dirname en type:module
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
//Para que funcione el __dirname en type:module

app.use(express.static('public'));

/* const server2 = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando en el puerto', server.address().port);
});
server2.on('error', error=>console.log('Error en servidor', error));
 */
server.listen(PORT, () => {
    console.log('escuchando');
});
server.on('error', error =>console.log("error en el servidor", error));

const mensajes = [{nombre:"Aky", texto:'Prueba'}];

io.on('connection', (socket) => { //socket es el que se quiere conectar conmigo
    console.log('cliente conectado');
    socket.emit('mensajes', mensajes);
    socket.on('nuevo', (data) => {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    })
});

app.use(express.json()); //Linea Clave que sin ella no sirve nada
app.use(express.urlencoded({extended: true})); //Linea Clave que sin ella no sirve nada

app.use('/api', router);//Le digo a router que use esa salida
app.use('/pug', pug);
app.use('/hbs', hbs);

//Pug
app.set('views','./viewsPUG');
app.set('view engine', 'pug');
//Pug

//Handlebars
//app.set('views', __dirname + '/viewsHBS');
//app.set('view engine', 'hbs')
//Handlebars

//pug.get('/vista', rutas.funcionPUGListar);
app.post(rutas.guardar, rutas.funcionGuardar);
app.delete(rutas.borrar, rutas.funcionBorrar); //Metodo Delete para borrar por ID
app.put(rutas.actualizar, rutas.funcionActualizar); //Metodo PUT para actualizar por ID
