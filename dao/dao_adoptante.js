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

    getDataAdoptante(idAdoptante, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM adoptante WHERE id = ?", [idAdoptante], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, rows[0]);
                connection.release();
            });
        });
    }

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

    enviarSolicitudAdoptante(idAdoptante, idPerro, idProtectora, msg, callback) {
        let estado = 0;

        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query("INSERT INTO solicitud(idAdoptante,idPerro, idProtectora, estado, mensaje) VALUES(?, ?, ?, ?, ?)", [idAdoptante, idPerro, idProtectora, estado, msg], (err) => {
                if (err) {
                    console.log("fallo gordo");
                    callback(err);
                    return;
                }
                callback(err);
                connection.release();
            });
        });
    }

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