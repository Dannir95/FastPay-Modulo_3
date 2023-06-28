import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try {

        const password_hash = await bcryptjs.hash(password, 10)  //encriptamos la contraseña

        const newUser = new User({
            username,
            email,
            password: password_hash,
        });
        
        //guardamos el usuario
        const userSaved = await newUser.save();
        //creamos el token con jwt
        const token = await createAccessToken({id: userSaved.id})
        //creamos una cookie con el token
        res.cookie('token', token)
        //Mostramos solo los datos requeridos por el front, sin el password
        res.json({
            id: userSaved.id,
            usernames: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const userFound = await  User.findOne({email});

        if(!userFound) return res.status(400).json({message: 'User not found'});

        const isMatch = await bcryptjs.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json({message: 'Incorrect password'})
        
        //creamos el token con jwt
        const token = await createAccessToken({id: userFound.id})
        //creamos una cookie con el token
        res.cookie('token', token)
        //Mostramos solo los datos requeridos por el front, sin el password
        res.json({
            id: userFound.id,
            usernames: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", 
    {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({message: "User not found"});
    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
    res.send('profile')
}