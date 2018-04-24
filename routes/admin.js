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
        response.render("./administrarAdoptantes", { tipo: request.session.typeU, idU: request.session.idU, adoptantes: rows, msg: request.session.msg });
    }
  });
});
router.get("/listaProtectoras", function(request, response) {
  dao.protectora.listaProtectoras((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: request.session.msg });
    }
  });
});

router.get('/eliminarProtectora', function(request, response) {
  let idProtectora = Number(request.query.idProtectora);
  dao.protectora.eliminarProtectora(idProtectora, (err, result) => {
    if (err) {
      request.session.msg="Ha habido un error al borrar la protectora";
      response.redirect("./listaProtectoras");
    } else {
      request.session.msg="Protectora con ID="+ idProtectora+" eliminada";
      response.redirect("./listaProtectoras");
    }
    
  });
});

router.get('/eliminarAdoptante', function(request, response) {
  let idAdoptante = Number(request.query.idAdoptante);
  dao.adoptante.eliminarAdoptante(idAdoptante, (err, result) => {
    if (err) {
      request.session.msg="Ha habido un error al borrar el adoptante";
      response.redirect("./listaAdoptantes");
    } else {
      request.session.msg="Adoptante con ID="+ idAdoptante+" eliminado";
      response.redirect("./listaAdoptantes");
    }
    
  });
});

module.exports = router;