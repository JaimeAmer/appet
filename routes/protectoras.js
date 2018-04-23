var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/misperros', function(req, res, next) {
    res.render('./plantilla', {idU:req.session.idU, tipo:req.session.typeU});
});

module.exports = router;