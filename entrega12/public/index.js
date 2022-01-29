const socket = io()

alert("holis")

socket.on('global', data => {
    dibujar(data);
});
function emitCambio(event){
    event.preventDefault()
    let nuevoProd = {
        title: event.target.elements.title.value,
        price: event.target.elements.price.value,
        thumbnail: event.target.elements.thumbnail.value,
    }
    socket.emit('primerCambio', nuevoProd)
    alert("holis")
    return false
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