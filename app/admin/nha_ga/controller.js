const model = require('./model')
exports.add = async function (query) {
    let validate = await val.Form(query, {
      
    });
    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }
    return await model.add(query);
};