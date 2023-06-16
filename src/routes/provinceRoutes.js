import express from 'express';
const router = express.Router();
import {listProvince, detailProvince, findProvince} from '../controllers/provinceController.js';


//Informacion de las provincias (Listado de provincias, detalle de una provincia en particular, lista de actividades dentro de una provincia en particular)
router.get('/lista', listProvince)
router.get('/:id', detailProvince)
router.post('/find', findProvince)

export default router