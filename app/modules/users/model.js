const md5 = require('md5');
const jwt = require('jsonwebtoken');
const userRes = require("./repository");



const URep = new userRes();

exports.logout = async function (query) {
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
};
exports.list = async function (query) {
    let list = await URep.getlist(query.userInfo.ref)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: list
    }
};

exports.login = async function (query) {
    //check login
    let checkUser = await URep.check_email(query.username);
    if (!checkUser) {

        return { status: false, msg: "error", code: 654, data: [] };
    }
    if (checkUser.status == 0) {

        return { status: false, msg: "error", code: 675, data: [] };
    }

    if (md5(query.password) !== checkUser.password) {

        return { status: false, msg: "error", code: 655, data: [] };
    }

    // create jwt token
    let dataCheckUsername = {
        Id: checkUser.Id,
        display_name: checkUser.display_name,
    };
    let token = await jwt.sign({ dataMain: dataCheckUsername }, config.keyJWT, { expiresIn: '30 days' });


    // return result
    return {
        status: true,
        msg: "success",
        code: 0,
        data: {
            token: token,
            Id: dataCheckUsername.Id
        }
    };
};

exports.register = async (query) => {
    let result = [];
    try {
        //check email
        let checkUsername = await URep.check_email(query.username);
        if (checkUsername) {
            return { status: false, msg: "error", code: 660, data: [] };
        }

        let ref = format.randoms({
            length: 8,
            charset: 'numeric'
        });
        let dataInsert = {
            display_name: query.display_name,
            email: query.username,
            password: md5(query.password),
            phone: query.phone,
            ref: ref,
            created_at: format.date(),
            status: 1,
            level: 0,
            gender: query.gender,
            your_ref: query.ref ?? ""
        };

        //create code user
        dataInsert.find_raw = format.slug_text(query.display_name) + "-" + query.username + "-" + query.phone;

        // return dataInsert;
        result = await URep.insert_user(dataInsert);
        let token = await jwt.sign({ dataMain: result[0] }, config.keyJWT);
        query.result = result;
        query.token = token;
        return {
            status: true, msg: "success", code: 0, data: {
                token: dataInsert
            }
        };
    } catch (ex) {
        console.log(ex)
        if (result[0]) {
            await URep.delete(result[0]);
        }
        return { status: false, msg: "fail", code: 700, data: [] };
    }
};

exports.my_profile = async (query) => {
    let profile = await URep.my_profile(query.userInfo.Id);
    return { status: true, msg: "success", code: 0, data: [profile] };
};
exports.change_password = async (query) => {
    //check password
    if (md5(query.old_password) !== query.userInfo.password) {
        return { status: false, msg: "error", code: 655, data: [] };
    }
    let dataUpdate = {
        updateAt: format.date(),
        password: md5(query.password)
    };
    await URep.update_user(dataUpdate, query.userInfo.Id);
    return { status: true, msg: "success", code: 0, data: [] };
};
exports.update_profile = async (query) => {
    let check_user = await URep.my_profile(query.userInfo.Id);
    if (!check_user) {
        return { status: false, msg: "error", code: 654, data: [] };
    }
    let dataUpdate = {
        updated_at: format.date()
    };

    if ((query.display_name || query.display_name == '') && query.display_name != check_user.display_name) {
        dataUpdate.display_name = query.display_name;
    }
    if (query.gender || query.gender === 0) {
        dataUpdate.gender = query.gender;
    }
    if ((query.phone || query.phone == '') && query.phone !== check_user.phone) {
        let checkPhone = await URep.check_phone(query.phone);
        if (checkPhone) {
            return { status: false, msg: "error", code: 677, data: [] };
        }
        dataUpdate.phone = query.phone;
    }
    dataUpdate.find_raw = (dataUpdate.display_name ? dataUpdate.display_name : check_user.display_name)
        + "-" + (dataUpdate.email ? dataUpdate.email : check_user.email) + "-" + (dataUpdate.phone ? dataUpdate.phone : check_user.phone)
        + "-";
    await URep.update_user(dataUpdate, check_user.Id);
    return { status: true, msg: "success", code: 0, data: [] };
}