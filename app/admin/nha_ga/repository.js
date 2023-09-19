const db = require("../../cors/db");

class nha_ga_repository {
    constructor() {
        this.db = "nha_ga";
        this.column = {
            id: "id",
            name: "name",
            status:'status',
            created_at: "created_at",
            updated_at: "updated_at",

        };
    }

    _create_select_ignore(ignore = []) {
        let select = [];
        for (let item in this.column) {
            if (ignore.indexOf(this.column[item]) === -1) {
                select.push(this.column[item]);
            }
        }
        return select;
    }

    _create_select_care(care = []) {
        let select = [];
        for (let item in this.column) {
            if (care.indexOf(this.column[item]) !== -1) {
                select.push(this.column[item]);
            }
        }
        return select;
    }
    async insert_build(dataInsert) {
        return await db(this.db).insert(dataInsert);
    }

    async delete(uid) {
        return await db(this.db).update('status', 0).where(this.column.id, uid)
    }

}

module.exports = new nha_ga_repository();
