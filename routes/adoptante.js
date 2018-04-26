var express = require('express');
var router = express.Router();
var middles = require('../routes/middlewares');



router.get('/formularioAdopcion', middles.verifyAdoptante, function(request, response, next) {
    let idProtectora = Number(request.query.idProtectora);
    let idPerro = Number(request.query.idPerro);
    let idAdoptante = Number(request.query.idAdoptante);

    console.log("id: " + idProtectora);
    console.log("id: " + idPerro);
    console.log("id: " + idAdoptante);


    response.render("./formAdopcion", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: undefined });

});

module.exports = router;