var express = require('express');
var router = express.Router();
var _ = require("underscore");
var dao = require('../dao/dao');

/* Peticiones que comparten varios Roles  */
/**
 * Ruta del indice de la pagina web
 * @name get/
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/", function(request, response) {
    response.render("./index", { tipo: request.session.typeU, 
        idU: request.session.idU, mensaje:undefined });
});

/**
 * Ruta del indice de la pagina web
 * @name get/index
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/index", function(request, response) {
    response.redirect('/');
});

/**
 * Ruta de la pagina del "Acerca de"
 * @name get/acercadeappet
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/acercadeappet", function(request, response) {
    response.render("./acercadeappet", { tipo: request.session.typeU,
        idU: request.session.idU });
});

/**
 * Ruta de la pagina del "Como adoptar"
 * @name get/acercadeappet
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/comoadoptar", function(request, response) {
    response.render("./comoadoptar", { tipo: request.session.typeU,
        idU: request.session.idU });
});

/**
 * Ruta del formulario de login
 * @name get/login
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/login", function(request, response) {
    response.render("./login", { tipo: request.session.typeU, 
        idU: request.session.idU, errors: undefined, mensaje: undefined });
});

/**
 * Ruta del formulario modificar perfiles tanto de protectoras, adoptantes y administradores
 * @name get/modificarPerfil
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/modificarPerfil', function(request, response) {
    /* Hay que hacer distinción entre los diferentes usuarios para redirección*/
if (request.session.typeU === "Protectora" || 
        request.session.typeU === "ProtectoraPendiente") {
        let idProtectora = request.session.idU;
        dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                if(rows.pendiente===1){
					console.log("Pendiente");
                    request.session.typeU = "ProtectoraPendiente";
                }else{
                response.render("./modificarProtectora", { tipo: request.session.typeU, idU: request.session.idU, idp: idProtectora, datos: rows,mensaje:undefined });
				}
            }
        });
    }else if(request.session.typeU === "Adoptante"){
       let idAdoptante = request.session.idU;
        dao.adoptante.getDataAdoptante(idAdoptante, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                response.render("./modificarAdoptante", { tipo: request.session.typeU, idU: request.session.idU, idp: idAdoptante, datos: rows,mensaje:undefined });
            }
        });
    }else if(request.session.typeU === "Administrador"){
        response.redirect("/index",{ mensaje:undefined});
    }
    else{
        console.log("Fallo, no es un usuario válido");
    }
});

/**
 * Ruta del login para comprobar los datos del formulario
 * @name post/login
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.post("/login", function(request, response) {
    let warnings = new Array();
    /**Comprobamos que los datos sean correctos y que no falte ningun campo */
    request.checkBody("userEmail", "Formato email incorrecto").isEmail();
    request.checkBody("tipo", "Debes seleccioar un tipo de usuario").notEmpty();

    request.getValidationResult().then(result => {
        if (result.isEmpty()) {
            let info = {
                user: "",
                password: "",
                tipo: ""
            };
            info.user = request.body.userEmail;
            info.password = request.body.password;
            info.tipo = request.body.tipo;
            dao.general.verifyUser(info, (error, result) => {
                if (error)
                    console.log(error.message);
                else if (result) {
                    request.session.idU = result.id;
                    request.session.typeU = request.body.tipo;
                    response.redirect('/perfil');
                } else {
                    warnings.push("Los datos no coinciden");
                    console.log(warnings);
                    let mensaje = "El usuario con esos datos no se encuentra en este tipo de usuario";
                    response.render("./login", { tipo: request.session.typeU,
                        idU: request.session.idU, errors: undefined, mensaje: mensaje });
                }
            });
        } else {
            warnings = _.pluck(result.array(), 'msg');
            console.log(warnings);
            response.render("./login", { tipo: request.session.typeU,
                idU: request.session.idU, errors: result.array(), mensaje: undefined });
        }
    });
});

/**
 * Ruta del boton de cerrar sesion
 * @name get/logout
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/logout', function(request, response) {
    request.session.destroy();
    response.redirect('/');
});

/**
 * Ruta que coge los datos de la vista del perfil de protectora, adoptante y administrador
 * @name get/perfil
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/perfil', function(request, response) {
    /* Hay que hacer distinción entre los diferentes usuarios para redirección*/
