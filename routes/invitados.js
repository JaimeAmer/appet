var express = require('express');
var _ = require("underscore");
var router = express.Router();
var dao = require('../dao/dao');

/**
 * GET
 * Para la dirección "/"" redirige a "/index.html"
 */
router.get("/", function(request, response) {
    response.render("./index", {idU:request.session.idU});
});

router.get("/iraprotectora", function(request, response) {
    dao.protectora.listaProtectoras((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            console.log("exito, redirigimos a protectoras way");
            response.render("./protectoras", {idU:request.session.idU, protectoras: rows });
        }
    });

});

router.get("/iralistarperros", function(request, response) {
    console.log("VAMOS BIEN");
    dao.perro.getListaPerros((err, rows)=> {
        if(err) {
            response.status(400);
            response.end();
        } else {
            //console.log("Datos: " + rows[0]);
            response.render("./listarperros", {idU:request.session.idU,perros: rows});
        }
    });
});

router.get("/iraacercadeappet", function(request, response) {
    console.log("VAMOS BIEN");
    response.render("./acercadeappet", {idU:request.session.idU});
});

router.get("/iracomoadoptar", function(request, response) {
    console.log("VAMOS BIEN");
    response.render("./comoadoptar", {idU:request.session.idU})
});

router.get("/detalleprotectora.html", function(request, response) {
    let idProtectora = Number(request.query.ident);
    console.log("EL ID DE LA PROTECTORA ES:" + idProtectora);
    dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            console.log("DATOS PROTECTORA: " + rows[0]);
            response.render("./detalleprotectora", {idU:request.session.idU, datos: rows[0] });
        }

    });

});

router.get('/cerrarSesion',function(request, response){
   request.session.idU=undefined;
   request.session.typeU=undefined;
    response.render("./index", {idU:request.session.idU});
});


router.post("/iniciarSesion",function(request,response){
    let warnings=new Array();
    
    request.checkBody("email", "Email no puede estar vacio.").notEmpty();
    request.checkBody("pass", "Clave no puede estar vacia.").notEmpty();
    
    request.getValidationResult().then(result=> {
        if (result.isEmpty()) {
            dao.general.verifyUser(request.body,(error,result)=>{
                if(error)
                    console.log(error.message);
                else if(result){
                     request.session.idU=result.id;
                    request.session.typeU=request.body.gridRadios;
                    response.render('./perfil', {idU:request.session.idU});
                    
                   
                }else{
                    warnings.push("Los datos no coinciden");
                    console.log(warnings);
                }
            });
        }else{
            warnings=_.pluck(result.array(),'msg');
            console.log(warnings);
        }
       
       });
});



module.exports = router;