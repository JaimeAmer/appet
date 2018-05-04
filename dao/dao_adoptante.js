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
    getSolicitudes(idAdoptante, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM solicitud LEFT JOIN perro ON solicitud.idPerro = perro.id WHERE idAdoptante = ?", [idAdoptante], (err, rows) => {
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