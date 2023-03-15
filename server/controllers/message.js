import Message from '../models/message.js'

var controller = {

//Guardar mensajes
 crearMensaje:(req, res)=>{

    var params = req.body
    var message = new Message()
    message.message = params.message
    message.from = params.from
    console.log(message)

    Message.create(params)
    .then((resultado)=>{
        console.log(req.body)
        res.json(resultado,messageStored)
        return res.status(200).send({
            status : 'Success',
            messageStored
        })
    }).catch((error)=>{
        console.log(error)
        return res.status(404).send({
            status : 'error',
            message : 'No ha sido posible guardar el mensaje'
        })
    })
  },
    //Función para guardar un mensaje
    save: (req, res) => {
        var params = req.body
        var message = new Message()
        message.message = params.message
        message.from = params.from
        console.log(message)
        message.save((error, messageStored) =>{
            if(error || !messageStored){
                return res.status(404).send({
                    status: 'error',
                    message: 'No ha sido posible guardar el mensaje'
                })
            }
            return res.status(200).send({
                status: 'success',
                messageStored
            })

        })
    },

    //Función para obtener los mensajes
    getMessages: (req, res) => {
        var query = Message.find({})

        query.sort('-_id').then((error, messages) => {
            if(error){
				return res.status(500).send({
					status: "error",
					message: "Error al extraer los datos"
				})
			}

			//Si no existen artículos:
			if(!messages){
				return res.status(404).send({
					status: "error",
					message: "No hay mensajes para mostrar"
				})
			}

			return res.status(200).send({
				status: "success",
				messages
			})

        })
    }
}

export default controller