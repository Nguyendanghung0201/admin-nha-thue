const db = require("../../cors/db");

class user_repository {
    constructor() {
        this.db = "users";
        this.column = {
            Id: "Id",
            display_name: "display_name",
            email: "email", 
            password: "password",
            country: "country", 
            address: "address",
            gender: "gender", 
            status: "status", 
            level: "level", 
            created_at: "created_at", 
            updated_at: "updated_at",
            phone: "phone",
            avatar:"avatar",
            find_raw: "find_raw"
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

    async check_phone(phone) {
        let select = this._create_select_care([this.column.phone]);
        return await db(this.db).select(select).where(this.column.phone, phone).first();
    }

    async check_email(email) {
        return await db(this.db).where(this.column.email, email).first();
    }
    async my_profile(uid) {
        let select = this._create_select_ignore([]);
        return await db(this.db).select(select).where(this.column.Id, uid).first();
    }
    async update_user(dataUpdate, uid) {
        return await db(this.db).where(this.column.Id, uid).update(dataUpdate);
    }
    async insert_user(dataInsert) {
        return await db(this.db).insert(dataInsert);
    }
    async delete(uid) {
        return await db(this.db).where(this.column.Id, uid).del()
    }

}

module.exports = user_repository;
