module.exports = (sequelize, dataTypes) => {
    let alias = "provincias";

    let cols = {
        provinciaId: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            notNull: true
        },
        provinciaNombre: {
            type: dataTypes.STRING(30),
        },
        provinciaDescripcion: {
            type: dataTypes.TEXT,
        },
        provinciaImagen: {
            type: dataTypes.STRING(60),
        }
    };

    let config = {
        tableName: "provincias",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'

    };

    const provincias = sequelize.define(alias, cols, config)

    // Provincia.associate = function(models){
    //     Provincia.hasMany(models.Lugare, {
    //         as: "provincias",
    //         foreignKey: "lugarProvinciaId"
    //     })
    // }

    // Provincia.associate = function(models){
    //     Provincia.hasMany(models.Viaje, {
    //         as: "provincias",
    //         foreignKey: "viajeProvinciaId"
    //     })
    // }

    return provincias
}

