import express from 'express'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/message.js'
import bodyParser from 'body-parser'


//Configuracion Mongoose 
//var url = "mongodb://localhost:27017"
//Para evitar posible fallas con la comuncion con MongoDB


const app = express()
const PORT = 4000

//require('./config/mongoose.config')

//Creamos el servidor con el módulo http de node
const server = http.createServer(app)
//Utilizamos como servidor el proporcionado por socket.io. Configuramos cors indicando que cualquier servidor se puede conectar
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

//Middlewares
app.use(cors())
app.use(morgan('dev'))
//Cargamos el bodyParser: middleware para analizar cuerpos de a través de la URL
//Este analizador acepta solo la codificación UTF-8 contenida en el body
app.use(bodyParser.urlencoded({extended: false}))
//Cualquier tipo de petición lo convertimos a json:
app.use(bodyParser.json())
app.use('/api',router)

//Escuchamos la conexión de los clientes. Podemos imprimir el id del cliente conectado
io.on('connection', (socket) =>{
    //console.log('user connected')
    //console.log(socket.id)

    socket.on('message', (message, nickname) => {
        console.log(message)
        //Envio al resto de clientes con broadcast.emit
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })
    })
})
//Conexion a la BDD y escuchamos la aplicacion a trávez del puerto 4000
/*mongoose.connect(url,{useNewUrlParser: true}).then(()=> {
    console.log('Conexion a la BD realizada con éxito')
    server.listen(PORT, ()=> {
        console.log('Servidor ejecutándose en http://localhost:', PORT)
    })
}) */
mongoose.connect('mongodb://127.0.0.1:27017/chat', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
 .then(() => console.log('Conexion exitosa'))
 .catch(err => console.log('Problemas al conectar la base de datos : ',))


app.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto: ' + PORT)
})