if (request.session.typeU === "Protectora" || request.session.typeU === "ProtectoraPendiente") {
        let idProtectora = request.session.idU;
        dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
            if (err) {
                response.status(400);
                response.end();
            } else {
                if(rows.pendiente===1){
                    request.session.typeU = "ProtectoraPendiente";
                }
                response.render("./perfilProtectora", 
                { tipo: request.session.typeU, idU: request.session.idU,
                    idp: idProtectora, datos: rows });
            }
        });
    }else if(request.session.typeU === "Adoptante"){
        let idAdoptante = request.session.idU;
        dao.adoptante.getDataAdoptante(idAdoptante, function(err, rows){
            if (err) {
                response.status(400);
                response.end();
            } else {
                response.render("./perfilAdoptante", 
                { tipo: request.session.typeU, idU: request.session.idU,
                    ida: idAdoptante, datos: rows });
            }
        });
    }else if(request.session.typeU === "Administrador"){
        response.redirect("/index");
    }
    else{
        console.log("Fallo, no es un usuario válido");
    }
});

/**
 * Ruta que permite coger la imagen del perro de la base de datos
 * @name get/img/perro/:id
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
   router.get('/img/perro/:id',function(request,response){
     let n=request.params.id;
      
        if(isNaN(n)){
            response.status(400);
            response.end("Peticion incorrecta");
        
        }else{
           dao.general.getImagePerro(n,(error,image)=>{
                if(image){
                    response.end(image);
                }else if(error){
                    console.log(error);
                }
            });
        }
});

/**
 * Ruta que permite coger la imagen de la protectora de la base de datos
 * @name get/img/protectora/:id
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/img/protectora/:id',function(request,response){
     let n=request.params.id;
      
        if(isNaN(n)){
            response.status(400);
            response.end("Peticion incorrecta");
        
        }else{
           dao.general.getImageProtectora(n,(error,image)=>{
                if(image){
                    response.end(image);
                }else if(error){
                    console.log(error);
                }
            });
        }
});

/**
 * Ruta que coge la lista de perros que hay en la base de datos
 * @name get/perros
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/perros",function(request, response) {
    dao.perro.getListaPerros((err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            response.render("./listarperros", { tipo: request.session.typeU, 
                idU: request.session.idU, perros: rows });
        }
    });
});

/**
 * Ruta que coge los datos de un perro de la base de datos
 * @name get/perro
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get('/perro', function(request,response){
    let idPerro = Number(request.query.idPerro);
    
    dao.perro.getDataPerro(idPerro, (err, dataPerro) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            dao.protectora.getNombreProtectora(dataPerro.idProtectora,
                                                    (err,resultado)=>{
                                                if(err){
                                                    response.status(400);
                                                    response.end();
                                                }else{
                                                   let datosPerro = {
                        id: dataPerro.id,
                        idProtectora: resultado.id,
                        nombProtectora: resultado.nombre,
                        nombre: dataPerro.nombre,
                        foto: dataPerro.foto,
                        edad: dataPerro.edad,
                        color: dataPerro.color,
                        raza: dataPerro.raza,
                        peso: dataPerro.peso,
                        descripcion: dataPerro.descripcion,
                        fallecido: dataPerro.fallecido
                    };
                    response.render("./detalleperro", 
                    { tipo: request.session.typeU, idU: request.session.idU,
                        perro: datosPerro });
                    }
            });
        }
    });
    
});

/**
 * Ruta que coge la lista de protectoras que hay en la base de datos
 * @name get/protectoras
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/protectoras", function(request, response) {
    dao.protectora.listaProtectoras((err, rows) => {
        if (err) {
            console.log("fallo");
        } else {
            console.log("exito, redirigimos a protectoras way");
            response.render("./protectoras", { tipo: request.session.typeU,
                idU: request.session.idU, protectoras: rows });
        }
    });

});

/**
 * Ruta que coge los datos de una protectora de la base de datos
 * @name get/protectora
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/protectora", function(request, response) {
    let idProtectora = Number(request.query.ident);
    
    dao.protectora.getDataProtectora(idProtectora, (err, rows) => {
        if (err) {
            response.status(400);
            response.end();
        } else {
            response.render("./detalleprotectora", { tipo: request.session.typeU,
                idU: request.session.idU, idp: idProtectora, datos: rows });
        }
    });
});

/**
 * Ruta que coge la lista de perros que hay en una protectora de la base de datos
 * @name get/perrosprotectora
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {function} callback - Intercambio de datos de Express.
 */
router.get("/perrosprotectora", function(request, response) {
    let idProtectora = Number(request.query.ident);
    let nombreProtectora = String(request.query.nombrepro);


    //console.log("Id de la protectora: " + idProtectora);
    //console.log("Nombre  de la protectora: " + nombreProtectora);

    dao.perro.getListaPerrosProtectora(idProtectora, (err, rows) => {
        if (err) {
           
            response.status(400);
            response.end();
        } else {
            response.render("./listarperrosprotectora",
            { tipo: request.session.typeU, idU: request.session.idU,
                nombrep: nombreProtectora, idp: idProtectora, perros: rows });
        }

    });

});


module.exports = router;