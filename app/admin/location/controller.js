const model = require('./model');

exports.add = async function(query){
    let validate = await val.Form(query, {
        data:'required'
     });

     if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.add(query);
}
exports.update = async function(query){
    let validate = await val.Form(query, {
        data:'required',
        id:'required'
     });

     if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.update(query);
}
exports.delete = async function (query){
    let validate = await val.Form(query, {
        id:'required'
     });

     if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.delete(query);
}



exports.add_along = async function(query){
    let validate = await val.Form(query, {
        data:'required'
     });

     if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.add_along(query);
}
exports.update_along = async function(query){
    let validate = await val.Form(query, {
        data:'required',
        id:'required'
     });

     if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.update_along(query);
}
exports.delete_along = async function (query){
    let validate = await val.Form(query, {
        id:'required'
     });

     if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.delete_along(query);
}
