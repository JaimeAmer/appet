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


}

module.exports = {
    DAOGeneral: DAOGeneral
};