var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');
var middles=require('../routes/middlewares');
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });

////////////////////////////Rutas Invitados////////////////////////////////
router.get("/regadoptante", function(request, response) {
    response.render("./registroAdoptante", { tipo: request.session.typeU, 
                idU: request.session.idU, errors: undefined, mensaje: undefined });
});

router.get("/regprotectora", function(request, response) {
   response.render('registroProtectora', {idU:request.session.idU, tipo:request.session.typeU,
                                msg:undefined});
});




router.post("/regadoptante", function(request, response) {
    let warnings = new Array();
    let mensaje = "";
    /**Comprobamos que los datos sean correctos y que no falte ningun campo */
    request.checkBody("email", "Formato email incorrecto").isEmail();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let datos = new Object();

            if (request.body.password !== request.body.password1) {
                warnings.push("Las contraseñas no coinciden");
                console.log(warnings);
                mensaje = "Las contraseñas no coinciden";
                response.render("./registroAdoptante", { tipo: request.session.typeU,
                    idU: request.session.idU, errors: undefined, mensaje: mensaje });
            } else {
                //console.log(request.body);
                datos.email = request.body.email;
                datos.password = request.body.password;
                datos.nombre = request.body.nombre;
                datos.apellidos = request.body.apellidos;
                datos.fechaNacimiento = request.body.fecha;
                datos.ciudad = request.body.ciudad;
                datos.direccion = request.body.direccion;
                datos.telefono = request.body.telefono;
               
                
                dao.general.createAdoptante(datos, (error, result) => {
                    if (error) {
                        if (error.errno === 1062) {
                            warnings.push("El email ya esta dado de alta en el sistema");
                            console.log(warnings);
                            mensaje = "El email ya esta dado de alta en el sistema";
                            response.render("./registroAdoptante", 
                            { tipo: request.session.typeU, idU: request.session.idU,
                                errors: undefined, mensaje: mensaje });
                        } else
                            console.log(error.message);
                    } else if (result) {
                        response.render("./registroAdoptante", 
                        { tipo: request.session.typeU, idU: request.session.idU,
                            errors: undefined, mensaje: "exito" });
                        //response.redirect('/login');
                    } else {
                        response.render("./registroAdoptante", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "exito" });
                    }
                });
            }
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./registroAdoptante", { tipo: request.session.typeU, idU: request.session.idU, errors: result.array(), mensaje: undefined });
        }

    });
});


router.post("/regprotectora",upload.single("foto"), function(request, response){
    //console.log(request.body);
    //console.log(request.file);
    
    let warnings = new Array();
    let protectora=new Object();
     //Verifica que los parametros no esten vacios 
    request.checkBody("nombre", "Nombre de la protectora no puede estar vacio.").notEmpty();
    request.checkBody("password", "Falta indicar el  password.").notEmpty();
    request.checkBody("password", "Falta indicar el  password una vez mas.").notEmpty();
    request.checkBody("ciudad", "Tienes que indicar la ciudad donde se ubica la protectora").notEmpty();
    request.checkBody("direccion", "Tienes que indicar la direccion donde se ubica la protectora").notEmpty();
    request.checkBody("telefono", "Tienes que indicar el telefono de la protectora").notEmpty();
    request.checkBody("descripcion", "Tienes que indicar la ciudad donde se ubica la protectora").notEmpty();
    
    if(!request.file)
        warnings.push("La foto de la protectora no puede estar vacio.");
    else{
         //Verfifica el size del la foto
    if(request.file.size >=65536)
      warnings.push("La foto de la protectora es muy pesada max(64KB).");
    }
    
    if (request.body.password !== request.body.password1) {
                warnings.push("Las contraseñas no coinciden");}
  
  request.getValidationResult().then(result=>{
        //Si hay errores
         if(warnings.length>0 ||!result.isEmpty()){
             warnings=_.union(warnings,_.pluck(result.array(),'msg'));
             response.render('registroProtectora',{ idU:request.session.idU, tipo:request.session.typeU,
                  msg:warnings, title:"Se ha producido un error", subtitle:"Los siguientes requisitos no se cumplen:"});
         }else{
             protectora.imagen=request.file.buffer;
             protectora.nombre=request.body.nombre;
             protectora.email=request.body.email;
             protectora.ciudad=request.body.ciudad;
             protectora.direccion=request.body.direccion;
             protectora.telefono=request.body.telefono;
             protectora.latitud=request.body.latitud;
             protectora.longitud=request.body.longitud;
             protectora.descripcion=request.body.descripcion;
             protectora.password=request.body.password;
             
             dao.protectora.createProtectora(protectora,(error,result)=>{
                 if(error){
                     if(error.errno === 1062){
                     warnings.push("El correo ya esta registrado en el sistema.");
                     response.render('registroProtectora',{ idU:request.session.idU, tipo:request.session.typeU,
                  msg:warnings, title:"Se ha producido un error", subtitle:" "});
                 }
                 }else if(result){
                     response.redirect('/login');
                 }
             });
         }});
   
}); /*{
   
    let mensaje = "";
    /**Comprobamos que los datos sean correctos y que no falte ningun campo 
    //   request.checkBody("email", "Formato email1 incorrecto").isEmail();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let datos = new Object();

            
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
                datos.imagen=null;
                
                //Verficamos que exista una foto
                if (request.file) {
                    datos.imagen= request.file.buffer;
                }
                

                dao.protectora.createProtectora(datos, (error, result) => {
                    if (error) {
                        if (error.errno === 1062) {
                            warnings.push("El email ya esta dado de alta en el sistema");
                            console.log(warnings);
                            mensaje = "El email ya esta dado de alta en el sistema";
                            response.render("./registroProtectora", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: mensaje });
                        } else
                            console.log(error.message);
                    } else if (result) {
                        response.render("./registroProtectora", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "exito" });
                    } else {
                        response.render("./registroProtectora", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "exito" });
                    }
                });
            }
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./registroProtectora", { tipo: request.session.typeU, idU: request.session.idU, errors: result.array(), mensaje: undefined });
        }

    });
});*/



module.exports = router;