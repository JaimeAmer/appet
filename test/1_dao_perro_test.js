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
        dao.perro.getDataPerro(3,function(err,result){
            assert.deepStrictEqual(result.color, "negro y marron");
        });
    });
});

describe("Edad", () =>{
    it('Devuelve la edad del perro', () =>{
        dao.perro.getDataPerro(3,function(err,result){
            assert.deepStrictEqual(result.edad, 1);
        });    
    })
});

describe("Raza", () =>{
    it('Devuelve la raza del perro', () =>{
        dao.perro.getDataPerro(3,function(err,result){
            assert.deepStrictEqual(result.raza, "rottweiler ");
        });    
    })
});

describe("Peso", () =>{
    it('Devuelve el peso del perro', () =>{
        dao.perro.getDataPerro(3,function(err,result){
            assert.deepStrictEqual(result.peso, 2);
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

describe("Lista perro protectora", () =>{
    it('Lista perro de una protectora', () =>{
        dao.perro.getListaPerrosProtectora(1,function(err,result){
            setTimeout(result, 1000);
        });    
    })
});

describe("Lista perro protectora adoptados", () =>{
    it('Lista perro de una protectora adoptados', () =>{
        dao.perro.getListaPerrosProtectoraAdoptados(1,function(err,result){
            setTimeout(result, 1000);
        });    
    })
});

const perroUpd = {imagen:1, texto:{nombre:"Test", edad:2, raza:"Pitbull", color:"Negro", peso:3, fallecido:0, adoptado:0, descripcion:"Es buen perro", id:1}};

describe("Actualiza perro", () =>{
    it('Actualiza perro datos id 1', () =>{
        dao.perro.updatePerro(perroUpd,function(err,result){
            setTimeout(result, 1000);
        });    
    })
});

describe("Adoptar perro", () =>{
    it('Adoptar perro de 1', () =>{
        dao.perro.adoptarPerro(1,function(err,result){
            setTimeout(result, 1000);
        });    
    })
});

describe("Eliminar perro", () =>{
    it('Eliminar perro 1', () =>{
        dao.perro.deletePerro(1,1,function(err,result){
            setTimeout(result, 1000);
        });    
    })
});


const perro = {idProtectora:1, nombre:"Test", foto:1, edad:1, raza:"test", color:"Negro", peso:3, descripcion:"Es buen perro"};

describe("Eliminar perro", () =>{
    it('Eliminar perro 1', () =>{
        dao.perro.newPerro(perro,function(err,result){
            setTimeout(result, 1000);
        });
    })
});
