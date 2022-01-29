const socket = io()

socket.on('chatGlobal', data => {
    console.log('broadcast: ', data)
    render(data)
})

function enviarMensaje(){
    console.log("holis")
    var mensaje = {
        autor: document.getElementById("autor").value,
        texto: document.getElementById("texto").value
    }
    socket.emit('new-message', mensaje)
}
function sendMsg(event){
    event.preventDefault()
    let msg = {
        autor: event.target.elements.author.value,
        texto: event.target.elements.text.value
    }
    socket.emit('new-message', msg)
    return false
}
function render(data){
    var html = data.map((elem, index) => {
        return  `<div>
                    <strong>${elem.id}</strong>
                    <em>${elem.mensaje.autor}</em>
                    <em>${elem.mensaje.texto}</em>
                </div>`
    }).join(' ')
    document.getElementById('mensajes').innerHTML = html
}