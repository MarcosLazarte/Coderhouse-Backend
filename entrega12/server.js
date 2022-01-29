import express from 'express';
import http from 'http';
import {rutas, Leer} from './rutas.js';
import {ejs} from './api.js';
import socketIo from 'socket.io';

const app = express();
const server = http.Server(app);
const PORT = 8080;
const io = socketIo(server);

//Para que funcione el __dirname en type:module
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
//Para que funcione el __dirname en type:module

app.use(express.static('public'));

server.listen(PORT, () => {
    console.log('escuchando');
});
server.on('error', error =>console.log("error en el servidor", error));

app.use(express.json()); //Linea clave que sin ella no sirve nada
app.use(express.urlencoded({extended: true})); //Linea Clave que sin ella no sirve nada

app.use('/ejs', ejs);

//Handlebars
app.set('views','./viewsEJS');
app.set('view engine', 'ejs');
//Handlebars

app.get(rutas.obtener, rutas.funcionObtener);
app.post(rutas.guardar, rutas.funcionGuardar);
app.delete(rutas.borrar, rutas.funcionBorrar); //Metodo Delete para borrar por ID
app.put(rutas.actualizar, rutas.funcionActualizar); //Metodo PUT para actualizar por ID

io.on('connection', (socket) => {
    let productos = Leer();
    console.log("cliente conectado");
    io.sockets.emit('global', productos);

    socket.on("primerCambio", (data) => {
        console.log("se agrego");
        io.sockets.emit('global', productos);
    })
})