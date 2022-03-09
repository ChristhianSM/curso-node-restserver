const express = require('express');
const cors = require('cors');
const routerUsers = require('../routes/users.routes');
const { dbConnection } = require('../database/config.database');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'

        //Conectar a base de datos
        this.connectDB();

        //Midleware
        this.middleware();

        //Routes
        this.routes();
    }

    connectDB() {
        dbConnection();
    }

    middleware() {
        this.app.use( cors() );
        this.app.use( express.static('public') );

        //Lectura y parseo dle body
        this.app.use( express.json() )
    }

    routes() {
        this.app.use( this.usersPath, routerUsers );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Escuchando");
        })
    }
}

module.exports = Server;