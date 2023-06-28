import jwt from 'jsonwebtoken'
import { token_secret } from '../config.js';

//next se utiliza para que continue despues de realizar la funcion creada
export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "No token, authorization denied"});
    jwt.verify(token, token_secret, (err, user) => {
        if(err) return res.status(403).json({ message : "Invalid token"});

        req.user = user;
    })
    next()
}