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
    }else{
        //Verfifica el size del la foto
    if(request.file.size >=65536)
      warnings.push("La foto del perro es muy pesada max(64KB).");
    }
 
    
     
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

router.post("/modProtectora", middles.verifyProtectora, function(request, response) {
    let warnings = new Array();
    let mensaje = "";
    /**Comprobamos que los datos sean correctos y que no falte ningun campo */
    //   request.checkBody("email", "Formato email1 incorrecto").isEmail();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let datos = new Object();

            if (request.body.password !== request.body.password1) {
                warnings.push("Las contraseñas no coinciden");
                console.log(warnings);
                mensaje = "Las contraseñas no coinciden";
                response.render("./registroProtectora", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: mensaje });
            } else {
                console.log(request.body);
                datos.nombre = request.body.nombre;
                datos.ciudad = request.body.ciudad;
                datos.imagen = request.body.imagen;
                datos.email = request.body.email;
                datos.password = request.body.password;
                datos.direccion = request.body.direccion;
                datos.telefono = request.body.telefono;
                datos.descripcion = request.body.descripcion;
				datos.latitud = request.body.latitud;
				datos.longitud = request.body.longitud;
                datos.imagen=null;
				datos.id=request.body.id;
                
                //Verficamos que exista una foto
                if (request.file) {
                    datos.imagen= request.file.buffer;
                }
                

                dao.protectora.updateProtectora(datos, (error, result) => {
                    if (error) {
                        if (error.errno === 1062) {
                            warnings.push("El email ya esta dado de alta en el sistema");
                            console.log(warnings);
                            mensaje = "El email ya esta dado de alta en el sistema";
                            response.render("./", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: mensaje });
                        } else
                            console.log(error.message);
                    } else if (result) {
                        response.render("./", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "exito" });
                    } else {
                        response.render("./", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "exito" });
                    }
                });
            }
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./modificarPerfil", { tipo: request.session.typeU, idU: request.session.idU, errors: result.array(), mensaje: undefined });
        }

    });
});

router.get('/solicitudesadopcion', middles.verifyProtectora, function(request,response){});

router.get('/aceptaradopcion',middles.verifyProtectora, function(request,response){});

router.get('/rechazaradopcion', middles.verifyProtectora, function(request,response){});
module.exports = router;