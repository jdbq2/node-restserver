const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos, validarJWT } = require("../middlewares");
const {
    obtenerCategorias,
    obtenerCategoriaId,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

router.get("/", obtenerCategorias);
router.get("/:id", obtenerCategoriaId);
router.post(
    "/",
    [
        check("nombre", "el nombre es obligatorio").not().isEmpty(),
        validarJWT,
        validarCampos,
    ],
    crearCategoria
);
router.put("/:id", actualizarCategoria);
router.delete("/:id", borrarCategoria);

module.exports = router;
