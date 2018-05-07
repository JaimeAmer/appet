var express = require('express');
var _ = require("underscore");
var router = express.Router();
let dao = require('../dao/dao');
let middleware = require('./middlewares');


/**
 * Ruta que recoge la lista de adoptantes registrados en la web y los muestra en la vista de administrar Adoptantes
 * @name get/listaAdoptantes
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/listaAdoptantes", middleware.verifyAdmin, function(request, response) {
  dao.adoptante.getAdoptantes((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./administrarAdoptantes", { tipo: request.session.typeU, idU: request.session.idU, adoptantes: rows, msg: undefined });
    }
  });
});

/**
 * Ruta que recoge la lista de protectoras registrados en la web y los muestra en la vista de administrar protectoras
 * @name get/listaProtectoras
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/listaProtectoras", middleware.verifyAdmin, function(request, response) {
  dao.protectora.listaProtectoras((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: undefined });
    }
  });
});

/**
 * Ruta que elimina una protectora de la base de datos
 * @name get/eliminarProtectora
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/eliminarProtectora', middleware.verifyAdmin, function(request, response) {
  let idProtectora = Number(request.query.idProtectora);
  dao.protectora.eliminarProtectora(idProtectora, (err, result) => {
    if (err) {
      dao.protectora.listaProtectoras((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
          response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: "Ha habido un error al borrar la protectora" });
        }
      });
    } else {
      dao.protectora.listaProtectoras((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
          response.render("./administrarProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: "Protectora con ID="+ idProtectora+" eliminada" });
        }
      });
    }
  });
});

/**
 * Ruta que elimina un adoptante de la base de datos
 * @name get/eliminarAdoptante
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/eliminarAdoptante', middleware.verifyAdmin, function(request, response) {
  let idAdoptante = Number(request.query.idAdoptante);
  dao.adoptante.eliminarAdoptante(idAdoptante, (err, result) => {
    if (err) {
      dao.adoptante.getAdoptantes((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
          response.render("./administrarAdoptantes", { tipo: request.session.typeU, idU: request.session.idU, adoptantes: rows, msg: "Ha habido un error al borrar el adoptante" });
        }
      });
    } else {
      dao.adoptante.getAdoptantes((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
          response.render("./administrarAdoptantes", { tipo: request.session.typeU, idU: request.session.idU, adoptantes: rows, msg: "Adoptante con ID="+ idAdoptante+" eliminado" });
        }
      });
    }    
  });
});

/**
 * Ruta que recoge la lista de solicitudes de registro de protectoras en la web y los muestra en la vista de solicitudes protectoras
 * @name get/listaSolicitudesProtectoras
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/listaSolicitudesProtectoras", middleware.verifyAdmin, function(request, response) {
  dao.protectora.listaSolicitudes((err, rows) => {
    if (err) {
        console.log("fallo");
    } else {
        response.render("./solicitudesProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: undefined });
    }
  });
});

/**
 * Ruta que registra en la base de datos si el administrador ha aceptado una protectora
 * @name post/aceptarProtectora
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.post('/aceptarProtectora', middleware.verifyAdmin, function(request, response) {
  let idProtectora = Number(request.body.idProtectora);
  dao.protectora.aceptarProtectora(idProtectora, (err, result) => {
    if (err) {
      dao.protectora.listaSolicitudes((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            response.render("./solicitudesProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: "Ha habido un error al aceptar la protectora" });
        }
      });
    } else {
      dao.protectora.listaSolicitudes((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            response.render("./solicitudesProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: "Protectora con ID="+ idProtectora+" ha sido aceptada" });
        }
      });
    }
    
  });
});

/**
 * Ruta que registra en la base de datos si el administrador ha rechazado una protectora
 * @name post/rechazarProtectora
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.post('/rechazarProtectora', middleware.verifyAdmin, function(request, response) {
  let idProtectora = Number(request.body.idProtectora);
  /* SIN TERMINAR--- NO HACE NADA*/
  dao.protectora.rechazarProtectora(idProtectora, (err, result) => {
    if (err) {
      dao.protectora.listaSolicitudes((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            response.render("./solicitudesProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: "Ha habido un error al rechazar la protectora" });
        }
      });
    } else {
      dao.protectora.listaSolicitudes((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            response.render("./solicitudesProtectoras", { tipo: request.session.typeU, idU: request.session.idU, protectoras: rows, msg: "Protectora con ID="+ idProtectora+" ha sido rechazada" });
        }
      });
    }
  });
});

module.exports = router;