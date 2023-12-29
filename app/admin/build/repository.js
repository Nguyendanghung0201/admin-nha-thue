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
    async insert_build(dataInsert) {
        return await db(this.db).insert(dataInsert);
    }

    async get_list(page, pagination) {
        return await db(this.db).select('*').limit(pagination)
            .offset((page - 1) * pagination).where('status', 1)
    }
    async get_list_nha_chua_thue(page){
            return await db(this.db).select('*').paginate({ perPage: 50,isLengthAware: true, currentPage: page });
    }
    async update(id, data) {
        return await db(this.db).update(data).where('id', id)
    }


    async delete(uid) {
        return await db(this.db).delete().where('detail_id', uid)
    }


}

module.exports = new build_repository();
