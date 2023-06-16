import express from 'express';
const router = express.Router();
import {detailTravell, spentTravell, activitiesTravell, participantsTravell, travellCreate, travellDelete, travellNameUpdate, travellDateUpdate, addActivitiesTravell, addSpentTravell, addUserTravell, deleteActivitiesTravell, deleteSpentTravell, deleteUserTravell} from '../controllers/travellController.js';


//Brindan informacion (Detalle de viaje - Gastos de viaje - Actividades del viaje(Devuelve id de actividad) - Usuarios en viaje)
router.get('/:id', detailTravell)
router.get('/gastos/:id', spentTravell)
router.get('/actividades/:id', activitiesTravell)
router.get('/viajeros/:id', participantsTravell)

//Actuan sobre el viaje (Crear viaje - Borrar viaje - Editar viaje)
router.post('/crear/:id', travellCreate)
router.post('/borrar/:id', travellDelete)
router.put('/editar/fecha/:id', travellDateUpdate)
router.put('/editar/nombre/:id', travellNameUpdate)

//Agregar elementos al viaje (Agregar actividades al viaje - Agregar gastos al viaje - Agregar usuarios al viaje)
router.post('/actividades/:id', addActivitiesTravell)
router.post('/gastos/:id', addSpentTravell)
router.post('/viajeros/:id', addUserTravell)

//Eliminar elementos al viaje (Eliminar actividades al viaje - Eliminar gastos al viaje - Eliminar usuarios al viaje)
router.delete('/actividades/:id', deleteActivitiesTravell)
router.delete('/gastos/:id', deleteSpentTravell)
router.post('/viajeros/delete/:id', deleteUserTravell)

export default router