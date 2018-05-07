"use strict"


class DAOGeneral {

    /**
     * Inicializa el DAO de usuarios invitados
     * 
     * @constructor
     * @param {*} pool 
     */
    constructor(pool) {
        this.pool = pool;
    }

    /**
     *Verifica que un usuario esta en la base de datos
     * 
     * @param {Object[]} info objeto con datos de usuario
     * @param {function} callback
     * @return {Object[]} true or false
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    verifyUser(info, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
            } else {
                let sql = "";

                if (info.tipo === 'Protectora') {
                    sql = "SELECT id, email, password FROM protectora WHERE email=? AND password=?";
                }
                else if(info.tipo==='Adoptante'){
                    sql = "SELECT id, email, password FROM adoptante WHERE email=? AND password=?";
                }else if((info.tipo==='Administrador')){
                    sql = "SELECT id, email, password FROM administrador WHERE email=? AND password=?";
                }

                connection.query(sql, [info.user, info.password], (err, result) => {
                    connection.release();

                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result[0]);
                    }
                });
            }
        });
    }

    /**
     * Inserta un adoptante en la base de datos
     * 
     * Devolverá error, si se produjo alguno durante la insercion
     * 
     * @param {Object} datos Datos del adoptante
     * @param {function} callback Función callback que será llamada tras la insercion
     * @return {null} True en caso de exito
     * @exception {err} En caso de que se produzca un error en la insercion
     */
	createAdoptante(datos, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
				connection.query("INSERT INTO adoptante(email, password, nombre, apellidos, fechaNacimiento, ciudad, direccion, telefono) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [datos.email, datos.password, datos.nombre, datos.apellidos, datos.fechaNacimiento, datos.ciudad, datos.direccion, datos.telefono], (err) => {
		
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, err);
                connection.release();
            });
        });
    }

    /**
     * Dado el ID de un perro, se devuelve su foto
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} id ID del perro
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object} Imagen del perro
     * @return {undefined} En caso de no existir el perro 
     * @exception {err} En caso de que se produzca un error en la consulta
     */
      getImagePerro(id,callback){
          if(callback===undefined) callback=function(){};
        
        this.pool.getConnection((error,conexion)=>{
            if(error){
                callback(error);
            }else{
                let sql="SELECT foto FROM perro WHERE id=?";
                
                conexion.query(sql,[id],(error,result)=>{
                    conexion.release();
                    if(error){
                        callback(error);
                    }else{
                        if(result[0].length === 0){
                            callback(null,undefined);
                        }else{
                            
                            callback(null,result[0].foto);
                        }
                        
                    }
                });
                
            }
        });
        
    }
    
    /**
     * Dado el ID de una protectora, se devuelve su foto
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} id ID de la protectora
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object} Imagen de la protectora
     * @return {undefined} En caso de no existir la protectora 
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getImageProtectora(id,callback){
        if(callback===undefined) callback=function(){};
        
        this.pool.getConnection((error,conexion)=>{
            if(error){
                callback(error);
            }else{
                let sql="SELECT imagen  FROM protectora WHERE id=?";
                
                conexion.query(sql,[id],(error,result)=>{
                    conexion.release();
                    if(error){
                        callback(error);
                    }else{
                        if(result[0].length === 0){
                            callback(null,undefined);
                        }else{
                            
                            callback(null,result[0].imagen);
                        }
                        
                    }
                });
                
            }
        });
    }
 
	
}

module.exports = {
    DAOGeneral: DAOGeneral
};