const { body, Result } = require('express-validator');


const registerValidation = [
    body("userName").notEmpty().withMessage("Por favor complete con su nombre").isLength( {min: 3} ).withMessage("El Nombre debe tener al menos 3 caracteres").isLength( {max: 15} ).withMessage("El Nombre debe tener maximo 15 caracteres").bail(),
    body("userEmail").notEmpty().withMessage("Por favor complete con su email").isEmail().withMessage("Por favor ingrese un email válido").bail(),
    body("userPassword").notEmpty().withMessage("Por favor complete con una contraseña").isLength( {min: 5} ).withMessage("La contraseña debe tener al menos 5 caracteres").isLength( {max: 15} ).withMessage("La contraseña debe tener maximo 15 caracteres").bail(),
    body("confirmUserPassword").notEmpty().withMessage("Ingrese nuevamente la contraseña")
    
]

module.exports = registerValidation;