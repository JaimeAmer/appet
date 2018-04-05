"use strict"

    //------------ Atributos BD PERRO: ------------
    //id
    //idProtectora
    //nombre
    //raza
    //color
    //peso
    //descripcion
    //fallecido

class DAOInvitado {

    constructor(pool) {
        this.pool = pool;
    }

    /**
     * Obtiene la lista de todos los perros de la web:
     * Delvuelve los datos en un array de objetos;
     * @param {*} callback 
     */
    getListaPerros(callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sqlListaPerros = "SELECT id, nombre, idProtectora FROM perro"
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
                        nombre: null
                    };

                    //Recorro las filas devueltas:
                    rows.forEach(element => {
                        //Creo un objeto nuevo por cada fila:
                        perro = {
                            id: element.id,
                            idProtectora: element.idProtectora,
                            nombre: element.nombre
                        }

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
     * @param {*} idPerro 
     * @param {*} callback 
     */
    getDataPerro(idPerro, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            let sqlDatosPerro = "SELECT * FROM perro WHERE id = ?"
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
}

module.exports = {
    DAOInvitado: DAOInvitado
};