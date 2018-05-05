"use strict";

var assert = require("chai").assert;
var dao = require('../dao/dao');
var expect  = require("chai").expect;

const user1 = { id: 1, nombre: "Abrazo Animal", ciudad: "Madrid", email: "abrazoanimal@gmail.com", password: "1234", direccion: "Goya 3, 2b", telefono: 901654321, pendiente: 0 };

let idProtectora = 1;
let idPerro = 1;

console.log("Verificar tipos de imagenes");

describe("Comprobacion general de imagen de Protectora en el sistema", function(){
    it("Comprobacion de imagenes de Adoptante en la base de datos", function(callback) {
        dao.general.getImageProtectora(idProtectora, function(err, result){
            setTimeout(callback, 1000);
        })
    })
});

describe("Comprobacion general de imagen de perro en el sistema", function(){
    it("Comprobacion de imagenes de perro en la base de datos", function(callback) {
        dao.general.getImagePerro(idPerro, function(err, result){
            setTimeout(callback, 1000);
        })
    })
});