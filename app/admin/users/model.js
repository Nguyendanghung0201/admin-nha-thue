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
    if (checkUser.level == 0) {
        return { status: false, msg: "error", code: 675, data: [] };
    }

    // create jwt token
    let dataCheckUsername = {
        Id: checkUser.Id,
        display_name: checkUser.display_name,
    };
    let token = await jwt.sign({ dataMain: dataCheckUsername }, config.keyJWT, { expiresIn: '24h' });


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

exports.my_profile = async (query) => {
    let profile = await URep.my_profile(query.userInfo.Id);
    if(!profile || profile.level ==0){
        return { status: false, msg: "error", code: 675, data: [] };
    }
    return { status: true, msg: "success", code: 0, data: [profile] };
};