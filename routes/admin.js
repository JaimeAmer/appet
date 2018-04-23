var express = require('express');
var _ = require("underscore");
var router = express.Router();
let dao = require('../dao/dao');


/* GET users listing. */
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

router.get('/eliminarProtectora', function(request, response) {/*
  let idProtectora = Number(request.query.idProtectora);
  alert("Protectora con ID="+ idProtectora+" eliminada");
  dao.protectora.eliminarProtectora((err, rows) => {
    if (err) {
      alert("Ha habido un error al borrar la protectora");
    } else {
      alert("Protectora con ID="+ idProtectora+" eliminada");
      response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows });
    }
    
  });*/
});

module.exports = router;