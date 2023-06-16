module.exports = (sequelize, dataTypes) => {
    let alias = "viajes";

    let cols = {
        viajeId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            notNull: true,
        },
        viajeProvinciaId : {
            type: dataTypes.INTEGER,
            notNull: true,
            references: {
                model: 'provincias',
                key: 'provinciaId'}
        },
        viajeUsuarioId : {
            type: dataTypes.INTEGER,
            notNull: true,
            references: {
                model: 'usuarios',
                key: 'usuarioId'}
        },
        viajeNombre: {
            type: dataTypes.STRING(50),
            notNull: true
        },
        viajeFechaInicio: {
            type: dataTypes.DATE,
            notNull: true,
        }, 
        viajeFechaFinal: {
            type: dataTypes.DATE,
            notNull: true,
        },
        viajeCantidadDias : {
            type: dataTypes.INTEGER,
            notNull: true
        }
    };

    let config = {
        tablename: "viajes",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const viajes = sequelize.define(alias, cols, config)

    viajes.associate = function(models){
        viajes.belongsTo(models.provincias, {
            as:'viajes',
            foreignKey:"viajeProvinciaId"     
        })
    }
    
    viajes.associate = function(models){
        viajes.belongsTo(models.usuarios, {
            as:'viajes',
            foreignKey:"viajeUsuarioId"     
        })
    }

    viajes.associate = function(models){
        viajes.belongsTo(models.viajeactividades, {
            as:'viaje',
            foreignKey:"viajeId"     
        })
    }

    return viajes
}