const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

var mensajes = [
    {
        id: 1,
        mensaje:{
            autor: "Aky",
            texto: "Holangas!"
        }
    },
    {
        id: 2,
        mensaje:{
            autor: "Foop",
            texto: "Holitas :D"
        }
    },
]
app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})
http.listen(8080, () => console.log("SERVER ON"))

io.on('connection', (socket) => {
    console.log("Usuario conectado")
    
    socket.emit("chatGlobal", mensajes)

    socket.on("new-message", data => {
        console.log(data)
        mensajes.push({id: socket.id, mensaje: data});
        io.sockets.emit("chatGlobal", mensajes)
    })
})