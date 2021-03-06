"use strict";

var mysql = require("mysql");
var config = require('.././config');

const daoProtectoras = require("./dao_protectora");
const daoPerros = require("./dao_perro");
const daoGeneral = require("./dao_general");
const daoAdmin = require("./dao_admin");
const daoAdoptante = require("./dao_adoptante");
/*
 * Configuración de la conexion a la base de datos
 */
const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});


const DAOProtectora = new daoProtectoras.DAOProtectora(pool);
const DAOPerro = new daoPerros.DAOPerro(pool); 
const DAOGeneral = new daoGeneral.DAOGeneral(pool); 
const DAOAdmin = new daoAdmin.DAOAdmin(pool); 
const DAOAdoptante = new daoAdoptante.DAOAdoptante(pool); 

module.exports={
    protectora:DAOProtectora,
    perro:DAOPerro,
    general:DAOGeneral,
    admin:DAOAdmin,
    adoptante:DAOAdoptante
};