import { pool } from '../db.js'
const promisePool = pool.promise();

/* VER DETALLE DE UN VIAJE */
export const detailTravell = async (req, res) => {
    try {
        await promisePool.query(`SELECT * FROM viajes WHERE viajeId = ?`, [req.params.id])
            .then(([result]) => {
                if (result.length) {
                    var fechaI = result[0].viajeFechaInicio;
                    var fechaF = result[0].viajeFechaFinal;
                    result[0].viajeFechaInicio = `${fechaI.getDate()}/${fechaI.getMonth() + 1}/${fechaI.getFullYear()} `
                    result[0].viajeFechaFinal = `${fechaF.getDate()}/${fechaF.getMonth() + 1}/${fechaF.getFullYear()} `
                    let detailTravell = result
                    const response = {
                        meta: {
                            status: 200,
                            url: `/api/viaje/${req.params.id}`,
                            msg: 'Request success'
                        },
                        data: detailTravell[0]
                    }
                    res.json(response)
                } else {
                    const response = {
                        meta: {
                            status: 400,
                            url: `/api/viaje/${req.params.id}`,
                            msg: 'No se pudo ejecutar correctamente su peticion'
                        }
                    }
                    res.json(response)
                }
            })
    } catch (error) {
        return res.status(400).json({
            meta: {
                status: 400,
                process: 'failure',
                msg: 'No se pudo ejecutar correctamente su peticion'
            }
        });
    }
}

/* VER GASTOS DE UN VIAJE */
export const spentTravell = async (req, res) => {
    try {
        await promisePool.query(`SELECT * FROM gastos WHERE viajeId = ?`, [req.params.id])
            .then(([result]) => {
                if (result.length) {
                    const response = {
                        meta: {
                            status: 200,
                            url: `/api/viaje/gastos/${req.params.id}`,
                            msg: "Request success",
                        },
                        data: result
                    }
                    res.json(response)
                } else {
                    const response = {
                        meta: {
                            status: 400,
                            url: `/api/viaje/gastos/${req.params.id}`,
                            msg: 'No se pudo ejecutar correctamente su peticion'
                        }
                    }
                    res.json(response)
                }
            })
    } catch (error) {
        return res.status(400).json({
            meta: {
                status: 400,
                process: 'failure',
                msg: 'No se pudo ejecutar correctamente su peticion'
            }
        });
    }
}

/* VER ACTIVIDADES DE UN VIAJE */
export const activitiesTravell = async (req, res) => {
    try {
        await promisePool.query(`SELECT * FROM viajeactividades WHERE viajeId = ?`, [req.params.id])
            .then(([result]) => {
                if (result.length) {
                    const response = {
                        meta: {
                            status: 200,
                            url: `/api/viaje/actividades/${req.params.id}`,
                            msg: "Request success",
                        },
                        data: result
                    }
                    res.json(response)
                } else {
                    const response = {
                        meta: {
                            status: 400,
                            url: `/api/viaje/actividades/${req.params.id}`,
                            msg: 'Aún no hay actividades agregadas a su itinerario de viaje'
                        }
                    }
                    res.json(response)
                }
            })
    } catch (error) {
        return res.status(400).json({
            meta: {
                status: 400,
                process: 'failure',
                msg: 'No se pudo ejecutar correctamente su peticion'
            }
        });
    }
}

/* VER USUARIOS AGREGADOS A UN VIAJE */
export const participantsTravell = async (req, res) => {
    try {
        await promisePool.query(`SELECT * FROM viajeusuarios WHERE viajeId = ?`, [req.params.id])
            .then(([result]) => {
                if (result.length) {
                    const response = {
                        meta: {
                            status: 200,
                            url: `/api/viaje/viajeros/${req.params.id}`,
                            msg: "Request success",
                        },
                        data: result
                    }
                    res.json(response)
                } else {
                    const response = {
                        meta: {
                            status: 400,
                            url: `/api/viaje/viajeros/${req.params.id}`,
                            msg: 'No se pudo ejecutar correctamente su peticion'
                        }
                    }
                    res.json(response)
                }
            })
    } catch (error) {
        return res.status(400).json({
            meta: {
                status: 400,
                process: 'failure',
                msg: 'No se pudo ejecutar correctamente su peticion'
            }
        });
    }
}

