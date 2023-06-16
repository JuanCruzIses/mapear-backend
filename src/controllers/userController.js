import { pool } from '../db.js'
const promisePool = pool.promise();
import bcrypt from 'bcryptjs';

export const register = async(req, res) => {
    try {
        await promisePool.query(`SELECT usuarioEmail FROM usuarios WHERE usuarioEmail = ?`, [req.body.usuarioEmail])
        .then(([rows])=>{
            let userInDB = rows
            if (!userInDB.length && req.body.userPassword === req.body.confirmUserPassword ) {
                promisePool.query(`INSERT INTO usuarios (usuarioNombre, usuarioEmail, usuarioContrasenia, usuarioImagen, usuarioRolId) VALUES (?,?,?,?,?)`, [req.body.usuarioNombre, req.body.usuarioEmail, bcrypt.hashSync(req.body.usuarioContrasenia, 12), "https://res.cloudinary.com/dvleeuamf/image/upload/v1683812217/mapear_users/viajeros2_qavi14.jpg", 2])
                .then(function(){
                    const response = {
                        meta: {
                            status: 200,
                            url: '/api/usuarios/registro',
                            process: 'succes',
                            msg: 'El usuario fue creado'
                        }
                    }
                    res.json(response);
                })
            } else {       
                if (userInDB){
                    return res.status(400).json({
                        meta: {
                            status: 400,
                            process: 'failure',
                            msg: 'El correo ya se encuentra registrado'
                        }
                    });
                }
                if (req.body.userPassword != req.body.confirmUserPassword){
                    return res.status(400).json({
                        meta: {
                            status: 400,
                            process: 'failure',
                            msg: 'El correo ya se encuentra registrado'
                        }
                    });
                }
            }
        })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo realizar la peticion indicada',
            error: error
        });
    }
}

export const login = async (req, res) => {
    try{
        await promisePool.query(`SELECT * FROM usuarios WHERE usuarioEmail = ?`, [req.body.usuarioEmail])
        .then(([rows]) => {
            let usuarioEncontrado = rows[0]
            let verificaContraseñaHash = bcrypt.compareSync(req.body.usuarioContrasenia, usuarioEncontrado.usuarioContrasenia)    
            if (usuarioEncontrado && verificaContraseñaHash){
                delete usuarioEncontrado.usuarioContrasenia
                const response = {
                    meta: {
                        status: 200,
                        url: "/api/usuarios/login",
                        msg: "Login success",
                    },
                    data: usuarioEncontrado
                };
                res.json(response)
            } else {
                return res.json({
                    status: 400,
                    process: 'failure',
                    msg: 'El usuario o contraseña son incorrectos'
                });}
        })
    } catch (error) {
        return res.status(400).json({
            meta: {
                status: 400,
                process: 'failure',
                msg: 'No se pudo ejecutar correctamente su peticion'
            }
        })
    }
}

export const userTravell = (req, res) => {
    let viajesPropios
    promisePool.query(`SELECT * FROM viajes WHERE viajeUsuarioId = ?`, [req.params.id])
        .then(([result]) => {
            viajesPropios = result
            result.map((element)=>{
                var fechaI = element.viajeFechaInicio;
                var fechaF = element.viajeFechaFinal;
                element.viajeFechaInicio = `${fechaI.getDate()}/${fechaI.getMonth()+1}/${fechaI.getFullYear()} `
                element.viajeFechaFinal = `${fechaF.getDate()}/${fechaF.getMonth()+1}/${fechaF.getFullYear()} `
            })
            promisePool.query(`SELECT * FROM viajeusuarios WHERE usuarioId = ?`, [req.params.id])
            .then(([result]) => {
                var viajesAgregado = result 
                if(viajesPropios.length || viajesAgregado.length){
                    const response = {
                    meta: {
                        status: 200,
                        url: `/api/usuario/viaje/${req.params.id}`,
                        msg: "Request success",
                    },
                    data: [viajesPropios, viajesAgregado]
                };
                res.json(response)
            }else{
                const response = {
                    meta: {
                        status: 400,
                        url: `/api/usuario/viaje/${req.params.id}`,
                        msg: "No se pudo ejecutar correctamente su peticion",
                    }
                };
                res.json(response)
                }
            })
        })
}



export const userDetail =  (req, res) => {
    promisePool.query(`SELECT * FROM usuarios WHERE usuarioId = ?`, [req.params.id])
    .then(([result]) => {
        let infoUser = result
        delete infoUser[0].usuarioContrasenia  
        delete infoUser[0].usuarioRolId
        const response = {
            meta: {
                status: 200,
                url: `/api/usuario/${req.params.id}`,
                msg: "Request success",
            },
            data: [infoUser]
        };
        res.json(response)
    })
}

export const newPassword = async (req, res)=>{
    try {
        if(req.body.newPassword == req.body.confirmNewPassword){
            await promisePool.query('UPDATE usuarios SET usuarioContrasenia = ? WHERE usuarioId = ?', [bcrypt.hashSync(req.body.newPassword, 12), req.body.userId])
            .then((result)=>{
                if(result[0].affectedRows !== 0){
                    const response = {
                        meta: {
                            status: 200,
                            url: `/api/usuario/`,
                            process: 'succes',
                            msg: 'Request success'
                        }
                    }
                    res.json(response);
                } else {
                    const response = {
                        meta: {
                            status: 400,
                            url: `/api/usuario/`,
                            process: 'failure',
                            msg: 'No se pudo modificar la contraseña'
                        }
                    }
                    res.json(response);
                }
            })
        } else {
            const response = {
                meta: {
                    status: 400,
                    url: `/api/usuario/`,
                    process: 'failure',
                    msg: 'Las contraseñas ingresadas no coinciden'
                }
            }
            res.json(response);
        }
    }catch(error){
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}
