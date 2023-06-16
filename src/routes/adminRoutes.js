import express from 'express';
const router = express.Router();
import {provinceDelete, activityList, activityCreate, activityDelete, travellList, travellDelete, userList, userDelete} from '../controllers/adminController.js';

//Control dinamico de provincias (Eliminar provincia en particular)
router.delete('provincia/:id', provinceDelete)

//Control dinamico de actividades (Listar actividades, eliminar actividad en particular)
router.get('/actividad/lista', activityList)
router.post('/actividad/crear', activityCreate)
router.delete('/actividad/:id', activityDelete)

//Control dinamico de viajes (Listar viajes, eliminar viaje en particular)
router.get('/viaje/lista', travellList)
router.delete('/viaje/:id', travellDelete)

//Control dinamico de usuarios (Listar usuarios, eliminar usuario en particular)
router.get('/usuario/lista', userList)
router.delete('/usuario/:id', userDelete)

export default router