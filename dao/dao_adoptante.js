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
			
			connection.query("UPDATE adoptante SET email=?, password=?, nombre=?, apellidos=?, ciudad=?, direccion=?, telefono=?, foto=? WHERE id=?", [datos.email, datos.password, datos.nombre, datos.apellidos, datos.ciudad, datos.direccion, datos.telefono, datos.foto, datos.id], (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
                connection.release();
            });
        });
    }

    enviarSolicitudAdoptante(idAdoptante, idPerro, idProtectora, msg, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query("INSERT INTO solicitud VALUES(?, ?, ?, 0, ?)", [idAdoptante, idPerro, idProtectora, msg], (err) => {
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