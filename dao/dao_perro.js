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


    /**
     * A traves del ID de la protectora, devuelve una lista con los perros que tiene la protectora
     * disponibles para su adopcion
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idPr ID de la protectora
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object[]} Array con los perros
     * @return {undefined} En caso de no haber perros en esa protectora
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getListaPerrosProtectora(idPr, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("SELECT * FROM perro WHERE idProtectora = ? AND adoptado = 0", [idPr], (err, rows) => {
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
     * A traves del ID de la protectora, devuelve una lista con los perros que ha tenido la protectora
     * y que han sido adoptados
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idPr ID de la protectora
     * @param {function} callback Función callback que será llamada tras la consulta
     * @return {Object[]} Array con los perros
     * @return {undefined} En caso de no haber perros en esa protectora
     * @exception {err} En caso de que se produzca un error en la consulta
     */
    getListaPerrosProtectoraAdoptados(idPr, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("SELECT * FROM perro WHERE idProtectora = ? AND adoptado = 1", [idPr], (err, rows) => {
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
     * @return {undefined} En caso de no haber perros en esa protectora
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    getListaPerros(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sqlListaPerros = "SELECT id, nombre, foto, idProtectora FROM perro WHERE adoptado = 0 AND idProtectora not in (SELECT id FROM protectora WHERE estado = 0)";
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
     * Obtiene la lista de todos los perros de la web que han sido adoptados
     * 
     * Delvuelve los datos en un array de objetos
     * 
     * @param {function} callback
     * @return {Object[]} array de perros
     * @return {undefined} En caso de no haber perros adoptados
     * @exception {err} Si hay un error en la consulta a la base de datos
     */
    getListaPerrosAdoptados(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sqlListaPerros = "SELECT id, nombre, foto, idProtectora FROM perro WHERE adoptado = 1 AND idProtectora not in (SELECT id FROM protectora WHERE estado = 0)";
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
                    /*
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
					*/

                    callback(null, rows[0]);
                }
            });
        });
    }

    /**
     * Actualiza los datos de un perro ya existente
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {Object} datos Datos del perro
     * @param {function} callback Función callback que será llamada tras la actualizacion
     * @return {null} En caso de exito
     * @exception {err} En caso de que se produzca un error en la actualizacion
     */
    updatePerro(datos, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            console.log(datos.imagen);
            if (datos.imagen == 1) {
                connection.query("UPDATE perro SET nombre=?, edad=?, raza=?, color=?, peso=?, fallecido=?, adoptado=?, descripcion=? WHERE id=?", [datos.texto.nombre, datos.texto.edad, datos.texto.raza, datos.texto.color, datos.texto.peso, datos.texto.fallecido, datos.texto.adoptado, datos.texto.descripcion, datos.texto.id], (err) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback(null);
                    connection.release();
                });
            } else {
                connection.query("UPDATE perro SET foto=?, nombre=?, edad=?, raza=?, color=?, peso=?, fallecido=?, adoptado=?, descripcion=? WHERE id=?", [datos.imagen, datos.texto.nombre, datos.texto.edad, datos.texto.raza, datos.texto.color, datos.texto.peso, datos.texto.fallecido, datos.texto.adoptado, datos.texto.descripcion, datos.texto.id], (err) => {
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
     * Dado el ID de un perro, se indica que ha sido adoptado
     * 
     * Devolverá error, si se produjo alguno durante la consulta
     * 
     * @param {int} idPerro ID del perro
     * @param {function} callback Función callback que será llamada tras la actualizacion
     * @return {null} En caso de exito
     * @exception {err} En caso de que se produzca un error en la actualizacion
     */
    adoptarPerro(idPerro, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err);
                return;
            }
            connection.query("UPDATE perro SET adoptado=1 WHERE id=?", [idPerro], (err) => {
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
     * Dado el ID de un perro y el ID de la protectora,
     * elimina el perro indicado de la base de datos
     * 
     * Devolverá error, si se produjo alguno durante el borrado
     * 
     * @param {int} idPerro ID del perro
     * @param {int} idProtectora ID de la protectora
     * @param {function} callback Función callback que será llamada tras el borrado
     * @return {boolean} True en caso de exito
     * @exception {err} En caso de que se produzca un error en el borrado
     */
    deletePerro(idPerro, idProtectora, callback) {
        if (callback === undefined) callback = function() {};

        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sql = "DELETE FROM perro WHERE id= ? AND idProtectora= ?";
            connection.query(sql, [idPerro, idProtectora], (err, rows) => {
                //Devuelvo la conexion al pool:
                connection.release();
                //En caso de error de consulta:
                if (err) {
                    callback(err);

                } else {

                    callback(null, true);
                }

            });
        });
    };

    /**
     * Inserta un perro nuevo en la base de datos
     * 
     * Devolverá error, si se produjo alguno durante la insercion
     * 
     * @param {Object} perro Datos del perro
     * @param {function} callback Función callback que será llamada tras la insercion
     * @return {boolean} True en caso de exito
     * @exception {err} En caso de que se produzca un error en la insercion
     */
    newPerro(perro, callback) {
        if (callback === undefined) callback = function() {};

        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sql = "INSERT INTO perro (idProtectora, nombre, foto, edad, raza, color, peso, descripcion) VALUES (? , ? , ? , ? , ? , ? , ? , ?)";
            connection.query(sql, [perro.idProtectora, perro.nombre, perro.foto, perro.edad, perro.raza, perro.color, perro.peso, perro.descripcion],
                (err, rows) => {
                    //Devuelvo la conexion al pool:
                    connection.release();
                    //En caso de error de consulta:
                    if (err) {
                        callback(err);

                    } else {
                        callback(null, true);
                    }

                });
        });
    };
}

module.exports = {
    DAOPerro: DAOPerro
};