"use strict"

const MAX_JUGADORES = 4;

class DAOPartidas {

    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Inserta una partida en la tabla partidas.
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la inserción, o null en caso contrario.
     * 
     * @param {string} nombrePartida nombre de la partida
     * @param {string} idJugador identificador del jugador que va a jugar la partida
     * @param {function} callback Función callback que será llamada tras la inserción
     */
    crearPartida(nombrePartida, idJugador, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("INSERT INTO partidas(nombre) VALUES(?)", [nombrePartida], (err, result) => {
                if (err) {
                    callback(err);
                    return;
                }
                let idPartida = result.insertId;
                this.addJugadorPartida(idJugador, idPartida, false, (err, result) => {
                    callback(err, result);
                    connection.release();
                });
            });
        });
    }

    /**
     * Inserta a un jugador en una partida.
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la inserción, o null en caso contrario,
     * y un booleano.
     * 
     * @param {string} idJugador identificador del jugador que va a jugar la partida
     * @param {string} idPartida identificador de la partida que va a jugar el jugador
     * @param {function} callback Función callback que será llamada tras la inserción
     */
    addJugadorPartida(idJugador, idPartida, b, callback) {
        if (b) {
            //console.log("1");
            this.jugadoresPartida(idPartida, (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                if (rows.length < MAX_JUGADORES) {
                    console.log("Hay sitio en la partida");
                    this.pool.getConnection((err, connection) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        connection.query("INSERT INTO juega_en(idUsuario, idPartida) VALUES(?, ?)", [idJugador, idPartida], (err) => {
                            if (err) {
                                //console.log("La hemos liado");
                                callback(err);
                                return;
                            }
                            //console.log("Parece que bien");
                            callback(null, true);
                            connection.release();
                        });
                    });
                } else {
                    console.log("NO Hay sitio en la partida");
                    callback(null, false);
                }
            });
        } else {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    callback(err);
                    return;
                }
                connection.query("INSERT INTO juega_en(idUsuario, idPartida) VALUES(?, ?)", [idJugador, idPartida], (err) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback(null);
                    connection.release();
                });
            });
        }
    }

    /**
     * Obtiene los nombres de los jugadores que juegan la partida especificada.
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la inserción, o null en caso contrario,
     * y un array con los nombres de los jugadores de la partida en caso de éxito.
     * 
     * @param {string} idPartida identificador de la partida de la que queremos saber sus jugadores
     * @param {function} callback Función callback que será llamada tras la inserción
     */
    jugadoresPartida(idPartida, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT usuarios.login FROM juega_en LEFT JOIN usuarios ON juega_en.idUsuario = usuarios.id WHERE juega_en.idPartida = ?", [idPartida], (err, rows) => {
                callback(err, rows);
                connection.release();
            });
        });
    }

    /**
     * Comprueba si existe una partida con el id especificado.
     * 
     * Tras la inserción se llamará a la función callback, pasándole el objeto
     * Error, si se produjo alguno durante la inserción, o null en caso contrario,
     * y un booleano que especifica si hemos encontrado la partida o no.
     * 
     * @param {string} idGame identificador del id de la partida que queremos comprobar
     * @param {function} callback Función callback que será llamada tras la inserción
     */
    existsGame(idGame, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("SELECT * FROM partidas WHERE partidas.id = ?", [idGame], (err, rows) => {
                if (err) {
                    callback(err);
                    return;
                }
                if (rows.Length === 0) {
                    callback(err);
                } else {
                    callback(err, rows[0].nombre);
                }
                connection.release();
            });
        });
    }

}

module.exports = {
    DAOPartidas: DAOPartidas
};