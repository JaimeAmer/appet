var assert = require("chai").assert;
var dao = require('../dao/dao');
var expect  = require("chai").expect;


//Tests de comprobacion de tipo de datos correctos

describe("Color tipo", () =>{
    it('El color es del tipo String',() =>{
        dao.perro.getDataPerro(1,function(err,result){
            assert.typeOf(result.color, 'string');
        });
    });
});

describe("Nombre tipo", () =>{
    it('El nombre es del tipo String',() =>{
        dao.perro.getDataPerro(1,function(err,result){
            assert.typeOf(result.nombre, 'string');
        });
    });
});

describe("Edad tipo", () =>{
    it('La edad es de tipo number',() =>{
        dao.perro.getDataPerro(1,function(err,result){
            assert.typeOf(result.edad, 'number');
        });
    });
});

describe("Raza tipo", () =>{
    it('La raza es del tipo String',() =>{
        dao.perro.getDataPerro(1,function(err,result){
            assert.typeOf(result.raza, 'string');
        });
    });
});

describe("Peso tipo", () =>{
    it('El peso es de tipo number',() =>{
        dao.perro.getDataPerro(1,function(err,result){
            assert.typeOf(result.peso, 'number');
        });
    });
});

describe("idProtectora tipo", () =>{
    it('El id de la protectora es de tipo number',() =>{
        dao.perro.getDataPerro(1,function(err,result){
            assert.typeOf(result.idProtectora, 'number');
        });
    });
});


//Tests de comprobacion de datos correctos

describe("Nombre", () =>{
    it('Devuelve el nombre del perro',() =>{
        dao.perro.getDataPerro(3,function(err,result){
            assert.deepStrictEqual(result.nombre, "Cuco");
        });
    });
});

describe("Color", () =>{
    it('Devuelve el color del perro',() =>{
        dao.perro.getDataPerro(1,function(err,result){
            assert.deepStrictEqual(result.color, "golden");
        });
    });
});

describe("Edad", () =>{
    it('Devuelve la edad del perro', () =>{
        dao.perro.getDataPerro(1,function(err,result){
            assert.deepStrictEqual(result.edad, 2);
        });    
    })
});

describe("Raza", () =>{
    it('Devuelve la raza del perro', () =>{
        dao.perro.getDataPerro(7,function(err,result){
            assert.deepStrictEqual(result.raza, "boxer");
        });    
    })
});

describe("Peso", () =>{
    it('Devuelve el peso del perro', () =>{
        dao.perro.getDataPerro(4,function(err,result){
            assert.deepStrictEqual(result.peso, 28);
        });    
    })
});

describe("Protectora", () =>{
    it('Devuelve el id de la protectora del perro', () =>{
        dao.perro.getDataPerro(3,function(err,result){
            assert.deepStrictEqual(result.idProtectora, 1);
        });    
    })
});