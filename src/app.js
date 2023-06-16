import express from 'express'
const app = express()
import cors from 'cors'
import './config.js'
import fileUpload from 'express-fileupload'

app.use(cors());
app.use(fileUpload({
    tempFileDir: '/temp'
}))
app.use(express.json())

//Routes
import userRoutes from './routes/userRoutes.js'
import travellRoutes from './routes/travellRoutes.js'
import provinceRoutes from './routes/provinceRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import imagesRoutes from './routes/imagesRoutes.js'

//Use ApisRoutes
app.use('/api/usuario', userRoutes)
app.use('/api/viaje', travellRoutes)
app.use('/api/provincia', provinceRoutes)
app.use('/api/admin', adminRoutes)
app.use('/', imagesRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));