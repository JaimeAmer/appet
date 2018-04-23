var express = require('express');
var router = express.Router();
var _ = require("underscore");
var dao = require('../dao/dao');

/* GET users listing. */
router.get("/", function(request, response) {
    response.render("./index", { tipo: request.session.typeU, idU: request.session.idU });
});

router.get("/index", function(request, response) {
    response.render("./index", { tipo: request.session.typeU, idU: request.session.idU });
});

router.get("/acercadeappet", function(request, response) {
    response.render("./acercadeappet", { tipo: request.session.typeU, idU: request.session.idU });
});

router.get("/login", function(request, response) {
    response.render("./login", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: undefined });
});


router.get('/perfil', function(request, response) {
    /* Hay que hacer distinción entre los diferentes usuarios para redirección*/
if (request.session.typeU === "Protectora") {
        let idProtectora = request.session.idU;
        dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                response.render("./perfilProtectora", { tipo: request.session.typeU, idU: request.session.idU, idp: idProtectora, datos: rows });
            }
        });
    }else if(request.session.typeU === "Adoptante"){
        console.log("Aún no hay vista");
        response.redirect("/index");
    }else if(request.session.typeU === "Administrador"){
        response.redirect("/index");
    }
    else{
        console.log("Fallo, no es un usuario válido");
    }
});
module.exports = router;