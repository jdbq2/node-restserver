const { response } = require("express");

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
    const { nombre, edad } = req.body;
    res.json({
        msg: "postApi - Controlador",
        nombre,
        edad,
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
