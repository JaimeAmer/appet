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
                        nombProtectora: resultado,
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
            response.render("./detalleprotectora", { idU: request.session.idU, idp: idProtectora, datos: rows[0] });
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

    request.checkBody("email", "Email no puede estar vacio.").notEmpty();
    request.checkBody("pass", "Clave no puede estar vacia.").notEmpty();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            dao.general.verifyUser(request.body, (error, result) => {
                if (error)
                    console.log(error.message);
                else if (result) {
                    request.session.idU = result.id;
                    request.session.typeU = request.body.gridRadios;
                    //response.render('./perfil', { idU: request.session.idU });
                    response.redirect('/perfil');
                } else {
                    warnings.push("Los datos no coinciden");
                    console.log(warnings);
                }
            });
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
        }
    });
});

router.get('/perfil',function(request,response){
    response.render('./perfil', { idU: request.session.idU });
});
module.exports = router;