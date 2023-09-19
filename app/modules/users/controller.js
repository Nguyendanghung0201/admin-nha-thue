const model = require('./model');
exports.login = async function (query) {
    console.log('login ',query)
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
exports.register = async function (query) {
    let rules =  {
        display_name: "required|maxLength:255",
        username: "required|email|maxLength:255",
        password: "required",
        re_password: "required|same:password",
        phone: "required|numeric|maxLength:20",
        gender: "required|in:0,1",
    };
    let validate = await val.Form(query, rules);
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.register(query);
};
exports.my_profile = async function (query) {
    return await model.my_profile(query);
};
exports.change_password = async function (query) {
    let validate = await val.Form(query, {
        password: "required|hash:md5",
        re_password: "required|same:password",
        old_password: "required|hash:md5"
    });
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.change_password(query);
};
exports.update_profile = async function(query) {
    let rules = {};
    if (query.display_name) {
        rules['display_name'] = "required|maxLength:255"
    }
    if (query.phone) {
        rules['phone'] = "required|numeric|maxLength:20"
    }
    if (query.gender) {
        rules['gender'] = "required|in:0,1"
    }
    let validate = await val.Form(query, rules);
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.update_profile(query);
}


exports.list_ref = async function(query){
    return await model.list(query)
}