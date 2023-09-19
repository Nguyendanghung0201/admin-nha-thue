const db = require("../../cors/db");

class build_detail_repository {
    constructor() {
        this.db = "building_detail";
        this.column = {
            id: "id",
            build_id: "build_id",
            room_id: "room_id",
            type: "type",
            name: "name",
            position: "position",
            traffic: "traffic",
            data: "data",
            status: "status",
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
            .offset((page -1)* pagination ).where('status', 1)
    }

    async delete(uid) {
        return await db(this.db).update('status', 0).where(this.column.id, uid)
    }

}

module.exports = new build_detail_repository();
