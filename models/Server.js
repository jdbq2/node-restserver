const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth";
        this.categoriasPath = "/api/categorias";
        this.productosPath = "/api/productos";
        this.buscarPath = "/api/buscar";
        this.uploadsPath = "/api/uploads";

        //Conectar a base de datos
        this.conectarDB();
        //Midlewares
        this.middlewares();
        //rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
        this.app.use(this.categoriasPath, require("../routes/categorias"));
        this.app.use(this.productosPath, require("../routes/productos"));
        this.app.use(this.buscarPath, require("../routes/buscar"));
        this.app.use(this.uploadsPath, require("../routes/uploads"));
    }
    listen() {
        this.app.listen(this.port);
    }
    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Carga de archivos
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: "/tmp/",
                createParentPath: true,
            })
        );

        //Directorio Publico
        this.app.use(express.static("public"));
    }
}

module.exports = Server;
