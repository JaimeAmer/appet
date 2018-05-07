var express = require('express');
var router = express.Router();
var middles = require('../routes/middlewares');
var dao = require('../dao/dao');
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });

/**
 * Ruta que muestra la vista del formulario de adopcion
 * @name get/formularioAdopcion
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/formularioAdopcion', middles.verifyAdoptante, function(request, response, next) {
    let idProtectora = Number(request.query.idProtectora);
    let idPerro = Number(request.query.idPerro);
    let idAdoptante = Number(request.query.idAdoptante);

    response.render("./formAdopcion", { idPerro: idPerro, idProtectora: idProtectora, idAdoptante: idAdoptante, tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: undefined });

});

/**
 * Ruta que muestra la vista de la lista de solicitudes de adopcion de un adoptante
 * @name get/solicitudesAdoptante
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/solicitudesAdoptante', middles.verifyAdoptante, function(request, response, next) {
    let idAdoptante = request.session.idU;
    dao.adoptante.getSolicitudes(idAdoptante, (err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            
            response.render("./solicitudesAdoptante", { tipo: request.session.typeU, idU: request.session.idU, solicitudes: rows});
        }
    });
});

/**
 * Ruta que registra una solicitud de adopcion en la base de datos
 * @name get/enviarSolicitudAdopcion
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/enviarSolicitudAdopcion', middles.verifyAdoptante, function(request, response, next) {
    let idProtectora = Number(request.query.idProtectora);
    let idPerro = Number(request.query.idPerro);
    let idAdoptante = Number(request.query.idAdoptante);
    let descripcion = String(request.query.descripcion);


    if (!descripcion || /^\s*$/.test(descripcion)) {
        console.log("DESCRIPCION vacia");
        response.render("./formAdopcion", { idPerro: idPerro, idProtectora: idProtectora, idAdoptante: idAdoptante, tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "Por favor, rellena el formulario" });

    } else {
        dao.adoptante.getDataAdoptante(idAdoptante, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                if (rows.estado === 0) {
                    response.render("./formAdopcion", { idPerro: idPerro, idProtectora: idProtectora, idAdoptante: idAdoptante, tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "No estás activo como adoptante, no puedes adoptar!" });
                } else {
                    dao.adoptante.getSolicitud(idAdoptante, idPerro, (err, rows) => {
                        if (err) {
                            response.status(400);
                            response.end();
                        } else {
                            if (rows.length !== 0) {
                                response.render("./formAdopcion", { idPerro: idPerro, idProtectora: idProtectora, idAdoptante: idAdoptante, tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "Ya has enviado la solicitud de adopción a este perro!" });
                            } else {
                                dao.adoptante.enviarSolicitudAdoptante(idAdoptante, idPerro, idProtectora, descripcion, (err) => {
                                    if (err) {
                                        response.status(400);
                                        response.end();
                                    } else {
                                        response.redirect('/solicitudesAdoptante');
                                    }

                                });
                            }
                        }

                    });
                }

            }

        });



    }
});

/**
 * Ruta que modifica los datos del formulario de modificar adoptante en la base de datos
 * @name post/modAdoptante
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.post("/modAdoptante", upload.single("imagen"), function(request, response) {
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
                response.render("./", {
                    tipo: request.session.typeU,
                    idU: request.session.idU,
                    errors: undefined,
                    mensaje: mensaje
                });
            } else {
                datos.texto = request.body;
                if (request.file == undefined)
                    datos.imagen = 1;
                else {
                    if (request.file.size >= 65536) {
                        response.render("./", { tipo: request.session.typeU, idU: request.session.idU, errors: result.array(), mensaje: "La foto del perro es muy pesada max(64KB)." });
                    } else
                        datos.imagen = request.file.buffer;
                }
                dao.adoptante.updateAdoptante(datos, (error, result) => {
                    if (error) {
                        if (error.errno === 1062) {
                            console.log(error);
                            warnings.push("El email ya esta dado de alta en el sistema");
                            console.log(warnings);
                            mensaje = "El email ya esta dado de alta en el sistema";
                            response.render("./", {
                                tipo: request.session.typeU,
                                idU: request.session.idU,
                                errors: undefined,
                                mensaje: mensaje
                            });
                        } else
                            console.log(error.message);
                    } else if (result) {
                        response.render("./", {
                            tipo: request.session.typeU,
                            idU: request.session.idU,
                            errors: undefined,
                            mensaje: "exito"
                        });
                    } else {
                        response.render("./", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "exito" });
                    }
                });
            }
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./", { tipo: request.session.typeU, idU: request.session.idU, errors: result.array(), mensaje: undefined });
        }

    });
});

module.exports = router;