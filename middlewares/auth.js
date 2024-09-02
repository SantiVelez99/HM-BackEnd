const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

function jwtVerify(req, res, next){
    const token = req.headers.authorization
    if(!token){
        return res.status(401).send({
            message: "Denied, token is required"
        })
    }
    jwt.verify(token, SECRET, (error, payload) => {
        if(error){
            return res.status(401).send({
                message: "Denied, invalid or expired token"
            })
        }
        req.user = payload
        next()
    })
}
module.exports = jwtVerify