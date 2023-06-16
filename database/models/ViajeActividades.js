module.exports = (sequelize, dataTypes) => {
    let alias = "viajeactividades";

    let cols = {
        viajeActividadId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            notNull: true,
        },
        actividadId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'actividades',
                key: 'actividadId'}
        },
        viajeActividadDia: {
            type: dataTypes.INTEGER
        },
        viajeId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'viajes',
                key: 'viajeId'}
        }
    };

    let config = {
        tablename: "viajeactividades",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const viajeactividades = sequelize.define(alias, cols, config)

    viajeactividades.associate = function(models){
        viajeactividades.belongsTo(models.viajes, {
            as:'viajeactividades',
            foreignKey:"viajeId"     
        })
    }

    viajeactividades.associate = function(models){
        viajeactividades.belongsTo(models.actividades, {
            as:'viajeactividades',
            foreignKey:"actividadId"     
        })
    }

    return viajeactividades
}