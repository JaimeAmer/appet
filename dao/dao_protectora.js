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
     * Obtiene el nombre de la protectora para mostrarlo en 
     * vista detalle perro.
     * @param {string} idProtectora //Id de la protectora
     * @param {function} callback 
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

	updateProtectora(datos, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
			
			connection.query("UPDATE protectora SET nombre=?, ciudad=?, email=?, password=?, direccion=?, telefono=?, descripcion=?, longitud=?, latitud=? WHERE id=?", [datos.nombre, datos.ciudad, datos.email, datos.password, datos.direccion, datos.telefono, datos.descripcion, datos.longitud, datos.latitud, datos.id], (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
                connection.release();
            });
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
        });
    }

    /**
     * Comprueba si existe una protectora con el email y contraseña indicados.
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la consulta, o null en caso contrario.
     * 
     * @param {string} emailProt email de la protectora
     * @param {string} password contraseña de la protectora
     * @param {function} callback Función callback que será llamada tras la comproación
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
     * Obtiene todos los datos de la protectora
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la consulta, o rows con los datos
     * 
     * @param {string} idProtectora nombre del jugador
     * @param {function} callback Función callback que será llamada tras la inserción
     * @return {Object} protectora
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
    
    getMisPerros(id,callback){
         if(callback===undefined) callback=function(){};
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            
            connection.query("SELECT * from perro WHERE idProtectora=?", [id], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
               
                callback(err, rows);
                connection.release();
            });
        });
    }
    
    listarSolicitudes(idProtectora, callback){
        if(callback===undefined) callback=function(){};
        
        this.pool.getConnection((error,conexion)=>{
            if(error){
                callback(error);
            }else{
                let sql="SELECT solicitud.*, perro.nombre,perro.raza, adoptante.email,adoptante.ciudad FROM solicitud "+
                        "LEFT JOIN perro ON solicitud.idPerro = perro.id "+
                        "LEFT JOIN adoptante ON solicitud.idAdoptante= adoptante.id "+
                        "WHERE perro.adoptado=0 AND perro.idProtectora=?";
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
