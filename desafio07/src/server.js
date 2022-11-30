const express = require('express');
const handlebars = require('express-handlebars');
const {Server} = require("socket.io");
const {options} = require("./config/databaseConfig");
const Contenedor = require("./managers/contenedorProductos");
const ContenedorChat = require('./managers/contenedorChat');
const {ContenedorSQL} = require("./managers/contenedorSQL");

//service
const productosApi = new ContenedorSQL(options.mariaDB, "productos");
const chatApi = new ContenedorSQL(options.sqliteDB,"chat"); 

//server

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

//configuracion template engine handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

// routes
//view routes
app.get('/', async(req,res)=>{
    res.render('home')
})

router.get('/',async(req,res)=>{
    res.render('products',{products: await productosApi.getAll()})
})

router.get('/:id',async(req,res)=>{
    const productId = req.params.id;
    console.log(productId)
    const product = await productosApi.getById(parseInt(productId))
    console.log(product)
    return res.json(product)
   
})

router.post('/',async(req,res)=>{
    const newProduct = req.body;
    const result = await productosApi.save(newProduct);
    res.send(result);
})

router.put('/:id',async(req,res)=>{
    const cambioObj = req.body;
    const productId = req.params.id;
    const result = await productosApi.updateById(parseInt(productId),cambioObj);
    res.json(result);
})

router.delete('/:id',async(req,res)=>{
    const productId = req.params.id;
    const result = await productosApi.deleteById(parseInt(productId));
    res.json(result);
})

router.delete('/',async(req,res)=>{
    const result = await productosApi.deleteAll();
    res.json(result);
})


//express server
const server = app.listen(8080,()=>{
    console.log('listening on port 8080')
})
app.use("/api/productos", router)

//websocket server
const io = new Server(server);

//configuracion websocket
io.on("connection",async(socket)=>{
    //PRODUCTOS
    //envio de los productos al socket que se conecta.
    io.sockets.emit("products", await productosApi.getAll())

    //recibimos el producto nuevo del cliente y lo guardamos con filesystem
    socket.on("newProduct",async(data)=>{
        await productosApi.save(data);
        //despues de guardar un nuevo producto, enviamos el listado de productos actualizado a todos los sockets conectados
        io.sockets.emit("products", await productosApi.getAll())
    })

    //CHAT
    //Envio de todos los mensajes al socket que se conecta.
    io.sockets.emit("messages", await chatApi.getAll());

    //recibimos el mensaje del usuario y lo guardamos en el archivo chat.txt
    socket.on("newMessage",async(newMsg)=>{
        await chatApi.save(newMsg);
        io.sockets.emit("messages", await chatApi.getAll());
    })
});