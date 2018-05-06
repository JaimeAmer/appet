var assert = require("chai").assert;
var dao = require('../dao/dao');
var expect  = require("chai").expect;


//Tests de comprobacion de tipo de datos correctos
describe("Nombre tipo", () =>{
    it('El nombre de la protectora es del tipo String',() =>{
        dao.protectora.getDataProtectora(1,function(err,result){
            assert.typeOf(result.nombre, 'string');
        });
    });
});

describe("Ciudad tipo", () =>{
    it('La ciudad es del tipo String',() =>{
        dao.protectora.getDataProtectora(1,function(err,result){
            assert.typeOf(result.ciudad, 'string');
        });
    });
});

describe("Imagen tipo", () =>{
    it('La imagen es del tipo String',() =>{
        dao.protectora.getDataProtectora(1,function(err,result){
            assert.typeOf(result.imagen, 'string');
        });
    });
});

describe("Email tipo", () =>{
    it('El email es del tipo String',() =>{
        dao.protectora.getDataProtectora(1,function(err,result){
            assert.typeOf(result.email, 'string');
        });
    });
});

describe("Contraseña tipo", () =>{
    it('La contraseña es del tipo String',() =>{
        dao.protectora.getDataProtectora(1,function(err,result){
            assert.typeOf(result.password, 'string');
        });
    });
});

describe("Dirección tipo", () =>{
    it('La dirección es del tipo String',() =>{
        dao.protectora.getDataProtectora(1,function(err,result){
            assert.typeOf(result.direccion, 'string');
        });
    });
});

describe("Telefono tipo", () =>{
    it('El telefono es del tipo int',() =>{
        dao.protectora.getDataProtectora(1,function(err,result){
            assert.typeOf(result.telefono, 'number');
        });
    });
});

describe("Descripción tipo", () =>{
    it('La descripción es del tipo text',() =>{
        dao.protectora.getDataProtectora(1,function(err,result){
            assert.typeOf(result.descripcion, 'string');
        });
    });
});


// datos de BBDD id=3
// Nombre, Ciudad, Imagen, Email, password, telefono, pendiente

var datosProtectora = [
	'Asociacion las Nieves',
	'Madrid',
	'lasnieves.png',
	'lasnieves@gmail.com',
	'1234',
	901987654,
	0
 ];
 
//Tests de comprobacion de datos correctos del id=3

describe("Nombre", () =>{
    it('Devuelve el nombre de la protectora',() =>{
        dao.protectora.getDataProtectora(3,function(err,result){
            assert.deepStrictEqual(result.nombre, datosProtectora[0]);
        });
    });
});

describe("Ciudad tipo", () =>{
    it('Devuelve la ciudad de la protectora',() =>{
        dao.protectora.getDataProtectora(3,function(err,result){
            assert.deepStrictEqual(result.ciudad, datosProtectora[1]);
        });
    });
});

describe("Imagen tipo", () =>{
    it('Devuelve la imagen de la protectora',() =>{
        dao.protectora.getDataProtectora(3,function(err,result){
            assert.deepStrictEqual(result.imagen, datosProtectora[2]);
        });
    });
});

describe("Email tipo", () =>{
    it('Devuelve el email de la protectora',() =>{
        dao.protectora.getDataProtectora(3,function(err,result){
            assert.deepStrictEqual(result.email, datosProtectora[3]);
        });
    });
});

describe("Contraseña tipo", () =>{
    it('Devuelve la contraseña de la protectora',() =>{
        dao.protectora.getDataProtectora(3,function(err,result){
            assert.deepStrictEqual(result.password, datosProtectora[4]);
        });
    });
});

describe("Telefono tipo", () =>{
    it('Devuelve el telefono de la protectora',() =>{
        dao.protectora.getDataProtectora(3,function(err,result){
            assert.deepStrictEqual(result.telefono, datosProtectora[5]);
        });
    });
});

describe("Pediente tipo", () =>{
    it('Devuelve el pendiente de la protectora',() =>{
        dao.protectora.getDataProtectora(3,function(err,result){
            assert.deepStrictEqual(result.pendiente, datosProtectora[6]);
        });
    });
});

const protectoraUpd = {imagen:1, texto:{nombre:"Test", ciudad:"test", email:"test@test.com", password:"1234test", direccion:"test 4 1A", telefono:000000000, descripcion:"Es buen perro", longitud:0, latitud:0, id:1}};

describe("Actualiza Protectora 1", () =>{
    it('Actualiza protectora con id 1',() =>{
        dao.protectora.updateProtectora(protectoraUpd,function(err,result){
            setTimeout(result, 1000);
        });
    });
});

describe("Lista Protectora", () =>{
    it('Lista protectora',() =>{
        dao.protectora.listaProtectoras(function(err,result){
            setTimeout(result, 1000);
        });
    });
});

describe("Lista Protectora", () =>{
    it('Lista protectora',() =>{
        dao.protectora.listaProtectoras(function(err,result){
            setTimeout(result, 1000);
        });
    });
});

const protectora = {imagen:1, nombre:"Test", ciudad:"test", email:"test@test.com", password:"1234test", direccion:"test 4 1A", telefono:000000000, descripcion:"Es buen perro", longitud:0, latitud:0};
					
describe("Crear Protectora", () =>{
    it('Crear protectora',() =>{
        dao.protectora.createProtectora(protectora,function(err,result){
            setTimeout(result, 1000);
        });
    });
});

describe("Eliminar Protectora", () =>{
    it('Eliminar protectora',() =>{
        dao.protectora.eliminarProtectora(1,function(err,result){
            setTimeout(result, 1000);
        });
    });
});