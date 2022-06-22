const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = (req, res = response) => {
    //manejo de query params
    const { nombre, apellido } = req.query;
    res.json({
        msg: "getApi - Controlador",
        nombre,
        apellido,
    });
};
const usuariosPost = async (req, res = response) => {
    //extraer el contenido del body
    const { nombre, correo, password, rol } = req.body;
    //creamos la instancia del modelo de Mongo
    const usuario = new Usuario({ nombre, correo, password, rol });
    //verificar si correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: "El correo ya esta registrado",
        });
    }
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);
    //Crear usuario en la base de datos
    await usuario.save();
    res.json({
        msg: "postApi - Controlador",
        usuario,
    });
};
const usuariosPut = (req, res = response) => {
    //manejo de parametro
    const id = req.params.id;
    res.json({
        msg: "putApi - Controlador",
        id,
    });
};
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patchApi - Controlador",
    });
};
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "deleteApi - Controlador",
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};
