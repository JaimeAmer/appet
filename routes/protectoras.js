var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');
var middles=require('../routes/middlewares');
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });

/* GET users listing. */
router.get('/misperros', middles.verifyProtectora,//Verifica que es Protectora
                        function(request, response) {
                            
      msg=undefined;                      
     if(request.session.msgP!==undefined){
         msg=request.session.msgP;
         request.session.msgP=undefined;
     }                       
    
    dao.protectora.getMisPerros(request.session.idU,(err, perros)=>{
        if(err){
            response.status(400);
            response.end();
        }else{
            response.render('./misperros', {idU:request.session.idU, 
                            tipo:request.session.typeU, perros:perros, msg:msg});
        }
        
    } );
    
});

router.get('/nuevoperro', middles.verifyProtectora, function(request, response) {
    response.render('agregarPerro', {idU:request.session.idU, tipo:request.session.typeU,
                                msg:undefined});
});

router.post('/nuevoperro',upload.single("foto"), middles.verifyProtectora, function(request, response) {
    
    let warnings=new Array(); 
    let perro=new Object();
    //Verifica que los parametros no esten vacios 
    request.checkBody("nombre", "Nombre del perro no puede estar vacio.").notEmpty();
    request.checkBody("raza", "La raza  del perro no puede estar vacio.").notEmpty();
    request.checkBody("color", "El color del perro no puede estar vacio.").notEmpty();
    request.checkBody("edad", "La edad del perro no puede estar vacio.").notEmpty();
    request.checkBody("peso", "El peso del perro no puede estar vacio.").notEmpty();
    request.checkBody("descripcion", "La edad del perro no puede estar vacio.").notEmpty();
    
    //Verifica que haya una foto
    if(!request.file){
        warnings.push("La foto del perro no puede estar vacio.");
    }
 
    //Verfifica el size del la foto
    if(request.file.size >=65536)
      warnings.push("La foto del perro es muy pesada max(64KB).");
     
     perro.edad=new Number (request.body.edad);
     perro.peso=new Number (request.body.peso);
     
     //Verifica que sean positivos
     if (isNaN(perro.edad)||perro.edad<0)
         warnings.push("La edad del perro debe ser un entero positivo (>0)");
      if (isNaN(perro.peso)||perro.peso<0)
         warnings.push("El peso del perro debe ser un entero positivo (>0)");
     
            //console.log( );
            
     
    request.getValidationResult().then(result=>{
        //Si hay errores
         if(warnings.length>0 ||!result.isEmpty()){
              warnings=_.union(warnings,_.pluck(result.array(),'msg'));
              //console.log(warnings);
              response.render('agregarPerro',{ idU:request.session.idU, tipo:request.session.typeU,
                  msg:warnings, title:"Se ha producido un error", subtitle:"Los siguientes requisitos no se cumplen:"});
         }else{
            perro.foto=request.file.buffer;
            perro.nombre=request.body.nombre;
            perro.raza=request.body.raza;
            perro.color=request.body.color;
            perro.descripcion=request.body.descripcion;
            perro.idProtectora=request.session.idU;
            perro.edad=request.body.edad;
            perro.peso=request.body.peso;
            
            dao.perro.newPerro(perro, (error, result)=>{
                if(error){
                   response.status(400);
                   response.end(); 
                }else if(result){
                    response.render('agregarPerro', {idU:request.session.idU, tipo:request.session.typeU,
                                msg:new Array(), title:"Se ha actualizado mis perros exitosamente.", 
                                subtitle:"Pulse para volver a ver Mis Perros. "});
                }
            });
         }
    });
});

router.get('/eliminarperro',middles.verifyProtectora, function(request, response) {
    let idPerro = Number(request.query.idPerro);
    dao.perro.deletePerro(idPerro, request.session.idU, (error,result)=>{
        if(error){
            response.status(400);
            response.end();
        }else if(result){
            request.session.msgP="Se ha eliminado correctamente un perro de la Protectora";
            response.redirect('/misperros');
        }
    });
});




module.exports = router;