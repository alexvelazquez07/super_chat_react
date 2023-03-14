mongoose.Promise = global.Promise
const mongoose = require ('mongose')

mongoose.connect('mongodb://127.0.0.1:27017/chat', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
 .then(() => console.log('Conexion exitosa'))
 .catch(err => console.log('Problemas al conectar la base de datos : ',))