"use strict"

class DAOUsers {

    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Inserta un usuario en la tabla usuarios.
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la inserción, o null en caso contrario.
     * 
     * @param {string} username nombre del jugador
     * @param {string} password contraseña del jugador
     * @param {function} callback Función callback que será llamada tras la inserción
     */
    createUser(username, password, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }

            connection.query("INSERT INTO usuarios(login, password) VALUES(?,?)", [username, password], (err) => {
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
     * Inserta un usuario en la tabla usuarios.
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la inserción, o null en caso contrario.
     * 
     * @param {string} username nombre del jugador
     * @param {string} password contraseña del jugador
     * @param {function} callback Función callback que será llamada tras la inserción
     */
    isUserCorrect(username, password, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM usuarios WHERE login = ? AND password = ?", [username, password], (err, rows) => {
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
     * Obtiene las partidas en las que se encuentra el jugador especificado.
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la inserción, o null en caso contrario y
     * un array que contiene las partidas(id y nombre) que juega el usuario.
     * 
     * @param {string} nameUser nombre del jugador
     * @param {function} callback Función callback que será llamada tras la inserción
     */
    getMatches(nameUser, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT partidas.id, partidas.nombre FROM juega_en LEFT JOIN partidas ON juega_en.idPartida = partidas.id LEFT JOIN usuarios ON juega_en.idUsuario = usuarios.id WHERE usuarios.login = ?", [nameUser], (err, rows) => {
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
     * Obtiene el id del jugador dado un nombre de jugador
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la inserción, o null en caso contrario y
     * el id del jugador
     * 
     * @param {string} namePlayer nombre del jugador
     * @param {function} callback Función callback que será llamada tras la inserción
     */
    getIdUser(namePlayer, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT usuarios.id FROM usuarios WHERE usuarios.login = ?", [namePlayer], (err, rows) => {
                callback(err, rows[0].id);
                connection.release();
            });
        });
    }
}



module.exports = {
    DAOUsers: DAOUsers
};