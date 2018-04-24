var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');
var middles=require('../routes/middlewares');


/* GET users listing. */
router.get('/misperros', middles.verifyProtectora,//Verifica que es Protectora
                        function(request, response) {
                            
      msg=undefined;                      
     if(request.session.msgP!==undefined){
         msg=request.session.msgP;
         request.session.msgP=undefined;
     }                       
    
    dao.protectora.getMisPerros(request.session.idU,(err, perros)=>{
        if(err){
            response.status(400);
            response.end();
        }else{
            response.render('./misperros', {idU:request.session.idU, 
                            tipo:request.session.typeU, perros:perros, msg:msg});
        }
        
    } );
    
});

router.get('/nuevoperro', middles.verifyProtectora, function(req, res, next) {
    console.log("Aqui");
});

router.get('/eliminarperro',middles.verifyProtectora, function(request, response) {
    let idPerro = Number(request.query.idPerro);
    dao.perro.deletePerro(idPerro, request.session.idU, (error,result)=>{
        if(error){
            console.log(error.message);
        }else if(result){
            request.session.msgP="Se ha eliminado correctamente un perro de la Protectora";
            response.redirect('/misperros');
        }
    });
});




module.exports = router;