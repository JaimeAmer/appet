var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');

/* GET users listing. */
router.get('/misperros', function(req, res, next) {
    res.render('./misperros', {idU:req.session.idU, tipo:req.session.typeU, perros:undefined, ipd:0});
});

router.get('/nuevoperro', function(req, res, next) {
    console.log("Aqui");
});

router.post('/eliminarperro', function(req, res, next) {
    console.log("Aqui");
});
module.exports = router;