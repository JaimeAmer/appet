var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');
var middles=require('../routes/middlewares');


/* GET users listing. */
router.get('/misperros', middles.verifyProtectora,//Verifica que es Protectora
                        function(request, response) {
    
    dao.protectora.getMisPerros(request.session.idU,(err, perros)=>{
        if(err){
            response.status(400);
            response.end();
        }else{
            response.render('./misperros', {idU:request.session.idU, 
                            tipo:request.session.typeU, perros:perros});
        }
        
    } );
    
});

router.get('/nuevoperro', middles.verifyProtectora, function(req, res, next) {
    console.log("Aqui");
});

router.get('/eliminarperro',middles.verifyProtectora, function(request, response) {
    dao.perro. deletePerro(request.session.perro, ()=>{});
    
});


router.get('/eliminar/:id',middles.verifyProtectora, function(request, response){
    request.session.perro=request.params.id;
    response.redirect('/eliminarperro');
});

module.exports = router;