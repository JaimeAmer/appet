var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');
var middles=require('../routes/middlewares');


/* GET users listing. */
router.get('/misperros',middles.verifyProtectora,function(req, res, next) {
    console.log("aqui");
    //res.render('./misperros', {idU:req.session.idU, tipo:req.session.typeU, perros:undefined, ipd:0});
    /*
      if (request.session.typeU === "Protectora") {
        let idProtectora = request.session.idU;

        dao.perro.getListaPerrosProtectora(idProtectora, (err, rows) => {
            if (err) {
                console.log("VAMOS MAL");
                response.status(400);
                response.end();
            } else {
                response.render("./perrosmiosprotectora", { tipo: request.session.typeU, idU: request.session.idU, idp: idProtectora, perros: rows });
            }

        });
    } else {
        console.log("fallo");
    }
     */
});

router.get('/nuevoperro', function(req, res, next) {
    console.log("Aqui");
});

router.post('/eliminarperro', function(req, res, next) {
    console.log("Aqui");
});
module.exports = router;