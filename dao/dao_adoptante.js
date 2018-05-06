"use strict"

class DAOAdoptante {

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
     * Obtiene la lista de los adoptantes registrados en la web
     * Delvuelve los adoptantes en un array de objetos;
     * 
     * @param {function} callback
     * @return {Object[]} array de adoptantes
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    getAdoptantes(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query("SELECT * FROM adoptante WHERE estado=1", [], (err, rows) => {
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
     * Obtiene los datos de un adoptante en concreto
     * 
     * Devolverá error, si se produjo alguno durante la consulta, o rows con los datos
     * 
     * @param {int} idAdoptante ID del adoptante
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object} Los datos del adoptante
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getDataAdoptante(idAdoptante, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT id, email, password, nombre, apellidos, DATE_FORMAT(fechaNacimiento, \"%d-%m-%Y\") as fechaNacimiento, ciudad, direccion, telefono, foto, estado FROM adoptante WHERE id = ?", [idAdoptante], (err, rows) => {
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
     * Obtiene la solicitud de adopcion de un perro por parte de un adoptante
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idAdoptante ID del adoptante
     * @param {int} idPerro ID del perro
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object} Objeto con los datos de la solicitud
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getSolicitud(idAdoptante, idPerro, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM solicitud WHERE idAdoptante = ? AND idPerro = ?", [idAdoptante, idPerro], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, rows);
                connection.release();
            });
        });
    }

    /**
     * Obtiene una lista con las solicitudes de adopcion de un adoptante
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idAdoptante ID del adoptante
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object[]} Array con los perros que ha solicitado su adopcion
     * @return {undefined} En caso de no haber solicitudes
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getSolicitudes(idAdoptante, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM solicitud JOIN perro ON solicitud.idPerro = perro.id WHERE idAdoptante = ?", [idAdoptante], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                if(rows.length!==0){ // hay solicitudes, por lo que voy a coger los datos del perro.
                    let solicitudes=[];
                    rows.forEach(solicitud => {
                        let datos={
                            idPerro: solicitud.idPerro,
                            nombrePerro: solicitud.nombre,
                            idProtectora: solicitud.idProtectora,
                            mensaje: solicitud.mensaje,
                            estado: solicitud.estado
                        };
                        solicitudes.push(datos);
                    });
                    callback(null, solicitudes);
                }
                else{
                    callback(null, undefined);
                }
                
                connection.release();
            });
        });
    }

    /**
     * Actualiza los datos de un adoptante ya existente
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {Object} datos Datos del adoptante
     * @param {function} callback Función callback que será llamada tras la actualizacion
     * @return {null} En caso de exito
     * @exception {err} En caso de que se produzca un error en la actualizacion
     */
    updateAdoptante(datos, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            console.log(datos.imagen);
            if (datos.imagen == 1) {
                connection.query("UPDATE adoptante SET email=?, password=?, nombre=?, apellidos=?, ciudad=?, direccion=?, telefono=? WHERE id=?", [datos.texto.email, datos.texto.password, datos.texto.nombre, datos.texto.apellidos, datos.texto.ciudad, datos.texto.direccion, datos.texto.telefono, datos.texto.id], (err) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback(null);
                    connection.release();
                });
            } else {
                connection.query("UPDATE adoptante SET foto=?, email=?, password=?, nombre=?, apellidos=?, ciudad=?, direccion=?, telefono=? WHERE id=?", [datos.imagen, datos.texto.email, datos.texto.password, datos.texto.nombre, datos.texto.apellidos, datos.texto.ciudad, datos.texto.direccion, datos.texto.telefono, datos.texto.id], (err) => {
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
     * Inserta en la base de datos la solicitud de adopcion de un perro por parte de un adoptante
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idAdoptante ID del adoptante
     * @param {int} idPerro ID del perro
     * @param {int} idProtectora ID de la protectora
     * @param {String} msg mensaje para la protectora
     * @param {function} callback Función callback que será llamada tras la insercion
     * @return {} En caso de realizarse la solicitud correctamente
     * @exception {err} En caso de que se produzca un error en la insercion
     */
    enviarSolicitudAdoptante(idAdoptante, idPerro, idProtectora, msg, callback) {
        let estado = 0;

        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query("INSERT INTO solicitud(idAdoptante,idPerro, idProtectora, estado, mensaje) VALUES(?, ?, ?, ?, ?)", [idAdoptante, idPerro, idProtectora, estado, msg], (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(err);
                connection.release();
            });
        });
    }

    /**
     * Desactiva el adoptante a partir de su ID
     * 
     * Devolverá error, si se produjo alguno durante la actualizacion
     * 
     * @param {int} idAdoptante ID del adoptante
     * @param {function} callback Función callback que será llamada tras la baja
     * @return {null} En caso de exito
     * @exception {err} En caso de que se produzca un error en la actualizacion
     */
    eliminarAdoptante(idAdoptante, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("UPDATE `adoptante` SET `estado` = '0' WHERE `adoptante`.`id` = ?;", [idAdoptante], (err) => {
                if (err) {
                    connection.release();
                    callback(err);
                    console.log(err);
                } else {
                    callback(null);
                    connection.release();
                }

            });

        });
    }
}

module.exports = {
    DAOAdoptante: DAOAdoptante
};