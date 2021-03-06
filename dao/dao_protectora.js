"use strict"

// id
// nombre
// ciudad
// imagen
// email
// password
// dir
// telefono
// pendiente
// descripcion

class DAOProtectora {

    /**
     * Inicializa el DAO de protectoras
     * 
     * @constructor
     * @param {*} pool 
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Obtiene el nombre de la protectora a partir de su ID
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idProtectora ID de la protectora
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {String} El nombre de la protectora
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getNombreProtectora(idProtectora, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query("SELECT id,nombre FROM protectora WHERE id = ?", 
            [idProtectora], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                
                connection.release();

                //En caso de que no hay encontrado nada:
                if (rows.length === 0) {
                    callback(null, undefined);
                } 
                
                //En caso de que haya encontrado el nombre de la protectora:
                else {
                    callback(null, rows[0]);
                }
            });
        });
    }

    /**
     * Actualiza los datos de una protectora ya existente
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {Object} datos Datos de la protectora
     * @param {function} callback Función callback que será llamada tras la actualizacion
     * @return {null} En caso de exito
     * @exception {err} En caso de que se produzca un error en la actualizacion
     */
	updateProtectora(datos, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
			console.log(datos.imagen);
			if(datos.imagen==1){				
				connection.query("UPDATE protectora SET nombre=?, ciudad=?, email=?, password=?, direccion=?, telefono=?, descripcion=?, longitud=?, latitud=? WHERE id=?", [datos.texto.nombre, datos.texto.ciudad, datos.texto.email, datos.texto.password, datos.texto.direccion, datos.texto.telefono, datos.texto.descripcion, datos.texto.longitud, datos.texto.latitud, datos.texto.id], (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
                connection.release();
				});
			}else{
				connection.query("UPDATE protectora SET imagen=?, nombre=?, ciudad=?, email=?, password=?, direccion=?, telefono=?, descripcion=?, longitud=?, latitud=? WHERE id=?", [datos.imagen, datos.texto.nombre, datos.texto.ciudad, datos.texto.email, datos.texto.password, datos.texto.direccion, datos.texto.telefono, datos.texto.descripcion, datos.texto.longitud, datos.texto.latitud, datos.texto.id], (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
                connection.release();
				});
			}
        });
    }
	
    /**
     * Obtiene la lista de todas las protectoras de la web:
     * Delvuelve los datos en un array de objetos;
     * 
     * @param {function} callback
     * @return {Object[]} array de protectoras
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    listaProtectoras(callback) {
        if(callback===undefined) callback=function(){};
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM protectora WHERE estado=1", [], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(err, rows);
                connection.release();
            });
        });
    }

    /**
     * Inserta una protectora en la tabla protectora.
     * 
     * Tras la inserción se llamará a la función callback
     * Error, si se produjo alguno durante la inserción, o null en caso contrario.
     * 
     * @param {int} id identificador de la protectora.
     * @param {string} nombre nombre de la protectora.
     * @param {string} ciudad ciudad de la protectora.
     * @param {string} imagen imagen de la protectora.
     * @param {string} email email de la protectora.
     * @param {string} password contraseña de la protectora.
     * @param {string} direccion direccion de la protectora.
     * @param {int} telefono numero telefono de la protectora.
     * @param {boolean} pendiente estado de la protectora: 1 pendiente de aceptar, 0 aceptada.
     * @param {string} descripcion descripcion de la protectora.
     * @param {function} callback
     * @exception {err} En caso de que se produzca un error en la insercion
     */
    createProtectora(datos, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            if(datos.latitud!== undefined && datos.longitud !==undefined){
                let sql="INSERT INTO protectora ( nombre, ciudad, imagen, email, password , direccion, telefono, pendiente, descripcion, estado, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, 0, ?, ?)";
                connection.query(sql, [datos.nombre, datos.ciudad, datos.imagen, datos.email, datos.password, datos.direccion, 
                    datos.telefono, datos.descripcion,datos.latitud,datos.longitud], (err, rows) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    //console.log(rows);
                    callback(null, true);
                    connection.release();
                });
            }
            else{
                let sql="INSERT INTO protectora ( nombre, ciudad, imagen, email, password , direccion, telefono, pendiente, descripcion, estado, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, 0, null, null)";
                connection.query(sql, [datos.nombre, datos.ciudad, datos.imagen, datos.email, datos.password, datos.direccion, 
                    datos.telefono, datos.descripcion], (err, rows) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    //console.log(rows);
                    callback(null, true);
                    connection.release();
                });
            }
        });
    }

    /**
     * Comprueba si existe una protectora con el email y contraseña indicados.
     * 
     * Error, si se produjo alguno durante la consulta
     * 
     * @param {string} emailProt email de la protectora
     * @param {string} password contraseña de la protectora
     * @param {function} callback Función callback que será llamada tras la comprobación
     * @return {boolean} Si existe o no la protectora indicada
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    isProtCorrect(emailProt, password, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM protectora WHERE email = ? AND password = ?", [emailProt, password], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                if (rows.length === 0) {
                    callback(null, false);
                } else {
                    callback(null, true);
                }
                connection.release();
            });
        });
    }

    /**
     * Obtiene todos los datos de la protectora en concreto
     * 
     * Devolverá error, si se produjo alguno durante la consulta, o rows con los datos
     * 
     * @param {int} idProtectora ID de la protectora
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object} Los datos de la protectora
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getDataProtectora(idProtectora, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM protectora WHERE id = ?", [idProtectora], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, rows[0]);
                connection.release();
            });
        });
    }

    /**
     * Desactiva la protectora a partir de su ID
     * 
     * Devolverá error, si se produjo alguno durante la actualizacion
     * 
     * @param {int} idProtectora ID de la protectora
     * @param {function} callback Función callback que será llamada tras la baja
     * @return {null} En caso de exito
     * @exception {err} En caso de que se produzca un error en la actualizacion
     */
    eliminarProtectora(idProtectora, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("UPDATE `protectora` SET `estado` = '0' WHERE `protectora`.`id` = ?;", [idProtectora],(err) => {
                if(err){
                    connection.release();
                    callback(err);
                    console.log(err);
                }
                else{
                    callback(null);
                    connection.release();
                }
                
            });
            
        });
    }

    /**
     * A traves del ID de la protectora, se cambia el estado a "aceptado"
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idProtectora ID de la protectora
     * @param {function} callback Función callback que será llamada tras la actualizacion
     * @return {null} En caso de exito
     * @exception {err} En caso de que se produzca un error en la actualizacion
     */
    aceptarProtectora(idProtectora, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("UPDATE `protectora` SET `pendiente` = '0', `estado` = '1' WHERE `protectora`.`id` = ?;", [idProtectora],(err) => {
                if(err){
                    connection.release();
                    callback(err);
                    console.log(err);
                }
                else{
                    callback(null);
                    connection.release();
                }
                
            });
            
        });
    }

    /**
     * A traves del ID de la protectora, se rechaza la protectora borrandola de la base de datos
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idProtectora ID de la protectora
     * @param {function} callback Función callback que será llamada tras el borrado
     * @return {null} En caso de exito
     * @exception {err} En caso de que se produzca un error en la actualizacion
     */
    rechazarProtectora(idProtectora, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query( "DELETE FROM `protectora` WHERE `protectora`.`id` = ?", [idProtectora],(err) => {
                if(err){
                    connection.release();
                    callback(err);
                    console.log(err);
                }
                else{
                    callback(null);
                    connection.release();
                }
                
            });
            
        });
    }

    /**
     * Obtiene la lista de todas las protectoras que estan a la espera
     * de que su solicitud sea aceptada o rechazada
     * Delvuelve las protectoras en un array de tipo Object
     * 
     * @param {function} callback
     * @return {Object[]} array de protectoras
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    listaSolicitudes(callback) {
        if(callback===undefined) callback=function(){};
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM protectora WHERE estado = 0 AND pendiente = 1", [], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(err, rows);
                connection.release();
            });
        });
    }
    
    /**
     * A traves del ID de la protectora, se consultan los perros que tienen disponibles 
     * en la protectora para su adopcion
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} id ID de la protectora
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object[]} Array de perros
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getMisPerros(id,callback){
         if(callback===undefined) callback=function(){};
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            
            connection.query("SELECT * from perro WHERE adoptado = 0 AND idProtectora=?", [id], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
               
                callback(err, rows);
                connection.release();
            });
        });
    }
    
    /**
     * A traves del ID de la protectora, devuelve una lista con las solicitudes de adopcion 
     * que ha recibido la protectora
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idProtectora ID de la protectora
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object[]} Array con las solicitudes
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    listarSolicitudes(idProtectora, callback){
        if(callback===undefined) callback=function(){};
        
        this.pool.getConnection((error,conexion)=>{
            if(error){
                callback(error);
            }else{
                let sql="SELECT solicitud.*, perro.nombre,perro.raza, adoptante.email,adoptante.ciudad FROM solicitud "+
                        "LEFT JOIN perro ON solicitud.idPerro = perro.id "+
                        "LEFT JOIN adoptante ON solicitud.idAdoptante= adoptante.id "+
                        "WHERE perro.adoptado=0 AND perro.idProtectora=? AND solicitud.estado=0";
                conexion.query(sql,[idProtectora],(error,rows)=>{
                    conexion.release();
                    if(error){
                        callback(error);
                    }else{
                        let array=new Array();
                        for (let i=0 ; i<rows.length; i++){
                            array.push(new solicitud(rows[i].id,rows[i].idProtectora,
                            rows[i].idAdoptante,rows[i].email,rows[i].ciudad,rows[i].idPerro,rows[i].nombre,rows[i].raza,rows[i].mensaje));
                            
                        }
                        callback(null,array);
                    }
                });
            }
        });
        
    }
    
    /**
     * A traves del ID de la protectora, devuelve una lista con las solicitudes de adopcion 
     * que ha recibido la protectora
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idSolicitud ID de la solicitud de adopcion
     * @param {int} respuesta parametro que decide si se acepta o se rechaza
     * @param {function} callback Función callback que será llamada tras la actualizacion
     * @return {boolean} True en caso de realizarse correctamente la actualizacion
     * @exception {error} En caso de que se produzca un error en la actualizacion
     */
    actualizarSolicitud(idSolicitud,respuesta, callback){
        if(callback===undefined)callback=function(){};
        this.pool.getConnection((error,conexion)=>{
            if(error){
                callback(error);
                
            }else{
                let sql="UPDATE solicitud SET estado=? WHERE id=?";
                conexion.query(sql,[respuesta,idSolicitud], (error, rows)=>{
                   conexion.release();
                    if(error){
                        callback(error);
                    }else{
                        callback(null, true);
                    }
                });
            }
        });
    }

    /**
     * A traves del ID de la protectora y del ID de un perro, devuelve una lista con las solicitudes de adopcion pendientes 
     * que ha recibido la protectora para el perro especificado
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idProtectora ID de la protectora
     * @param {int} idPerro ID del perro
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object[]} Array de solicitudes de adopcion pendientes
     * @exception {error} En caso de que se produzca un error en la consulta
     */
    getSolicitudesPendientesPerro(idProtectora, idPerro, callback){
       this.pool.getConnection((err, connection) => {
           if (err) {
               callback(err);
               return;
           }
           connection.query("SELECT * from solicitud WHERE idProtectora = ? AND idPerro = ? AND estado = 0", [idProtectora, idPerro], (err, rows) => {
               if (err) {
                   callback(err);
                   return;
               } 
               callback(err, rows);
               connection.release();
           });
       });
   }
     verificarEstadoSolicitud(idSolicitud, callback){
          //SELECT estado FROM `solicitud` WHERE id=3
          
      }
    
}


function solicitud(id, idProtectora, idAdoptante,email, ciudad, idPerro,nombre,raza,mensaje){
    this.id=id;
    this.idProtectora=idProtectora;
    this.idAdoptante=idAdoptante;
    this.email=email;
    this.ciudad=ciudad;
    this.idPerro=idPerro;
    this.nombre=nombre;
    this.raza=raza;
    this.mensaje=mensaje;
}

module.exports = {
    DAOProtectora: DAOProtectora
};
