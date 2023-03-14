import express from "express";
import controller from "../controllers/message.js";

var router = express.Router()


//Definimos las rutas de la aplicacion
router.post('/save', controller.crearMensaje)
router.get('/messages', controller.get_all)

export default router