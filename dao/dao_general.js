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
    verifyUser(info,callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { 
                callback(err);
            }else{
                let sql= "";
                
                if(info.gridRadios==='protectora'){
                    sql="SELECT id, email, password FROM protectora WHERE email=? AND password=?";
                    
                }/*else if(info.gridRadios==='adoptante'){
                    console.log("");
                }else if((info.gridRadios==='admin')){
                    console.log("G");
                }*/
                
                
                connection.query(sql,[info.email,info.pass], (err, result) => {
                    connection.release();
                
                    if (err) { 
                        callback(err); 
                    }else{
                        callback(null,result[0]);
                    }
                });
            }
        });
    }


}

module.exports = {
    DAOGeneral: DAOGeneral
};