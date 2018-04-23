var express = require('express');
var router = express.Router();
var _ = require("underscore");
var dao = require('../dao/dao');

/* GET users listing. */
router.get("/", function(request, response) {
    response.render("./index", { tipo: request.session.typeU, idU: request.session.idU });
});

router.get("/index", function(request, response) {
    response.render("./index", { tipo: request.session.typeU, idU: request.session.idU });
});

router.get("/acercadeappet", function(request, response) {
    response.render("./acercadeappet", { tipo: request.session.typeU, idU: request.session.idU });
});

module.exports = router;