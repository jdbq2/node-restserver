const Role = require("../models/role");
const Usuario = require("../models/usuario");

const isValidRole = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(
            `El rol: ${rol}, no esta registrado en la base de datos`
        );
    }
};

const emailExists = async (correo = "") => {
    //verificar si correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email: ${correo}, ya existe`);
    }
};

const userExists = async (_id = "") => {
    //verificar si correo existe
    const existeId = await Usuario.findById(_id);
    if (!existeId) {
        throw new Error(`El id enviado no existe`);
    }
};

module.exports = {
    isValidRole,
    emailExists,
    userExists,
};
