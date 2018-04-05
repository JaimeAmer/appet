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

    constructor(pool) {
        this.pool = pool;
    }


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
     * @param {bool} pendiente estado de la protectora: 1 pendiente de aceptar, 0 aceptada.
     * @param {string} descripcion descripcion de la protectora.
     */
    createProtectora(nombre, ciudad, imagen, email, password, direccion, telefono, pendiente, descripcion, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query("INSERT INTO protectora(nombre, ciudad, imagen, email, password, direccion, telefono, pendiente, descripcion) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, ciudad, imagen, email, password, direccion, telefono, pendiente, descripcion], (err) => {
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
     * Error, si se produjo alguno durante la inserción, o null en caso contrario.
     * 
     * @param {string} emailProt email de la protectora
     * @param {string} password contraseña de la protectora
     * @param {function} callback Función callback que será llamada tras la comproación
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
     * Error, si se produjo alguno durante la inserción, o rows con los datos
     * 
     * @param {string} idProtectora nombre del jugador
     * @param {function} callback Función callback que será llamada tras la inserción
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
                callback(null, rows);
                connection.release();
            });
        });
    }
}


module.exports = {
    DAOProtectora: DAOProtectora
};