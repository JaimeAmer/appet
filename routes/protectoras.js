var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');
var middles=require('../routes/middlewares');


/* GET users listing. */
router.get('/misperros',middles.verifyisUser,//Verificar que ya hizo login
                        middles.verifyProtectora,//Verifica que es Protectora
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
    //
    /*
      

        dao.perro.getListaPerrosProtectora(idProtectora, (err, rows) => {
            if (err) {
               
            } else {
                response.render("./perrosmiosprotectora", { tipo: request.session.typeU, idU: request.session.idU, idp: idProtectora, perros: rows });
            }

        });
    } else {
        console.log("fallo");
    }
     */
});

router.get('/nuevoperro', middles.verifyProtectora, function(req, res, next) {
    console.log("Aqui");
});

router.post('/eliminarperro',middles.verifyProtectora, function(req, res, next) {
    console.log("Aqui");
});
module.exports = router;