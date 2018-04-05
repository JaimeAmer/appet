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

router.get("/iradetalleperro", function(request, response) {
    console.log("VAMOS BIEN A DETALLE PERRO");
    response.render("./detalleperro", {})
});

router.get("/index", function(request, response) {
    response.render("./index", {});
});

module.exports = router;