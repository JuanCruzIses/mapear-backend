import express from 'express';
import {login, register, userTravell, userDetail, newPassword} from '../controllers/userController.js';
const router = express.Router();

//Login y registro de usuario
router.post('/login', login);
router.post('/register', register)

//Lista todos los viajes de un usuario en particular
router.get('/viaje/:id', userTravell)

//Actividades o provincias favoritos del usuario (Lista todos los favoritos, agrega un favorito, elimina un favorito)
router.get('/favoritos/:id')
router.post('/favoritos/:id')

//Info del usuario
router.get('/detail/:id', userDetail)
router.put('/', newPassword)

export default router