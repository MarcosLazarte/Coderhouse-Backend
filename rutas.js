import fs from 'fs';

class Rutas {
    constructor(){
        this.productos = [];
        this.listar = '/productos/listar';
        this.actualizar = '/productos/actualizar/:id'; //thunder
        this.id = '/mensajes/id';
        this.items = '/items';
        this.itemsRandom = '/items-random';
        this.visitas = '/visitas';
        this.productoById = '/mensajes/:id';
        this.guardar = '/guardar'; //thunder
        this.borrar = '/borrar/:id'; //thunder
        this.visitasItems = 0;
        this.visitasItemsRandom = 0;
        this.vista = '/productos/vista';
    }
    funcionListar(req, res){
        let data = Leer();
        data.length == 0 ? data={error:'No hay productos cargados'} : data;
        res.send(`
        <ul style="background-color:orange;list-style:none;text-align:center">
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080">HOME</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/productos/listar">listar</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items">items</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items-random">items-random</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/visitas">visitas</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/api/mensajes/id">id</a></li>
        </ul>
        <div><pre> ${JSON.stringify(data, null, 4)}</pre></div>
        `);
    }
    funcionId(req,res){
        let data = Leer();
        data.length == 0 ? data={error:'No hay productos cargados'} : data;
        let mostrarCantidad;
        typeof(data.length) == 'number' ? mostrarCantidad=data.length : mostrarCantidad=0;  //Sí no existe el .txt, asigna un 0 a la cantidad de objetos
        res.send(`
        <ul style="background-color:orange;list-style:none;text-align:center">
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080">HOME</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/productos/listar">listar</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items">items</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items-random">items-random</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/visitas">visitas</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/mensajes/id">id</a></li>
        </ul>
        <h3>Para ver los producto por su id, reemplazar el id por un número en la barra de dirección</h3>
        <div><pre>Articulos cargados ${mostrarCantidad}</pre></div>
        `);
    }
    funcionItems(req, res){
        rutas.ContadorItems();
        let data2 = Leer();
        let auxNombres = [];
        for(let i = 0; i < data2.length; i++){
            auxNombres.push(data2[i].title);
        }
        auxNombres.length == 0 ? auxNombres="No hay objetos" : auxNombres;
        res.send(`
        <ul style="background-color:orange;list-style:none;text-align:center">
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080">HOME</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/productos/listar">listar</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items">items</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items-random">items-random</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/visitas">visitas</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/mensajes/id">id</a></li>
        </ul>
        <div style="">items: ${auxNombres}, cantidad: ${data2.length}</div>`);
    }
    funcionItemsRandom(req, res){
        rutas.ContadorItemsRandom();
        let data = Leer();
        let auxNombres = [];
        for(let i = 0; i < data.length; i++){
            auxNombres.push(data[i].title);
        }
        auxNombres.length == 0 ? auxNombres[0]="No hay objetos para generar un articulo aleatorio" : auxNombres;
        let numRandom = parseInt(Math.random() * (data.length - 0) + 0, 10);
        res.send(`
        <ul style="background-color:orange;list-style:none;text-align:center">
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080">HOME</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/productos/listar">listar</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items">items</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items-random">items-random</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/visitas">visitas</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/mensajes/id">id</a></li>
        </ul>
        
        <div>random ${auxNombres[numRandom]} ${numRandom}</div>`);
    }
    funcionVisitas(req, res){
        let objetoVisitas = {
            visitas : {
                items: rutas.visitasItems,
                itemsRandom: rutas.visitasItemsRandom,
            }
        }
        res.send(`
        <ul style="background-color:orange;list-style:none;text-align:center">
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080">HOME</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/productos/listar">listar</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items">items</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items-random">items-random</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/visitas">visitas</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/mensajes/id">id</a></li>
        </ul>
        <div>Visitas ${JSON.stringify(objetoVisitas)}</div>`);
    }
    funcionProductoById(req, res){
        let idBuscado = req.params.id;
        let data = Leer();
        let datoBuscado = data.filter((e) => e.id == idBuscado);
        datoBuscado.length == 0 ? datoBuscado={error:'Producto no encontrado'}  :  datoBuscado;
        res.send(`
        <ul style="background-color:orange;list-style:none;text-align:center">
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080">HOME</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/productos/listar">listar</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items">items</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/items-random">items-random</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/visitas">visitas</a></li>
            <li style="display:inline;margin-left:5vw"><a href="http://localhost:8080/api/mensajes/id">id</a></li>
        </ul>
        <div>Producto buscado: ${JSON.stringify(datoBuscado)}`);
    }
    funcionGuardar(req,res){
        console.log('post request a api/guardar recibido');
        let body = req.body;
        Guardar(body);
        console.log(body); //Muestro lo que recibí
        const objRes = {
            loQueMandaste: body,
        };
        res.send(`
        </div style='display=flex,flex-direction=column'>
            <div>${JSON.stringify(objRes)} <a href='http://localhost:8080/handlebars/post'></div>
            <button style='background-color: orange'> Volver </button></a>
        </div>`); //Respuesta por el comando POST
    }
    funcionBorrar(req,res){
        let dataParaBorrar = Leer();
        let idAEliminar = req.params.id;
        let dataEliminada = dataParaBorrar.splice(idAEliminar, 1);
        fs.unlinkSync('./productos.txt');
        Guardar(dataParaBorrar);
        const objRes = {
            id: idAEliminar,
            productoEliminado: dataEliminada[0],
            error: false
        }
        res.json(objRes);
    }
    funcionActualizar(req,res){
        let data = Leer();
        let idAActualizar = req.params.id;        
        let dataNueva = req.body;
        let idProducto = {id: idAActualizar};
        let productoActualizadoMasId = Object.assign(dataNueva,idProducto);
        data.splice(idAActualizar, 1, productoActualizadoMasId);
        fs.unlinkSync('./productos.txt');
        Guardar(data);
        res.json(productoActualizadoMasId);
    }
    funcionHBSPost(req,res){
        res.render('index.hbs');
    }
    funcionHBSListar(req,res){
        let data = Leer();
        if (data.length == 0){
            var listExists = false;
            data = {error:'No hay productos'};
        } else{
            var listExists = true;
        }
        res.render('listar.hbs', {suggestedChamps: data, listExists}); //test - Funcionaba con listExists: true
    }
    ContadorItemsRandom(){
        ++this.visitasItemsRandom;
        return this.visitasItemsRandom;
    }
    ContadorItems(){
        ++this.visitasItems;
        return this.visitasItems;
    }
}
function Leer(){ //Devuelve array con los objetos
    try{
        let data = fs.readFileSync('./productos.txt', 'utf-8'); //Leo
        let dataParseada=JSON.parse(data);
        dataParseada.join('\n');
        return dataParseada;
    }catch(error){
        return []; //Sí no encuentro al archivo, devuelvo array vacio
    }
}
function Guardar(body){
    fs.readFile('./productos.txt', 'utf-8', (error, contenido) => {
        if(error){  //sí no existe, lo crea
            if(Array.isArray(body)){ //Si lo que le paso es un array, entonces lo guarda así crudo
                try{
                    fs.appendFileSync('./productos.txt', `${JSON.stringify(body)}\n`);
                }catch(error){
                    console.log(productoMasId)
                    fs.writeFileSync('./productos.txt', `${JSON.stringify(body)}\n`);
                }
            }else{ //sí no existe, lo crea
                console.log("entre al if object")
                let arrayProductos = [];
                let productomasId = Object.assign(body,{id:0})
                arrayProductos.push(productomasId);
                try{
                    fs.appendFileSync('./productos.txt', `${JSON.stringify(arrayProductos)}\n`);
                }catch(error){
                    console.log(productoMasId)
                    fs.writeFileSync('./productos.txt', `${JSON.stringify(arrayProductos)}\n`);
                }
            }
        }else{ //existe, entonces añade
            let arrayProductos = JSON.parse(contenido);
            let ubicacionId = arrayProductos.length - 1; //Detecto el lugar donde estaría el ultimo producto del array para encontrar el id
            let id2 = arrayProductos[ubicacionId].id + 1;
            let idProducto2 = {id: id2}
            let productoMasId = Object.assign(body,idProducto2);
            
            arrayProductos.push(productoMasId);
            console.log(arrayProductos)
            fs.unlinkSync('./productos.txt');
            try{
                fs.appendFileSync('./productos.txt', `${JSON.stringify(arrayProductos)}\n`);
            }catch(error){
                console.log(productoMasId)
                fs.writeFileSync('./productos.txt', `${JSON.stringify(arrayProductos)}\n`);
            }
        }
    });
}

const rutas = new Rutas();
export default rutas;