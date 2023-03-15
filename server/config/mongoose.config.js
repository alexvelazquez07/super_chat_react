mongoose.Promise = global.Promise
const mongoose = require ('mongose')

mongoose.connect('mongodb://54.146.13.44:27017/chat', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
 .then(() => console.log('Conexion exitosa'))
 .catch(err => console.log('Problemas al conectar la base de datos : ',))