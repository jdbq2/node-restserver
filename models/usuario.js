const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "El contraseña es obligatoria"],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        require: true,
        emun: ["ADMIN_ROLE", "USER_ROLE"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

//sobreescribimos el metodo para que el JSon que devuelve el schema no tenga ni la contraseña ni la version
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
