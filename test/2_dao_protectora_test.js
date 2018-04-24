
var assert = require("chai").assert;
var dao = require('../dao/dao');
var expect  = require("chai").expect;

const user1 = { id: 1, nombre: "Abrazo Animal", ciudad: "Madrid", email: "abrazoanimal@gmail.com", password: "1234", direccion: "Goya 3, 2b", telefono: 901654321, pendiente: 0 };
const user2 = { id: 2, nombre: "S.P.A.P.", ciudad: "Madrid", email: "spap@gmail.com", password: "1234", direccion: "Princesa, 1, 1a", telefono: 901123456, pendiente: 0 };
const user3 = { id: 3, nombre: "Asociacion las Nieves", ciudad: "Madrid", email: "lasnieves@gmail.com", password: "1234", direccion: "Castellana, 1, 1c", telefono: 901987654, pendiente: 0 };
const user4 = { id: 4, nombre: "Bichosraros", ciudad: "Madrid", email: "bichosraros@gmail.com", password: "1234", direccion: "Jardines, 41, 3b", telefono: 901456789, pendiente: 0 };
const user5 = { id: 5, nombre: "Ciudad Animal", ciudad: "Madrid", email: "ciudadanimal@gmail.com", password: "1234", direccion: "Arguelles, 15, 1d", telefono: 901666555, pendiente: 1 };

const lista = [user1, user2, user3, user4, user5];

describe("Comprobacion de protectoras", function(){
    it("El ID de la protectora coincide", function(){
        dao.protectora.getDataProtectora(user1.id, function(err, result){
            assert.deepStrictEqual(user1.id, result[0].id);
        })
    }),
    it("El ID de la protectora no coincide", function(){
        dao.protectora.getDataProtectora(user2.id, function(err, result){
            //assert.notDeepStrictEqual(undefined, result[0].id);
            assert.notDeepEqual(undefined, result[0])
        })
    }),
    it("El ID de la protectora no existe", function(){
        dao.protectora.getDataProtectora(-1, function(err, result){
            assert.equal(undefined, result[0]);
        })
    }),
    it("El nombre de la protectora coincide", function(){
        dao.protectora.getNombreProtecotra(user3.id, function(err, result){
            assert.deepStrictEqual(user3.nombre, result.nombre);
        })
    }),
    it("El nombre de la protectora no coincide", function(){
        dao.protectora.getNombreProtecotra(user5.id, function(err, result){
            assert.notDeepEqual("patata", result.nombre);
        })
    }),
    it("La protectora existe", function(){
        dao.protectora.isProtCorrect(user1.email, user1.password, function(err, result){
            assert.equal(true, result);
        })
    }),
    it("La protectora no existe", function(){
        dao.protectora.isProtCorrect("a@a.com", "patata", function(err, result){
            assert.equal(false, result);
        })
    })
});













/**"use strict";

const usuarios = require("../dao_users");




usuarios.createUser(1234, function (err, doc) {
    should.not.exist(err);
    should.exist(doc);
    doc.should.be.an('object');
  });


  usuarios.createUser("paco", "pacopolaco", () =>{

  });


  createUser(username, password, callback) {
    this.pool.getConnection((err, connection) => {
        if (err) {
            callback(err);
            return;
        }

        connection.query("INSERT INTO usuarios(contraUser, nombreUser) VALUES(?,?)", [password, username], (err) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null);
            connection.release();
        });
    });
}








var expect = require('chai').expect,
    foo = 'bar',
    num1 = 2,
    beverages = { tea: ['chai', 'matcha', 'oolong'] };

expect(foo).to.be.a('string');
expect(num1).to.equal(2);
expect(num1).to.be.a('number');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);




var assert = require('chai').assert,
    foo = 'bar',
    beverages = { tea: ['chai', 'matcha', 'oolong'] };

assert.typeOf(foo, 'string'); // without optional message
assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');





var should = require('chai').should() //actually call the function
    ,
    foo = 'bar',
    beverages = { tea: ['chai', 'matcha', 'oolong'] };

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);

**/