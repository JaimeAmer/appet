"use strict";

var assert = require("chai").assert;
var dao = require('../dao/dao');
var expect  = require("chai").expect;

const user1 = { id: 1, nombre: "Abrazo Animal", ciudad: "Madrid", email: "abrazoanimal@gmail.com", password: "1234", direccion: "Goya 3, 2b", telefono: 901654321, pendiente: 0 };
const user2 = { id: 2, nombre: "S.P.A.P.", ciudad: "Madrid", email: "spap@gmail.com", password: "1234", direccion: "Princesa, 1, 1a", telefono: 901123456, pendiente: 0 };
const user3 = { id: 3, nombre: "Asociacion las Nieves", ciudad: "Madrid", email: "lasnieves@gmail.com", password: "1234", direccion: "Castellana, 1, 1c", telefono: 901987654, pendiente: 0 };
const user4 = { id: 4, nombre: "Bichosraros", ciudad: "Madrid", email: "bichosraros@gmail.com", password: "1234", direccion: "Jardines, 41, 3b", telefono: 901456789, pendiente: 0 };
const user5 = { id: 5, nombre: "Ciudad Animal", ciudad: "Madrid", email: "ciudadanimal@gmail.com", password: "1234", direccion: "Arguelles, 15, 1d", telefono: 901666555, pendiente: 1 };


describe("Comprobacion general de usuarios registrados", function(){
    it("Verificar que existe el usuario en la base de datos", function(callback) {
        dao.general.verifyUser({email: user2.email, pass: user2.password}, function(err, result){
            setTimeout(callback, 1000);
            //assert.deepEqual(user2.id, result.id);
        })
    }),
    it("Verificar que no existe el usuario en la base de datos", function(callback) {
        dao.general.verifyUser({email: "a@a.com", pass: "patata"}, function(err, result){
            assert.deepEqual(undefined, result);
        })
    })
});
