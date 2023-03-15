import express from 'express'
import controller from '../controllers/message.js'

var router = express.Router();

router.post('/save', controller.crearMensaje)
router.get('/messages', controller.getMessages)

export default router