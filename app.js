"use strict"

//express
const express = require("express");
//paths
const path = require("path");
//Necesitamos mysql para las bases de datos 
const mysql = require("mysql");
//Importamos el  archivo config.js
const config = require("./config.js");
//Middleware body-parser para enviar datos a través de os POST
const bodyParser = require("body-parser");
//Importamos los daos
const DAOUsers = require("./dao_users");
const DAOPartidas = require("./dao_partidas");

const app = express();

//Creamos el poool de conexiones
const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});

//Creamos los objetos daos
const DAOUser = new DAOUsers.DAOUsers(pool);
const DAOGames = new DAOPartidas.DAOPartidas(pool);

//Middleware static para la carpeta public de rescursos estáticos
app.use(express.static(path.join(__dirname, "public")));

/**
 * GET
 * Para la dirección "/"" redirige a "/index.html"
 */
app.get("/", function(request, response) {
    response.redirect("/index.html");
});

app.get("/", (request, response) => {
    response.redirect("/index.html");
});

app.listen(config.port, (err) => {
    if (err) {
        console.log("No se ha podido iniciar el servidor.")
        console.log(err);
    } else {
        console.log(`Servidor escuchando en puerto ${config.port}.`);
    }
});