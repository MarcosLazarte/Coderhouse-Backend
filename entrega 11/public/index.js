/* import express from "express";
import rutas from "../rutas.js";
import http from 'http';
import socketIo from 'socket.io';
 */
/* const app = express();
const testServer = http.Server(app);
const socket = socketIo(testServer);
 */

const socket = io();

socket.on('mensajes', (data) => {
    render(data);
});
let render = (data) => {
    let html =
    data.map((m) =>
        `
            <div class="fila">
                <strong>${m.nombre}</strong>
                <em>${m.texto}</em>
            </div>    
        `
    ).join(' ');
    document.getElementById('mensajes').innerHTML = html;
}
function enviarMensajes() {
    let nombre = document.getElementById('nombre').value;
    let texto = document.getElementById('mensaje').value;
    socket.emit('nuevo', {nombre, texto});

    document.getElementById('productosListar').innerHTML = "helper";

    return false;
}
//const data = Guardar();
//const productosListar = document.getElementById("productosListar");
//document.getElementById("productosListar").innerHTML = data;
//productosListar.append("hola");
