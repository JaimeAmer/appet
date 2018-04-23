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
	eliminarAdoptante(idAdoptante, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("UPDATE `adoptante` SET `estado` = '0' WHERE `adoptante`.`id` = ?;", [idAdoptante],(err) => {
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
}

module.exports = {
    DAOAdoptante: DAOAdoptante
};