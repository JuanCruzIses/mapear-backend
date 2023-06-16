function notLoggedMiddlewares(req, res, next) {
    if (!req.session.usuarioLogeado){
        return res.redirect("/")
    }
    next();
} 

module.exports = notLoggedMiddlewares