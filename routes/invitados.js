var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');


router.get("/", function(request, response) {
    response.render("./index", { idU: request.session.idU });
});

router.get("/index", function(request, response) {
    response.render("./index", { idU: request.session.idU });
});
router.get("/login", function(request, response) {
    response.render("./login", {idU: request.session.idU, errors:undefined,  mensaje: undefined});
});
router.get("/iraprotectora", function(request, response) {
    dao.protectora.listaProtectoras((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            console.log("exito, redirigimos a protectoras way");
            response.render("./protectoras", { idU: request.session.idU, protectoras: rows });
        }
    });

});

/**
 *      llama a buscar lista de perros del dao del perro,
 *      - si no lo encuentra lanza el error: 400 y finaliza
 *      - si lo encuentra renderiza la plantila.ejs la de listar perros
 *      que se ajustara a los nuevos datos sacados del dao.
 */
router.get("/iralistarperros", function(request, response) {
    dao.perro.getListaPerros((err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            response.render("./listarperros", { idU: request.session.idU, perros: rows });
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
            response.render("./listarperrosprotectora", { idU: request.session.idU, nombrep: nombreProtectora, idp: idProtectora, perros: rows });
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
                    response.render("./detalleperro", { idU: request.session.idU, perro: datosPerro });
                }
            });
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
            response.render("./detalleprotectora", { idU: request.session.idU, idp: idProtectora, datos: rows });
        }
    });
});

router.get("/iraacercadeappet", function(request, response) {
    console.log("VAMOS BIEN");
    response.render("./acercadeappet", { idU: request.session.idU });
});

router.get("/iracomoadoptar", function(request, response) {
    console.log("VAMOS BIEN");
    response.render("./comoadoptar", { idU: request.session.idU });
});

router.get('/cerrarSesion', function(request, response) {
    //request.session.idU = undefined;
    //request.session.typeU = undefined;
    console.log(request.session.idU);
    request.session.destroy();
    response.render("./index", { idU: undefined });
});

router.post("/iniciarSesion", function(request, response) {
    let warnings = new Array();
    /**Comprobamos que los datos sean correctos y que no falte ningun campo */
    request.checkBody("userEmail", "Formato email incorrecto").isEmail();
    request.checkBody("tipo","Debes seleccioar un tipo de usuario").notEmpty();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let info={
                user: "",
                password:"",
                tipo:""
            };
            info.user=request.body.userEmail;
            info.password=request.body.password;
            info.tipo=request.body.tipo;
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
                    let mensaje="El usuario con esos datos no se encuentra en este tipo de usuario";
                    response.render("./login",{idU: request.session.idU, errors: undefined, mensaje:mensaje});
                }
            });
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./login",{idU: request.session.idU, errors: result.array(),  mensaje: undefined});
        }
    });
});

router.get('/perfil', function(request, response) {
    /* Hay que hacer distinción entre los diferentes usuarios para redirección*/
    response.render('./perfil', { idU: request.session.idU });
});
module.exports = router;