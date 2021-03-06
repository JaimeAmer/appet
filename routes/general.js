var express = require('express');
var router = express.Router();
var _ = require("underscore");
var dao = require('../dao/dao');

/* Peticiones que comparten varios Roles  */
router.get("/", function(request, response) {
    response.render("./index", { tipo: request.session.typeU, 
        idU: request.session.idU, mensaje:undefined });
});

router.get("/index", function(request, response) {
    response.redirect('/');
});

router.get("/acercadeappet", function(request, response) {
    response.render("./acercadeappet", { tipo: request.session.typeU,
        idU: request.session.idU });
});

router.get("/comoadoptar", function(request, response) {
    response.render("./comoadoptar", { tipo: request.session.typeU,
        idU: request.session.idU });
});

router.get("/login", function(request, response) {
    response.render("./login", { tipo: request.session.typeU, 
        idU: request.session.idU, errors: undefined, mensaje: undefined });
});

router.get('/modificarPerfil', function(request, response) {
    /* Hay que hacer distinción entre los diferentes usuarios para redirección*/
if (request.session.typeU === "Protectora" || 
        request.session.typeU === "ProtectoraPendiente") {
        let idProtectora = request.session.idU;
        dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                if(rows.pendiente===1){
					console.log("Pendiente");
                    request.session.typeU = "ProtectoraPendiente";
                }else{
                response.render("./modificarProtectora", { tipo: request.session.typeU, idU: request.session.idU, idp: idProtectora, datos: rows,mensaje:undefined });
				}
            }
        });
    }else if(request.session.typeU === "Adoptante"){
       let idAdoptante = request.session.idU;
        dao.adoptante.getDataAdoptante(idAdoptante, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                response.render("./modificarAdoptante", { tipo: request.session.typeU, idU: request.session.idU, idp: idAdoptante, datos: rows,mensaje:undefined });
            }
        });
    }else if(request.session.typeU === "Administrador"){
        response.redirect("/index",{ mensaje:undefined});
    }
    else{
        console.log("Fallo, no es un usuario válido");
    }
});

router.post("/login", function(request, response) {
    let warnings = new Array();
    /**Comprobamos que los datos sean correctos y que no falte ningun campo */
    request.checkBody("userEmail", "Formato email incorrecto").isEmail();
    request.checkBody("tipo", "Debes seleccioar un tipo de usuario").notEmpty();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let info = {
                user: "",
                password: "",
                tipo: ""
            };
            info.user = request.body.userEmail;
            info.password = request.body.password;
            info.tipo = request.body.tipo;
            dao.general.verifyUser(info, (error, result) => {
                if (error)
                    console.log(error.message);
                else if (result) {
                    request.session.idU = result.id;
                    request.session.typeU = request.body.tipo;
                    response.redirect('/perfil');
                } else {
                    warnings.push("Los datos no coinciden");
                    console.log(warnings);
                    let mensaje = "El usuario con esos datos no se encuentra en este tipo de usuario";
                    response.render("./login", { tipo: request.session.typeU,
                        idU: request.session.idU, errors: undefined, mensaje: mensaje });
                }
            });
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./login", { tipo: request.session.typeU,
                idU: request.session.idU, errors: result.array(), mensaje: undefined });
        }
    });
});

router.get('/logout', function(request, response) {
    request.session.destroy();
    response.redirect('/');
});

router.get('/perfil', function(request, response) {
    /* Hay que hacer distinción entre los diferentes usuarios para redirección*/
if (request.session.typeU === "Protectora" || request.session.typeU === "ProtectoraPendiente") {
        let idProtectora = request.session.idU;
        dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                if(rows.pendiente===1){
                    request.session.typeU = "ProtectoraPendiente";
                }
                response.render("./perfilProtectora", 
                { tipo: request.session.typeU, idU: request.session.idU,
                    idp: idProtectora, datos: rows });
            }
        });
    }else if(request.session.typeU === "Adoptante"){
        let idAdoptante = request.session.idU;
        dao.adoptante.getDataAdoptante(idAdoptante, function(err, rows){
            if (err) {
                response.status(400);
                response.end();
            } else {
                response.render("./perfilAdoptante", 
                { tipo: request.session.typeU, idU: request.session.idU,
                    ida: idAdoptante, datos: rows });
            }
        });
    }else if(request.session.typeU === "Administrador"){
        response.redirect("/index");
    }
    else{
        console.log("Fallo, no es un usuario válido");
    }
});

   router.get('/img/perro/:id',function(request,response){
     let n=request.params.id;
      
        if(isNaN(n)){
            response.status(400);
            response.end("Peticion incorrecta");
        
        }else{
           dao.general.getImagePerro(n,(error,image)=>{
                if(image){
                    response.end(image);
                }else if(error){
                    console.log(error);
                }
            });
        }
});

router.get('/img/protectora/:id',function(request,response){
     let n=request.params.id;
      
        if(isNaN(n)){
            response.status(400);
            response.end("Peticion incorrecta");
        
        }else{
           dao.general.getImageProtectora(n,(error,image)=>{
                if(image){
                    response.end(image);
                }else if(error){
                    console.log(error);
                }
            });
        }
});


router.get("/perros",function(request, response) {
    dao.perro.getListaPerros((err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            response.render("./listarperros", { tipo: request.session.typeU, 
                idU: request.session.idU, perros: rows });
        }
    });
});

router.get('/perro', function(request,response){
    let idPerro = Number(request.query.idPerro);
    
    dao.perro.getDataPerro(idPerro, (err, dataPerro) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            dao.protectora.getNombreProtectora(dataPerro.idProtectora,
                                                    (err,resultado)=>{
                                                if(err){
                                                    response.status(400);
                                                    response.end();
                                                }else{
                                                   let datosPerro = {
                        id: dataPerro.id,
                        idProtectora: resultado.id,
                        nombProtectora: resultado.nombre,
                        nombre: dataPerro.nombre,
                        foto: dataPerro.foto,
                        edad: dataPerro.edad,
                        color: dataPerro.color,
                        raza: dataPerro.raza,
                        peso: dataPerro.peso,
                        descripcion: dataPerro.descripcion,
                        fallecido: dataPerro.fallecido
                    };
                    response.render("./detalleperro", 
                    { tipo: request.session.typeU, idU: request.session.idU,
                        perro: datosPerro });
                    }
            });
        }
    });
    
});

router.get("/protectoras", function(request, response) {
    dao.protectora.listaProtectoras((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            console.log("exito, redirigimos a protectoras way");
            response.render("./protectoras", { tipo: request.session.typeU,
                idU: request.session.idU, protectoras: rows });
        }
    });

});

router.get("/protectora", function(request, response) {
    let idProtectora = Number(request.query.ident);
    
    dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            response.render("./detalleprotectora", { tipo: request.session.typeU,
                idU: request.session.idU, idp: idProtectora, datos: rows });
        }
    });
});

router.get("/perrosprotectora", function(request, response) {
    let idProtectora = Number(request.query.ident);
    let nombreProtectora = String(request.query.nombrepro);


    //console.log("Id de la protectora: " + idProtectora);
    //console.log("Nombre  de la protectora: " + nombreProtectora);

    dao.perro.getListaPerrosProtectora(idProtectora, (err, rows) => {
        if (err) {
           
            response.status(400);
            response.end();
        } else {
            response.render("./listarperrosprotectora",
            { tipo: request.session.typeU, idU: request.session.idU,
                nombrep: nombreProtectora, idp: idProtectora, perros: rows });
        }

    });

});





module.exports = router;