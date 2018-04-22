"use strict";


class DAOAdmin {

    /**
     * Inicializa el DAO de usuarios invitados
     * 
     * @constructor
     * @param {*} pool 
     */
    constructor(pool) {
        this.pool = pool;
    }
  
}

module.exports = {
    DAOAdmin: DAOAdmin
};