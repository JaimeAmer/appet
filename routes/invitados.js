var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');



////////////////////////////Rutas Invitados////////////////////////////////
router.get("/comoadoptar", function(request, response) {
    response.render("./comoadoptar", { tipo: request.session.typeU, idU: request.session.idU });
});

/**
 *      llama a buscar lista de perros del dao del perro,
 *      - si no lo encuentra lanza el error: 400 y finaliza
 *      - si lo encuentra renderiza la plantila.ejs la de listar perros
 *      que se ajustara a los nuevos datos sacados del dao.
 */
router.get("/perros", function(request, response) {
    dao.perro.getListaPerros((err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            response.render("./listarperros", { tipo: request.session.typeU, idU: request.session.idU, perros: rows });
        }
    });
});

router.get("/protectoras", function(request, response) {
    dao.protectora.listaProtectoras((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            console.log("exito, redirigimos a protectoras way");
            response.render("./protectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows });
        }
    });

});


/**
 *  llama a buscar detalles de perros del dao del perro,
 *      - si no lo encuentra lanza el error: 400 y finaliza
 *      - si lo encuentra renderiza la plantila.ejs la de mostrar
 *      detalles de un perro que se ajustara a los nuevos datos 
 *      sacados del dao.
 */
router.get("/detalleperro.html", function(request, response) {
    let idPerro = Number(request.query.idPerro);
    dao.perro.getDataPerro(idPerro, (err, dataPerro) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            dao.protectora.getNombreProtecotra(dataPerro.idProtectora, (err, resultado) => {
                if (err) {
                    response.status(400);
                    response.end();
                } else {
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
                    response.render("./detalleperro", { tipo: request.session.typeU, idU: request.session.idU, perro: datosPerro });
                }
            });
        }
    });
});



router.get("/registroAdoptante", function(request, response) {
    response.render("./registroAdoptante", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: undefined });
});

router.get("/registroProtectora", function(request, response) {
    response.render("./registroProtectora", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: undefined });
});




router.get("/iraperrosmiosprotectora", function(request, response) {
    if (request.session.typeU === "Protectora") {
        let idProtectora = request.session.idU;

        dao.perro.getListaPerrosProtectora(idProtectora, (err, rows) => {
            if (err) {
                console.log("VAMOS MAL");
                response.status(400);
                response.end();
            } else {
                response.render("./perrosmiosprotectora", { tipo: request.session.typeU, idU: request.session.idU, idp: idProtectora, perros: rows });
            }

        });
    } else {
        console.log("fallo");
    }
});

router.get("/iramiperfilprotectora", function(request, response) {
    if (request.session.typeU === "Protectora") {
        let idProtectora = request.session.idU;

        dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                response.render("./detalleprotectoramio", { tipo: request.session.typeU, idU: request.session.idU, idp: idProtectora, datos: rows });
            }
        });
    } else {
        console.log("fallo");
    }
});

router.post("/registroProtectora1", function(request, response) {
    let warnings = new Array();
    let mensaje = "";
    /**Comprobamos que los datos sean correctos y que no falte ningun campo */
    //   request.checkBody("email", "Formato email1 incorrecto").isEmail();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let datos = {
                nombre: "",
                ciudad: "",
                imagen: "",
                email: "",
                password: "",
                direccion: "",
                telefono: "",
                descripcion: ""
            };

            if (request.body.password != request.body.password1) {
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

                dao.protectora.createProtectora(datos, (error, result) => {
                    if (error) {
                        if (error.errno == 1062) {
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
});

router.post("/registroAdoptante1", function(request, response) {
    let warnings = new Array();
    let mensaje = "";
    /**Comprobamos que los datos sean correctos y que no falte ningun campo */
    request.checkBody("email", "Formato email incorrecto").isEmail();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let datos = {
                email: "",
                password: "",
                nombre: "",
                apellidos: "",
                fechaNacimiento: "",
                ciudad: "",
                direccion: "",
                telefono: ""
            };

            if (request.body.password != request.body.password1) {
                warnings.push("Las contraseñas no coinciden");
                console.log(warnings);
                mensaje = "Las contraseñas no coinciden";
                response.render("./registroAdoptante", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: mensaje });
            } else {
                console.log(request.body);
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
                        if (error.errno == 1062) {
                            warnings.push("El email ya esta dado de alta en el sistema");
                            console.log(warnings);
                            mensaje = "El email ya esta dado de alta en el sistema";
                            response.render("./registroAdoptante", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: mensaje });
                        } else
                            console.log(error.message);
                    } else if (result) {
                        response.render("./registroAdoptante", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "exito" });
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



router.get("/iralistarperrosprotectora", function(request, response) {
    let idProtectora = Number(request.query.ident);
    let nombreProtectora = String(request.query.nombrepro);


    console.log("Id de la protectora: " + idProtectora);
    console.log("Nombre  de la protectora: " + nombreProtectora);

    dao.perro.getListaPerrosProtectora(idProtectora, (err, rows) => {
        if (err) {
            console.log("VAMOS MAL");
            response.status(400);
            response.end();
        } else {
            response.render("./listarperrosprotectora", { tipo: request.session.typeU, idU: request.session.idU, nombrep: nombreProtectora, idp: idProtectora, perros: rows });
        }

    });

});



router.get("/detalleprotectora.html", function(request, response) {
    let idProtectora = Number(request.query.ident);
    console.log("TERMINAL: " + idProtectora);
    dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            response.render("./detalleprotectora", { tipo: request.session.typeU, idU: request.session.idU, idp: idProtectora, datos: rows });
        }
    });
});





router.get('/cerrarSesion', function(request, response) {
    //request.session.idU = undefined;
    //request.session.typeU = undefined;
    console.log(request.session.idU);
    request.session.destroy();
    response.render("./index", { tipo: undefined, idU: undefined });
});

router.post("/iniciarSesion", function(request, response) {
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
                    response.render("./login", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: mensaje });
                }
            });
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./login", { tipo: request.session.typeU, idU: request.session.idU, errors: result.array(), mensaje: undefined });
        }
    });
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







module.exports = router;