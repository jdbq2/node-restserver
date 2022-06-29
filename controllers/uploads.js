const { request, response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const cargarArchivo = async (req = request, res = response) => {
    if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.archivo
    ) {
        return res.status(400).json({
            msg: "No hay archivos en la peticion",
        });
    }

    try {
        const nombreArchivo = await subirArchivo(req.files);
        return res.json({
            msg: "Archivo subido correctamente",
            nombre_archivo: nombreArchivo,
        });
    } catch (error) {
        return res.status(400).json({
            msg: "error al subir el archivo",
            error,
        });
    }
};

const actualizarImagen = async (req = request, res = response) => {
    const { coleccion, id } = req.params;

    if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.archivo
    ) {
        return res.status(400).json({
            msg: "No hay archivos en la peticion",
        });
    }

    let modelo;
    //validamos la informacion enviada en los params
    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: "El usuario no existe en la DB",
                });
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: "El producto no existe en la DB",
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: "la coleccion enviada no esta incluida en el controlador",
            });
    }

    //subimos el archivo enviado
    try {
        const nombreArchivo = await subirArchivo(
            req.files,
            undefined,
            coleccion
        );
        //lo guardamos dentro del documento indicado por el ID
        modelo.img = nombreArchivo;
        await modelo.save();
        return res.json({
            msg: "Archivo subido correctamente",
            modelo,
        });
    } catch (error) {
        return res.status(400).json({
            msg: "error al subir el archivo",
            error,
        });
    }
};

module.exports = {
    cargarArchivo,
    actualizarImagen,
};
