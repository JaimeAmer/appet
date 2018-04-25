"use strict";

//------------ Atributos BD PERRO: ------------
//id
//idProtectora
//nombre
//foto
//raza
//color
//peso
//descripcion
//fallecido

class DAOPerro {

    /**
     * Inicializa el DAO de usuarios invitados
     * 
     * @constructor
     * @param {*} pool 
     */
    constructor(pool) {
        this.pool = pool;
    }


    getListaPerrosProtectora(idPr, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("SELECT * FROM perro WHERE idProtectora = ?", [idPr], (err, rows) => {
                if (err) { callback(err); return; }

                //Devuelvo la conexion al pool:
                connection.release();

                //En caso de que no hay encontrado nada:
                if (rows.length === 0) {
                    callback(null, undefined);
                }

                //En caso de que la busqueda haya devuelto al menos una fila:
                else {
                    let listaPerros = [];
                    let perro = {
                        id: null,
                        idProtectora: null,
                        foto: null,
                        nombre: null
                    };

                    //Recorro las filas devueltas:
                    rows.forEach(element => {
                        //Creo un objeto nuevo por cada fila:
                        perro = {
                            id: element.id,
                            idProtectora: element.idProtectora,
                            nombre: element.nombre,
                            foto: element.foto
                        };

                        //Inserto el objeto en el array:
                        listaPerros.push(perro);
                    });

                    callback(null, listaPerros);
                }
            });
        });
    }


    /**
     * Obtiene la lista de todos los perros de la web:
     * Delvuelve los datos en un array de objetos;
     * 
     * @param {function} callback
     * @return {Object[]} array de perros
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    getListaPerros(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sqlListaPerros = "SELECT id, nombre, foto, idProtectora FROM perro WHERE idProtectora not in (SELECT id FROM protectora WHERE estado = 0)";
            connection.query(sqlListaPerros, (err, rows) => {

                //En caso de error de consulta:
                if (err) { callback(err); return; }

                //Devuelvo la conexion al pool:
                connection.release();

                //En caso de que no hay encontrado nada:
                if (rows.length === 0) {
                    callback(null, undefined);
                }

                //En caso de que la busqueda haya devuelto al menos una fila:
                else {
                    let listaPerros = [];
                    let perro = {
                        id: null,
                        idProtectora: null,
                        foto: null,
                        nombre: null
                    };

                    //Recorro las filas devueltas:
                    rows.forEach(element => {
                        //Creo un objeto nuevo por cada fila:
                        perro = {
                            id: element.id,
                            idProtectora: element.idProtectora,
                            nombre: element.nombre,
                            foto: element.foto
                        };

                        //Inseerto el objeto en el array:
                        listaPerros.push(perro);
                    });

                    callback(null, listaPerros);
                }

            });
        });
    }

    /**
     * Obtiene todos los datos de un perro buscando por id:
     * Devuelve los datos en forma de objeto (perro);
     * 
     * @param {int} idPerro identificador del perro
     * @param {function} callback
     * @return {Object} perro
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    getDataPerro(idPerro, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sqlDatosPerro = "SELECT * FROM perro WHERE id = ?";
            connection.query(sqlDatosPerro, [idPerro], (err, rows) => {
                //En caso de error de consulta:
                if (err) { callback(err); return; }

                //Devuelvo la conexion al pool:
                connection.release();

                //En caso de que no hay encontrado al perro:
                if (rows.length === 0) {
                    callback(null, undefined);
                }

                //En caso de que la busqueda haya encontrado al perro:
                else {

                    //Monto el objeto perro con todos sus datos:
                    let perro = {
                        id: rows[0].id,
                        idProtectora: rows[0].idProtectora,
                        nombre: rows[0].nombre,
                        foto: rows[0].foto,
                        edad: rows[0].edad,
                        raza: rows[0].raza,
                        color: rows[0].color,
                        peso: rows[0].peso,
                        descripcion: rows[0].descripcion,
                        fallecido: rows[0].fallecido
                    };

                    callback(null, perro);
                }
            });
        });
    }
    
    deletePerro(idPerro, idProtectora, callback){
        if(callback===undefined) callback=function(){};
        
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sql = "DELETE FROM perro WHERE id= ? AND idProtectora= ?";
            connection.query(sql, [idPerro, idProtectora], (err, rows) => {
                //Devuelvo la conexion al pool:
                connection.release();
                //En caso de error de consulta:
                if (err) { 
                    callback(err); 
                
                }else {
                    
                    callback(null, true);
                }
                
            });
        });
    };
    
    newPerro(perro, callback){
        if(callback===undefined) callback=function(){};
        
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sql = "INSERT INTO perro (idProtectora, nombre, foto, edad, raza, color, peso, descripcion, fallecido) VALUES (? , ? , ? , ? , ? , ? , ? , ? , 0)";
            connection.query(sql, 
            [perro.idProtectora, perro.nombre, perro.foto, perro.edad, perro.raza, perro.color, perro.peso, perro.descripcion],
            (err, rows) => {
                //Devuelvo la conexion al pool:
                connection.release();
                //En caso de error de consulta:
                if (err) { 
                    callback(err); 
                
                }else {
                    callback(null, true);
                }
                
            });
        });
    };
}

module.exports = {
    DAOPerro: DAOPerro
};