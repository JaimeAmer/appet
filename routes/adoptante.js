var express = require('express');
var router = express.Router();
var middles = require('../routes/middlewares');
var dao = require('../dao/dao');
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });


router.get('/formularioAdopcion', middles.verifyAdoptante, function(request, response, next) {
    let idProtectora = Number(request.query.idProtectora);
    let idPerro = Number(request.query.idPerro);
    let idAdoptante = Number(request.query.idAdoptante);

    console.log("id: " + idProtectora);
    console.log("id: " + idPerro);
    console.log("id: " + idAdoptante);


    response.render("./formAdopcion", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: undefined });

});

router.post("/modAdoptante", upload.single("imagen"), function(request, response) {
    let warnings = new Array();
    let mensaje = "";
    /**Comprobamos que los datos sean correctos y que no falte ningun campo */
    request.checkBody("email", "Formato email incorrecto").isEmail();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let datos = new Object();

            if (request.body.password !== request.body.password1) {
                warnings.push("Las contraseñas no coinciden");
                console.log(warnings);
                mensaje = "Las contraseñas no coinciden";
                response.render("./", { tipo: request.session.typeU,
                    idU: request.session.idU, errors: undefined, mensaje: mensaje });
            } else {
                datos.texto=request.body;
				if(request.file==undefined)
					datos.imagen=1;
				else
					datos.imagen=request.file.buffer;                
				console.log(request);
                dao.adoptante.updateAdoptante(datos, (error, result) => {
                    if (error) {
                        if (error.errno === 1062) {
							console.log(error);
                            warnings.push("El email ya esta dado de alta en el sistema");
                            console.log(warnings);
                            mensaje = "El email ya esta dado de alta en el sistema";
                            response.render("./", { tipo: request.session.typeU, idU: request.session.idU,
                                errors: undefined, mensaje: mensaje });
                        } else
                            console.log(error.message);
                    } else if (result) {
                        response.render("./", 
                        { tipo: request.session.typeU, idU: request.session.idU,
                            errors: undefined, mensaje: "exito" });
                    } else {
                        response.render("./", { tipo: request.session.typeU, idU: request.session.idU, errors: undefined, mensaje: "exito" });
                    }
                });
            }
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./", { tipo: request.session.typeU, idU: request.session.idU, errors: result.array(), mensaje: undefined });
        }

    });
});

module.exports = router;