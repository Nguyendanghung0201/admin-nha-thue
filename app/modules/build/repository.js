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

    async get_list(query) {

        if (query.city_code) {
            return await db(this.db).select('*').where('status', 1).andWhere('city_id', query.city_code).paginate({ perPage: 20, isLengthAware: true, currentPage: query.page })
        }

        if (query.along_code) {
            return await db(this.db).select('*').where('status', 1).andWhere('along_id', query.along_code).paginate({ perPage: 20, isLengthAware: true, currentPage: query.page })
        }
        return await db(this.db).select('*').where('status', 1).paginate({ perPage: 20, isLengthAware: true, currentPage: query.page })

    }

    async get_list_gan(city) {
        return await db(this.db).select('*').where('status', 1).andWhere('city_id', city)
            .orderByRaw('RAND()').limit(15)
    }

    async getMybuild(user_id) {
        return await db('my_build').select('buiding_id').where('my_build.user_id', user_id)
    }

    async delete(uid) {
        return await db(this.db).update('status', 0).where(this.column.id, uid)
    }

    async detail(uid) {
        return await db(this.db).select('*').where("detail_id", uid).first()
    }
    async check(uid, buiding_id) {
        return await db('my_build').select('*').where('user_id', uid).andWhere('buiding_id', buiding_id).first()
    }
    async get_list_ga(page, id_ga) {
        return await db('nha_ga_build').innerJoin('building2', 'building2.id', 'nha_ga_build.build_id').select('building2.*', 'nha_ga_build.nha_ga_id')
            .orWhereIn('nha_ga_build.nha_ga_id', id_ga).paginate({ perPage: 20, isLengthAware: true, currentPage: page })
    }


}

module.exports = new build_repository();
