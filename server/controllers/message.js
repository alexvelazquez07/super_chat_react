import Message from "../models/message.js";



var controller = {
    //funcion para guardar los mensajes
    save: (req, res) => {
        var params = req.body
        var message = new Message()
        message.message = params.message
        message.from= params.from

        message.create((error, messageStored)=> {
            if (error || !messageStored){
                return res.status(404).send({
                    status : 'error',
                    message : 'No ha sido posible guardar el mensaje'
                })
            }
            return res.status(200).send({
                status : 'Success',
                messageStored
            })
        })

    },
    //Crear mensaje
 crearMensaje:(req, res)=>{
    Message.create(req.body)
    .then((resultado)=>{
        console.log(req.body)
        res.json(resultado)
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
    //Funcion para obtener todos los mensajes
    getMessages: (req, res) => {
        console.log('Llegue hasta aca')
        var query = Message.find({})
        query.sort('-_id').then((error, messages) => {
           
            if (error){
                return  res.status(500).send({
                    status : 'Error',
                    messages : "Error al extraer los datos"
                    
                })
            }
            if (!messages){
                return  res.status(404).send({
                    status : 'Error',
                    messages : "No hay mensajes que mostrar"
                })
            }
            return res.status(200).send({
                status : 'Success',
                messages

            })
        })
    },
    get_all: (req, res) =>{
        Message.find()
        .then(messages =>res.json(messages))
        .catch(err => res.json({message:"hubo un error"+err}));
      }
    
}

export default controller