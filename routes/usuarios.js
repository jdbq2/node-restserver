const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");
const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
} = require("../controllers/usuarios");
const validarCampos = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);
router.patch("/", usuariosPatch);
router.put("/:id", usuariosPut);
router.post(
    "/",
    [
        check("correo", "El correo no es valido").isEmail(),
        // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        check("rol").custom(async (rol = "") => {
            const existeRol = await Role.findOne({ rol });
            if (!existeRol) {
                throw new Error(
                    `El rol: ${rol}, no esta registrado en la base de datos`
                );
            }
        }),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser de minimo 6 letras").isLength({
            min: 6,
        }),
        validarCampos,
    ],
    usuariosPost
);
router.delete("/", usuariosDelete);

module.exports = router;
