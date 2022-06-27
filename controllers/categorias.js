const { request, response, json } = require("express");
const Categoria = require("../models/categoria");

const obtenerCategorias = async (req = request, res = response) => {
    return res.json({
        msg: "categorias get OK",
    });
};
const obtenerCategoriaId = async (req = request, res = response) => {
    return res.json({
        msg: "categoria get OK",
    });
};
const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: "La categoria ya existe en la DB",
        });
    }
    try {
        const data = {
            nombre,
            usuario: req.usuario._id,
        };

        const categoria = new Categoria(data);
        await categoria.save();

        return res.status(201).json({
            msg: "categoria post OK",
            categoria,
        });
    } catch (error) {
        console.log(error);
    }
};
const actualizarCategoria = async (req = request, res = response) => {
    return res.json({
        msg: "categorias put OK",
    });
};
const borrarCategoria = async (req = request, res = response) => {
    return res.json({
        msg: "categorias delete OK",
    });
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaId,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
};
