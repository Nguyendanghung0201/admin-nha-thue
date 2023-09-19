const db = require("../../cors/db");

class build_repository {
    constructor() {
        this.db = "building2";
        this.column = {
            id: "id",
            name: "name",
            address: "address",
            line: "line",
            infor: "infor",
            images: "images",
            data: "data",
            room: "room",
            phone: "phone",
            pdf: "pdf",
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
    async add(dataInsert) {
        return await db('city_code').insert(dataInsert);
    }


    async update(id, data) {
        return await db('city_code').update(data).where('id', id)
    }


    async delete(uid) {
        return await db('city_code').delete().where('id',uid)
    }

    async add_along(dataInsert) {
        return await db('along_code').insert(dataInsert);
    }


    async update_along(id, data) {
        return await db('along_code').update(data).where('id', id)
    }


    async delete_along(uid) {
        return await db('along_code').delete().where('id',uid)
    }
    

}

module.exports = new build_repository();
