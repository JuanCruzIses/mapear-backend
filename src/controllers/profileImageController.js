import { pool } from '../db.js'
const promisePool = pool.promise();
import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async (req, res) => {
    try {
        promisePool.query(`UPDATE usuarios SET usuarioImagen = ? WHERE usuarioId = ?`, [req.body.fileDirection, Number(req.body.usuarioId)])
        .then((result)=>{
            if(result[0].affectedRows !== 0){
                const response = {
                    meta: {
                        status: 200,
                        url: `/api/images/upload`,
                        process: 'succes',
                        msg: 'Request success'
                    }
                }
                res.json(response);
            } else {
                const response = {
                    meta: {
                        status: 400,
                        url: `/api/images/upload`,
                        process: 'failure',
                        msg: 'No se pudo establecer la imagen'
                    }
                }
                res.json(response);
            }
    })
    }catch (error) {
        return res.json({
            meta: {
                status: 400,
                process: 'failure',
                msg: 'No se pudo ejecutar correctamente su peticion'
            }
        });
    }
}

export const getImage = async (req, res) => {
    try {

    }catch (error) {
        return res.json({
            meta: {
                status: 400,
                process: 'failure',
                msg: 'No se pudo ejecutar correctamente su peticion'
            }
        });
    }
}