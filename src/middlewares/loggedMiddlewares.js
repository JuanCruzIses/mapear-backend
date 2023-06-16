function loggedMiddlewares(req, res, next) {
    if(req.session.usuarioLogeado){
        return res.redirect("/home")
    }
    next();
} 

module.exports = loggedMiddlewares