const db = require("../../cors/db");

class my_build_repository {
    constructor() {

    }


    async add(data) {
        return await db('my_build').insert(
            data
        )
    }
    async check(user_id, id) {
        return await db('my_build').select('*').where('user_id', user_id).andWhere('buiding_id', id).first()
    }

    async getList(user_id, page) {
        return await db('my_build')
            .leftJoin('building2', 'my_build.buiding_id', 'building2.id')
            .select('building2.*', 'my_build.id as build_id').where('my_build.user_id', user_id)
            .orderBy('build_id', 'desc').paginate({ perPage: 20, isLengthAware: true, currentPage: page })
    }
    async delete(user_id, id) {
        return await db('my_build').where('user_id', user_id).andWhere('id', id).delete()
    }


}

module.exports = new my_build_repository();
