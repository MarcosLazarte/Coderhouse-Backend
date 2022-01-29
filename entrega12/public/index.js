const socket = io()

socket.on('global', data => {
    dibujar(data);
});

function emitCambio(event){
    let nuevoProd = {
        title: event.target.elements.title.value,
        price: event.target.elements.price.value,
        thumbnail: event.target.elements.thumbnail.value
    }
    socket.emit('primerCambio', nuevoProd)
}
function cambio(){
    alert("presionaste el boton")
    let html = "hola, presionaste el boton";
    document.getElementById("global").innerHTML = html;
}
function dibujar(data){
    let html = data.map((elem, index) => {
        return `
            <div>
                <p>${elem.title}</p>
                <p>${elem.price}</p>
                <p>${elem.thumbnail}</p>
            </div>
        `
    }).join(' ')
    document.getElementById("global").innerHTML = html;
}