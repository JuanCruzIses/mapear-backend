import express from 'express';
import { getImage, uploadImage } from '../controllers/profileImageController.js';
const router = express.Router();



router.post('/api/images/upload', uploadImage)
router.get('/api/images/:id', getImage)

// router.delete('/api/images/:id', deleteImage)

export default router