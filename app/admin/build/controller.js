const model = require('./model');

exports.add = async function (query) {
    let validate = await val.Form(query, {
        list: 'required'
    });

    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }
    return await model.add(query);
}
exports.update = async function (query) {
    let validate = await val.Form(query, {
        data: 'required',
        id: 'required'
    });

    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }
    return await model.update(query);
}
exports.delete = async function (query) {
    let validate = await val.Form(query, {
        id: 'required'
    });

    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }
    return await model.delete(query);
}

exports.uploadfile = async function (query) {
    let validate = await val.Form(query, {
        id: 'required'
    });

    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }
    return await model.uploadfile(query);
}

exports.update_date_build = async function (query) {
    let validate = await val.Form(query, {
    
    });

    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }
    return await model.update(query);
}

