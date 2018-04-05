"use strict";

var mysql = require("mysql");
var config = require('.././config');

const daoProtectoras = require("./dao_protectora");
const daoInvitados = require("./dao_invitado");

const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});


const DAOProtectora = new daoProtectoras.DAOProtectora(pool);
let DAOInvitado = new daoInvitados.DAOInvitado(pool); 

module.exports={
    protectora:DAOProtectora,
    invitado:DAOInvitado
};