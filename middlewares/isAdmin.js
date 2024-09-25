function isAdmin(req, res, next){
    if(req.user.role === "ADMIN_ROLE"){
        next();
    } else {
        res.status(401).send({
            ok: false,
            message: "Cannot access to these functions."
        })
    }
}
module.exports = isAdmin;