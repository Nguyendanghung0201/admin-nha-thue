const model = require('./model');
exports.login = async function (query) {
    let validate = await val.Form(query, {
        username: "required|email",
        password: "required"
    });
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.login(query);
};

exports.logout = async function (query) {
    return await model.logout(query);
};



exports.my_profile = async function (query) {
    return await model.my_profile(query);
};
