import { pool } from '../db.js'
const promisePool = pool.promise();

export const listProvince = async (req, res) => {
    try {
        await promisePool.query('SELECT * FROM provincias')
        .then(([rows]) => {
            if (rows) {
                const response = {
                    meta: {
                        status: 200,
                        url: "/api/provincias/lista",
                        msg: "Request success",
                    },
                    data: rows,
                }
                res.json(response);
            } else {
                return res.status(400).json({
                    process: 'failure',
                    msg: 'No se pudieron obtener las provincias'
                });
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


export const detailProvince = async (req, res) => {
    try {
        let provincia
        let actividades
        await promisePool.query(`SELECT * FROM provincias WHERE provinciaId = ?`, [req.params.id])
            .then(([rows]) => {
                provincia = rows
                promisePool.query(`SELECT * FROM actividades WHERE actividadProvinciaId = ?`, [req.params.id])
                    .then(([rows]) => {
                        actividades = rows
                        const response = {
                            meta: {
                                status: 200,
                                url: `/api/provincias/lista`,
                                msg: "Request success",
                            },
                            data: [provincia, actividades]
                        }
                        res.json(response);
                    })
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

export const findProvince = async (req, res) => {
    try {
        let provincia
        let actividades
        await promisePool.query(`SELECT * FROM provincias WHERE provinciaNombre LIKE ?`, ["%" + req.body.provinciaNombre + "%"])
            .then(([rows]) => {
                provincia = rows
                promisePool.query(`SELECT * FROM actividades WHERE actividadProvinciaId = ?`, [provincia[0].provinciaId])
                    .then(([rows]) => {
                        actividades = rows
                        const response = {
                            meta: {
                                status: 200,
                                url: `/api/provincias/lista`,
                                msg: "Request success",
                            },
                            data: [provincia, actividades]
                        }
                        res.json(response);
                    })
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
  
