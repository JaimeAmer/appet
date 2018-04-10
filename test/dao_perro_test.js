var assert = require("chai").assert;
var dao = require('../dao/dao');
var expect  = require("chai").expect;

const perro1 = {id: 1, idProtectora:1, nombre: "Baby", edad:2, raza:"collie", color: "golden", peso:15, fallecido:0};
const perro2 = {id: 2, idProtectora:1, nombre: "Cari", edad:3, raza:"weimaraner", color: "marron", peso:25, fallecido:0};
const perro3 = {id: 3, idProtectora:1, nombre: "Cuco", edad:4, raza:"corgi gales de Cardigan", color: "golden", peso:17, fallecido:0};
const perro4 = {id: 4, idProtectora:2, nombre: "Nano", edad:5, raza:"bull terrier", color: "blanco", peso:28, fallecido:0};
const perro5 = {id: 5, idProtectora:2, nombre: "Samy", edad:3, raza:"beagle", color: "con manchas", peso:16, fallecido:0};
const perro6 = {id: 6, idProtectora:3, nombre: "Pixi", edad:1, raza:"cavalier king", color: "blanco y marron", peso:4, fallecido:0};
const perro7 = {id: 7, idProtectora:4, nombre: "Simba", edad:5, raza:"boxer", color: "marron", peso:20, fallecido:0};
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