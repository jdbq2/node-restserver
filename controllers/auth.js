const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {
    const { correo, password } = req.body;
    //verificamos que el correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(400).json({
            msg: " Usuario / Password no es correcto",
        });
    }
    //verificamos que el usuario esta activo
    if (!usuario.estado) {
        return res.status(400).json({
            msg: " Usuario / Password no es correcto - estado false",
        });
    }
    //verificamos que la constraseña sea la correcta
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: " Usuario / Password no es correcto - Password",
        });
    }
    //generamos el JWT
    const token = await generarJWT(usuario.id);
    try {
        res.json({
            msg: "Login Post Ok",
            usuario,
            token,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Algo salio mal, hable con el administrador del sitio",
        });
    }
};

module.exports = {
    login,
};
