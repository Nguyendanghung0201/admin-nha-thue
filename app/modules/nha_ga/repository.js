const db = require("../../cors/db");

class nha_ga_repository {
    constructor() {

    }
    async list() {
        return await db('nha_ga').select('*')
    }





}

module.exports = new nha_ga_repository();
