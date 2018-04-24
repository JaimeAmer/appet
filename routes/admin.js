var express = require('express');
var _ = require("underscore");
var router = express.Router();
let dao = require('../dao/dao');
let middleware = require('./middlewares');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/listaAdoptantes", middleware.verifyAdmin, function(request, response) {
  dao.adoptante.getAdoptantes((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./administrarAdoptantes", { tipo: request.session.typeU, idU: request.session.idU, adoptantes: rows, msg: undefined });
    }
  });
});
router.get("/listaProtectoras", middleware.verifyAdmin, function(request, response) {
  dao.protectora.listaProtectoras((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: undefined });
    }
  });
});

router.get('/eliminarProtectora', middleware.verifyAdmin, function(request, response) {
  let idProtectora = Number(request.query.idProtectora);
  dao.protectora.eliminarProtectora(idProtectora, (err, result) => {
    if (err) {
      response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: "Ha habido un error al borrar la protectora" });
    } else {
      response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: "Protectora con ID="+ idProtectora+" eliminada" });
    }
    
  });
});

router.get('/eliminarAdoptante', middleware.verifyAdmin, function(request, response) {
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

router.get("/listaSolicitudesProtectoras", middleware.verifyAdmin, function(request, response) {
  dao.protectora.listaSolicitudes((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./solicitudesProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: request.session.msg });
    }
  });
});

router.post('/aceptarProtectora', middleware.verifyAdmin, function(request, response) {
  let idProtectora = Number(request.body.idProtectora);
  dao.protectora.aceptarProtectora(idProtectora, (err, result) => {
    if (err) {
      request.session.msg="Ha habido un error al aceptar la protectora";
      response.redirect("./listaSolicitudesProtectoras");
    } else {
      request.session.msg="Protectora con ID="+ idProtectora+" ha sido aceptada";
      response.redirect("./listaSolicitudesProtectoras");
    }
    
  });
});

router.post('/rechazarProtectora', middleware.verifyAdmin, function(request, response) {
  let idProtectora = Number(request.body.idProtectora);
  /* SIN TERMINAR--- NO HACE NADA*/
  request.session.msg="Protectora con ID="+ idProtectora+" ha sido rechazada";
  response.redirect("./listaSolicitudesProtectoras");
});

module.exports = router;