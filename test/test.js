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