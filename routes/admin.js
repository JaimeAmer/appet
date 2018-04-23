var express = require('express');
var _ = require("underscore");
var router = express.Router();
let dao = require('../dao/dao');



/ GET users listing. /
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/listaAdoptantes", function(request, response) {
  dao.adoptante.getAdoptantes((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./administrarAdoptantes", { tipo: request.session.typeU, idU: request.session.idU, adoptantes: rows });
    }
  });
});
router.get("/listaProtectoras", function(request, response) {
  dao.protectora.listaProtectoras((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows });
    }
  });
});

module.exports = router;