/* CREAR UN VIAJE */
export const travellCreate = async (req, res) => {
    try {
        await promisePool.query('INSERT INTO viajes (`viajeProvinciaId`, `viajeUsuarioId`, `viajeNombre`, `viajeFechaInicio`, `viajeFechaFinal`, `viajeCantidadDias`) VALUES (?,?,?,?,?,?)', [req.body.viajeProvinciaId, req.params.id, req.body.viajeNombre, req.body.viajeFechaInicio, req.body.viajeFechaFinal, req.body.viajeCantidadDias])
            .then(function () {
                const response = {
                    meta: {
                        status: 200,
                        url: `/api/viaje/crear/${req.params.id}`,
                        process: 'succes',
                        msg: 'Request success'
                    }
                }
                res.json(response);
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}

/* ELIMINAR UN VIAJE */
export const travellDelete = async (req, res) => {
    try {
        console.log(req.params.id)
        await Promise.all([
            promisePool.query('DELETE FROM gastos WHERE viajeId = ?', [req.params.id]),
            promisePool.query('DELETE FROM viajeusuarios WHERE viajeId = ?', [req.params.id]),
            promisePool.query('DELETE FROM viajeactividades WHERE viajeId = ?', [req.params.id]),
        ])
        .catch(error=>console.log(error))
        .then(function () {
            promisePool.query('DELETE FROM viajes WHERE viajeId = ?', [req.params.id])
            .then(()=>{
                const response = {
                    meta: {
                        status: 200,
                        url: `api/viaje/borrar/${req.params.id}`,
                        process: 'succes',
                                msg: 'Request success'
                    }
                }
                res.json(response);
            })  
        })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}

/* EDITAR NOMBRE DE UN VIAJE */
export const travellNameUpdate = async (req, res) => {
    try {
        await promisePool.query('UPDATE viajes SET viajeNombre = ? WHERE viajeId = ?', [req.body.viajeNombre, req.params.id])
            .then((result) => {
                if (result[0].affectedRows !== 0) {
                    const response = {
                        meta: {
                            status: 200,
                            url: `/api/viaje/editar/${req.params.id}`,
                            process: 'succes',
                            msg: 'Request success'
                        }
                    }
                    res.json(response);
                } else {
                    const response = {
                        meta: {
                            status: 400,
                            url: `/api/viaje/editar/${req.params.id}`,
                            process: 'failure',
                            msg: 'No se encontro el viaje indicado'
                        }
                    }
                    res.json(response);
                }
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}

/* EDITAR FECHA DE UN VIAJE */
export const travellDateUpdate = async (req, res) => {
    try {
        await promisePool.query('UPDATE viajes SET viajeFechaInicio = ?, viajeFechaFinal = ?, viajeCantidadDias = ? WHERE viajeId = ?', [req.body.viajeFechaInicio, req.body.viajeFechaFinal, req.body.viajeCantidadDias, req.params.id])
            .then((result) => {
                if (result[0].affectedRows !== 0) {
                    promisePool.query('DELETE FROM viajeactividades WHERE `viajeId` = ?', [req.params.id])
                        .then(function () {
                            const response = {
                                meta: {
                                    status: 200,
                                    url: `/api/viaje/editar/fecha/${req.params.id}`,
                                    process: 'succes',
                                    msg: 'Request success'
                                }
                            }
                            res.json(response);
                        })
                } else {
                    const response = {
                        meta: {
                            status: 400,
                            url: `/api/viaje/editar/fecha/${req.params.id}`,
                            process: 'failure',
                            msg: 'No se encontro el viaje indicado'
                        }
                    }
                    res.json(response);
                }
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}

/* AGREGAR ACTIVIDADES A UN VIAJE */
export const addActivitiesTravell = async (req, res) => {
    try {
        await promisePool.query('INSERT INTO viajeactividades (`actividadId`, `viajeActividadDia`, `viajeId`) VALUES (?,?,?)', [req.body.actividadId, req.body.viajeActividadDia, req.params.id])
            .then(function () {
                const response = {
                    meta: {
                        status: 200,
                        url: `/api/viaje/actividades/${req.params.id}`,
                        process: 'succes',
                        msg: 'Actividad agregada correctamente'
                    }
                }
                res.json(response);
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}

/* AGREGAR GASTOS A UN VIAJE */
export const addSpentTravell = async (req, res) => {
    try {
        await promisePool.query('INSERT INTO gastos (`gastoNombre`, `gastoDescripcion`, `gastoPrecio`, `viajeId`) VALUES (?,?,?,?)', [req.body.gastoNombre, req.body.gastoDescripcion, req.body.gastoPrecio, req.params.id])
            .then(function () {
                const response = {
                    meta: {
                        status: 200,
                        url: `/api/viaje/actividades/${req.params.id}`,
                        process: 'succes',
                        msg: 'Request success'
                    }
                }
                res.json(response);
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}

/* AGREGAR USUARIOS A UN VIAJE */
export const addUserTravell = async (req, res) => {
    try {
        let usuarioId
        await promisePool.query(`SELECT * FROM usuarios WHERE usuarioEmail = ?`, [req.body.usuarioEmail])
            .then(([result]) => {
                if (result.length) {
                    usuarioId = result[0].usuarioId
                    promisePool.query(`SELECT * FROM viajeusuarios WHERE usuarioId = ? AND viajeId = ?`, [usuarioId, req.params.id])
                        .then(([result]) => {
                            if (!result.length) {
                                promisePool.query('INSERT INTO viajeusuarios (`viajeId`, `usuarioId`) VALUES (?,?)', [req.params.id, usuarioId])
                                    .then(() => {
                                        const response = {
                                            meta: {
                                                status: 200,
                                                url: `/api/viaje/actividades/${req.params.id}`,
                                                process: 'succes',
                                                msg: 'Request success'
                                            }
                                        }
                                        res.json(response);
                                    })
                            } else {
                                return res.status(400).json({
                                    process: 'failure',
                                    msg: 'El usuario ya fue agregado al viaje'
                                })
                            }
                        })
                } else {
                    return res.status(400).json({
                        process: 'failure',
                        msg: 'Por favor verifique ingresar correctamente el email ingresado'
                    })
                }
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar su peticion'
        });
    }
}

/* ELIMINAR ACTIVIDADES DE UN VIAJE */
export const deleteActivitiesTravell = async (req, res) => {
    try {
        console.log(req.params.id)
        await promisePool.query('DELETE FROM viajeactividades WHERE `viajeActividadId` = ?', [req.params.id])
            .then(function () {
                const response = {
                    meta: {
                        status: 200,
                        url: `/api/viaje/actividades/${req.params.id}`,
                        process: 'succes',
                        msg: 'Request success'
                    }
                }
                res.json(response);
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}

/* ELIMINAR GASTOS DE UN VIAJE */
export const deleteSpentTravell = async (req, res) => {
    try {
        await promisePool.query('DELETE FROM gastos WHERE `viajeId` = ? AND `gastoId` = ?', [req.params.id, req.body.gastoId])
            .then(function () {
                const response = {
                    meta: {
                        status: 200,
                        url: `/api/viaje/actividades/${req.params.id}`,
                        process: 'succes',
                        msg: 'Request success'
                    }
                }
                res.json(response);
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}

/* ELIMINAR USUARIOS DE UN VIAJE */
export const deleteUserTravell = async (req, res) => {
    try {
        await promisePool.query('DELETE FROM viajeusuarios WHERE `viajeId` = ? AND `usuarioId` = ?', [req.params.id, req.body.usuarioId])
            .then(function() {
                const response = {
                    meta: {
                        status: 200,
                        url: `/api/viaje/viajeros/${req.params.id}`,
                        process: 'succes',
                        msg: 'Request success'
                    }
                }
                res.json(response);
            })
    } catch (error) {
        return res.status(400).json({
            process: 'failure',
            msg: 'No se pudo ejecutar correctamente su peticion'
        });
    }
}