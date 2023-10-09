const db = require("../../cors/db");

class Review {
    constructor() {
        this.db = "reviewweb";
        this.column = {
            id: "id",
            name: "name",
            point:'point',
            content:"content",
            title:"title",
            position:"position",
            image: "image",
            imageavt: "imageavt",

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
        return await db(this.db).where(this.column.id, uid).del()
    }
    async list(){
        return await db(this.db).select('*')
    }
    async update(id,data){
        return await db(this.db).update(data).where(this.column.id, id)
    }

}

module.exports = new Review();
