module.exports = (sequelize, dataTypes) => {
    let alias = "gastos";

    let cols = {
        gastosId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            notNull: true,
        },
        gastoNombre: {
            type: dataTypes.STRING(40)
        },
        gastoDescripcion: {
            type: dataTypes.STRING(80)
        },
        gastoPrecio: {
            type: dataTypes.INTEGER
        },
        viajeId: {
            type: dataTypes.INTEGER,
            references: {
                model: 'viajes',
                key: 'viajeId'}
        },
        
    };

    let config = {
        tablename: "gastos",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const gastos = sequelize.define(alias, cols, config)

    gastos.associate = function(models){
        gastos.belongsTo(models.viajes, {
            as:'gastos',
            foreignKey:"viajeId"     
        })
    }

    gastos.associate = function(models){
        gastos.belongsTo(models.usuarios, {
            as:'gastos',
            foreignKey:"usuarioId"     
        })
    }

    return gastos
}