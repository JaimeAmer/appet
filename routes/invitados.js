var express = require('express');
var router = express.Router();
var dao = require('../dao/dao');

/**
 * GET
 * Para la dirección "/"" redirige a "/index.html"
 */
router.get("/", function(request, response) {
    response.render("./index", {});
});

router.get("/iraprotectora", function(request, response) {
    dao.protectora.listaProtectoras((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            console.log("exito, redirigimos a protectoras way");
            response.render("./protectoras", { protectoras: rows });
        }
    });

});


router.get("/iraacercadeappet", function(request, response) {
    console.log("VAMOS BIEN");
    response.render("./acercadeappet", {})
});

router.get("/iracomoadoptar", function(request, response) {
    console.log("VAMOS BIEN");
    response.render("./comoadoptar", {})
});

router.get("/iralistarperros", function(request, response) {
    console.log("VAMOS BIEN");
    response.render("./listarperros", {})
});

router.get("/detalleprotectora.html", function(request, response) {
    let idProtectora = Number(request.query.ident);
    console.log("EL ID DE LA PROTECTORA ES:" + idProtectora);
    dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            console.log("DATOS PROTECTORA: " + rows[0]);
            response.render("./detalleprotectora", { datos: rows[0] });
        }

    });

});

router.get("/index", function(request, response) {
    response.render("./index", {});
});

module.exports = router;