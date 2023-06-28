import { token_secret } from "../config.js";
import jwt from "jsonwebtoken"

export function createAccessToken(payload) {
  return new Promise((resolver, reject) => {
    //usamos jwt para crear el token del usuario
    jwt.sign(payload, token_secret, { expiresIn: "1d" },
    (err, token) => {
        if (err) reject(err);
        resolver(token);
        });
  });
}
