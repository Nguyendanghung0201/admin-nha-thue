const db = require("../../cors/db");

class build_HH_repository {
    constructor() {
        this.db = "hoahong";
        this.column = {
            id: "id",
            tien_type:"tien_type",// VND yên
            money:"money" ,// 1000
            status:"status", //"CREATE" "DONE"
            // nguoitao :"",//
            id_nha:"id_nha",//
            mahopdong:"mahopdong",//
            user_id_thue:"user_id_thue",//
            user_thue :"user_thue",//
            user_nhanhh_id	:"user_nhanhh_id",// tự get ra
            user_name_hh :"user_name_hh"	,
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
        return await db('hoahong').insert(dataInsert);
    }


    async update(id, data) {
        return await db('hoahong').update(data).where('id', id)
    }


    async delete(uid) {
        return await db('hoahong').delete().where('id',uid)
    }
    async getuser(id) {
        return await db('users').select('*').where('email',id).first()
    }
    async getref(ref) {
        return await db('users').select('*').where('ref',ref).first()
    }
    
    


    

}

module.exports = new build_HH_repository();
