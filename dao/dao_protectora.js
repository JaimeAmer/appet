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
    getNombreProtecotra(idProtectora, callback) {
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
     * Obtiene la lista de todas las protectoras de la web:
     * Delvuelve los datos en un array de objetos;
     * 
     * @param {function} callback
     * @return {Object[]} array de protectoras
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    listaProtectoras(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query("SELECT * FROM protectora", [], (err, rows) => {
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

            connection.query("INSERT INTO protectora(nombre, ciudad, imagen, email, password, direccion, telefono, descripcion) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [datos.nombre, datos.ciudad, datos.imagen, datos.email, datos.password, datos.direccion, datos.telefono, datos.descripcion], (err) => {
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
}


module.exports = {
    DAOProtectora: DAOProtectora
};