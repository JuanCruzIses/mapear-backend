module.exports = (sequelize, dataTypes) => {
    let alias = "actividades";

    let cols = {
         actividadId : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            notNull: true
        },
        actividadProvinciaId : {
            type: dataTypes.INTEGER,
            references: {
                model: 'provincias',
                key: 'provinciaId'}
        },
        actividadNombre: {
            type: dataTypes.STRING(50)
        },
        actividadDescripcion: {
            type: dataTypes.TEXT
        }, 
        actividadImagen: {
            type: dataTypes.STRING(150)
        }
    };

    let config = {
        tablename: "actividades",
        timestamps: false, 
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    };

    const actividades = sequelize.define(alias, cols, config)

    actividades.associate = function(models){
        actividades.belongsTo(models.provincias, {
            as:'lugares',
            foreignKey:"actividadProvinciaId"     
        })
    }

    return actividades
}