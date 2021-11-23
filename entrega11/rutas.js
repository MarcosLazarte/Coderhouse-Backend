import fs from 'fs';

class Rutas {
    constructor(){
        this.productos = [];
        this.listar = '/productos/listar';
        this.actualizar = '/actualizar/:id'; //thunder
        this.id = '/mensajes/id';
        this.items = '/items';
        this.itemsRandom = '/items-random';
        this.visitas = '/visitas';
        this.productoById = '/mensajes/:id';
        this.guardar = '/guardar'; //thunder
        this.borrar = '/borrar/:id'; //thunder
        this.obtener = '/obtener';
        this.visitasItems = 0;
        this.visitasItemsRandom = 0;
        this.vista = '/productos/vista';
    }
    funcionGuardar(req,res){
        console.log('post request a api/guardar recibido');
        let body = req.body;
        Guardar(body);
        console.log(body); //Muestro lo que recibí
        const objRes = {
            loQueMandaste: body,
        };
        res.redirect('http://localhost:8080/pug/post'); //PROBLEMA Acá debería poner algo para que regrese al que lo llame
    }
    funcionObtener(req,res){
        res.json(Leer());
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
    funcionPUGPost(req,res){
        res.render('post.pug');
    }
    funcionPUGListar(req,res){
        let data = Leer();
        if (data.length == 0){
            var listExists = false;
            data = {error:'No hay productos'};
        } else{
            var listExists = true;
        }
        res.render('vista.pug', {productos: data, listExists}); //test - Funcionaba con listExists: true
    }
    funcionPUGActualizar(req,res){
        let data = Leer();
        if (data.length == 0){
            var listExists = false;
            data = {error:'No hay productos'};
        } else{
            var listExists = true;
        }
        console.log(data);
        res.render('actualizar.pug', {productos: data, listExists});
    }
    funcionPUGActualizarTest(req, res){
        if(typeof(req.query.id) != 'string' && typeof(req.query.id) != 'number'){
            console.log(typeof(req.query.id));
            res.send('No deberias estar aqui');
        }else{
            const id = req.query.id;
            const title = req.query.title;
            const price = req.query.price;
            const thumbnail = req.query.thumbnail;
            const productoObjeto = {
                id,
                title,
                price,
                thumbnail
            };
            let data = Leer();
            const index = BuscarIndex(data, id);
            if(typeof(index) == 'undefined'){
                res.send('ID no existente')
            } else {
                console.log(index); 
                data.splice(index, 1, productoObjeto);
                fs.unlinkSync('./productos.txt')<
                Guardar(data);
                res.render('actualizar.pug', {productos: data, listExists: true});
            }
        }
    }
    funcionPUGBorrar(req, res){
        let data = Leer();
        if(data.length == 0){
            var listExists = false;
            data = {error: 'No hay productos'};
        } else {
            var listExists = true;
        }
        res.render('borrar.pug', {productos: data, listExists});
    }
    funcionPUGBorrarTest(req, res){
        let dataParaBorrar = Leer();
        const index = BuscarIndex(dataParaBorrar, req.query.id);
        if(typeof(index) == 'undefined'){
            res.send('ID no existente')
        } else {
            let dataEliminada = dataParaBorrar.splice(index, 1);
            fs.unlinkSync('./productos.txt');
            Guardar(dataParaBorrar);
            const objRes = {
                id: index,
                productoEliminado: dataEliminada[0],
                error: false
            }
            res.render('borrar.pug', {productos: dataParaBorrar, listExists: true});
        }
    }
}
function BuscarIndex(data, queryID){
    for(let i = 0; i<data.length; i++){
        if(data[i].id == queryID){
            console.log(data[i].id)
            return i;
        }
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
            if(arrayProductos.length == 0){ //Cuando borraba todo y quedaba un array vacio, no entendia como agregar, por eso estas lineas
                let productomasId = Object.assign(body,{id:0})
                arrayProductos.push(productomasId);
                console.log(arrayProductos)
                fs.unlinkSync('./productos.txt');
                try{
                    fs.appendFileSync('./productos.txt', `${JSON.stringify(arrayProductos)}\n`);
                }catch(error){
                    console.log(productoMasId)
                    fs.writeFileSync('./productos.txt', `${JSON.stringify(arrayProductos)}\n`);
                }
            } else {
                let ubicacionId = arrayProductos.length - 1; //Detecto el lugar donde estaría el ultimo producto del array para encontrar el id
                let id2 = parseInt(arrayProductos[ubicacionId].id, 10) + 1; //Ya no suma string más un int
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

        }
    });
}

const rutas = new Rutas();
export default rutas;