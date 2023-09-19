const db = require("../../cors/db");

class khuyenmai_repository {
    constructor() {
        this.db = "khuyen_mai";
        this.column = {
            id: "id",
            name: "name",
            address: "address",
            line: "line",
            infor: "infor",
            images: "images",
            pdf: "pdf",
            created_at: "created_at",
            updated_at: "updated_at",
            phone: "phone",

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
    async add(query) {
        return await db('khuyen_mai').insert({
            content: query.content
        })
    }
    async update(id, content) {
        return await db('khuyen_mai').update({
            content: content
        }).where('id', id)
    }



    async delete(uid) {
        return await db(this.db).delete().where(this.column.id, uid)
    }


    async list() {
        return await db(this.db).select('*')
    }






}

module.exports = new khuyenmai_repository();
