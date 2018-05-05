var assert = require("chai").assert;
var dao = require('../dao/dao');
var expect  = require("chai").expect;


//Tests de comprobacion de tipo de datos correctos
console.log("Tipos de datos Adoptante y comprobación de datos correctos");

describe("Email tipo", () =>{
    it('El Email es de tipo String',() =>{
        dao.adoptante.getDataAdoptante(1,function(err,result){
            assert.typeOf(result.email, 'string');
        });
    });
});

describe("Password tipo", () =>{
    it('La password es del tipo String',() =>{
        dao.adoptante.getDataAdoptante(1,function(err,result){
            assert.typeOf(result.password, 'string');
        });
    });
});

describe("Nombre tipo", () =>{
    it('El nombre es del tipo String',() =>{
        dao.adoptante.getDataAdoptante(1,function(err,result){
            assert.typeOf(result.nombre, 'string');
        });
    });
});

describe("Apellido tipo", () =>{
    it('El apellido es del tipo String',() =>{
        dao.adoptante.getDataAdoptante(1,function(err,result){
            assert.typeOf(result.apellidos, 'string');
        });
    });
});

describe("Ciudad tipo", () =>{
    it('La ciudad es del tipo String',() =>{
        dao.adoptante.getDataAdoptante(1,function(err,result){
            assert.typeOf(result.ciudad, 'string');
        });
    });
});

describe("Direccion tipo", () =>{
    it('La direccion es del tipo String',() =>{
        dao.adoptante.getDataAdoptante(1,function(err,result){
            assert.typeOf(result.direccion, 'string');
        });
    });
});

describe("Telefono tipo", () =>{
    it('El telefono es del tipo int',() =>{
        dao.adoptante.getDataAdoptante(1,function(err,result){
            assert.typeOf(result.telefono, 'number');
        });
    });
});

describe("Estado tipo", () =>{
    it('El estado es del tipo int',() =>{
        dao.adoptante.getDataAdoptante(1,function(err,result){
            assert.typeOf(result.estado, 'number');
        });
    });
});


// datos de BBDD id=3
// Nombre, Ciudad, Imagen, Email, password, telefono, pendiente

let id=1;
var datosAdoptante = [
	'antonio@gmail.com', 
	'1234', 
	'Antonio', 
	'Cabello Libre', 
	'1998-04-03', 
	'Madrid', 
	'C/Imaginacion Nº 13 4B', 
	999888777, 
	1
 ];
 
//Tests de comprobacion de datos correctos del id=3
console.log("funcionaaaaaaa");
describe("Email tipo", () =>{
    it('Devuelve el Email del adoptante',() =>{
        dao.adoptante.getDataAdoptante(id,function(err,result){
            assert.deepStrictEqual(result.email, datosAdoptante[0]);
        });
    });
});

describe("Password tipo", () =>{
    it('Devuelve la password del adoptante',() =>{
        dao.adoptante.getDataAdoptante(id,function(err,result){
            assert.deepStrictEqual(result.password, datosAdoptante[1]);
        });
    });
});

describe("Nombre tipo", () =>{
    it('Devuelve el nombre del adoptante',() =>{
        dao.adoptante.getDataAdoptante(id,function(err,result){
            assert.deepStrictEqual(result.nombre, datosAdoptante[2]);
        });
    });
});

describe("Apellidos tipo", () =>{
    it('Devuelve los Apellidos del adoptante',() =>{
        dao.adoptante.getDataAdoptante(id,function(err,result){
            assert.deepStrictEqual(result.apellidos, datosAdoptante[3]);
        });
    });
});

describe("Ciudad tipo", () =>{
    it('Devuelve la ciudad del adoptante',() =>{
        dao.adoptante.getDataAdoptante(id,function(err,result){
            assert.deepStrictEqual(result.ciudad, datosAdoptante[5]);
        });
    });
});

describe("Direccion tipo", () =>{
    it('Devuelve la direccion del adoptante',() =>{
        dao.adoptante.getDataAdoptante(id,function(err,result){
            assert.deepStrictEqual(result.direccion, datosAdoptante[6]);
        });
    });
});

describe("Telefono tipo", () =>{
    it('Devuelve el telefono del adoptante',() =>{
        dao.adoptante.getDataAdoptante(id,function(err,result){
            assert.deepStrictEqual(result.telefono, datosAdoptante[7]);
        });
    });
});

describe("Estado tipo", () =>{
    it('Devuelve el estado del adoptante',() =>{
        dao.adoptante.getDataAdoptante(id,function(err,result){
            assert.deepStrictEqual(result.estado, datosAdoptante[8]);
        });
    });
});


