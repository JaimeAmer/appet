var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');
var middles=require('../routes/middlewares');


////////////////////////////Rutas Invitados////////////////////////////////
router.get("/regadoptante", function(request, response) {
    response.render("./registroAdoptante", { tipo: request.session.typeU, 
                idU: request.session.idU, errors: undefined, mensaje: undefined });
});

router.get("/registroProtectora", function(request, response) {
    response.render("./registroProtectora", { tipo: request.session.typeU,
                idU: request.session.idU, errors: undefined, mensaje: undefined });
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


router.post("/regprotectora", function(request, response) {
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
});



module.exports = router;