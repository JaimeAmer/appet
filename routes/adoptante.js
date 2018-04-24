var express = require('express');
var router = express.Router();
var middles = require('../routes/middlewares');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/formularioAdopcion', middles.verifyAdoptante, function(request, response, next) {
    let idProtectora = Number(request.query.idProtectora);
    let idPerro = Number(request.query.idPerro);
    let idAdoptante = Number(request.query.idAdoptante);

    console.log("id: " + idProtectora);
    console.log("id: " + idPerro);
    console.log("id: " + idAdoptante);

});

module.exports = router;