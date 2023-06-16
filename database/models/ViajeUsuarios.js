module.exports = (sequelize, dataTypes) => {
    let alias = "viajeusuarios";

    let cols = {
        viajeusuarioId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            notNull: true,
        },
        viajeId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'viajes',
                key: 'viajeId'}
        },
        usuarioId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'usuarios',
                key: 'usuarioId'}
        }
    };

    let config = {
        tablename: "viajeusuarios",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const viajeusuarios = sequelize.define(alias, cols, config)

    viajeusuarios.associate = function(models){
        viajeusuarios.belongsTo(models.viajes, {
            as:'viajeusuarios',
            foreignKey:"viajeId"     
        })
    }

    viajeusuarios.associate = function(models){
        viajeusuarios.belongsTo(models.usuarios, {
            as:'viajeusuarios',
            foreignKey:"usuarioId"     
        })
    }

    return viajeusuarios
}