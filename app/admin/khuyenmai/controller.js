const model = require('./model')
// theem dong khuyen mai
exports.add = async (query) => {
    let validate = await val.Form(query, {
        content: "required",
    });
    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }

    return model.add(query)
}
exports.delete = async (query) => {
    let validate = await val.Form(query, {
        id: "required",
    });
    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }

    return model.delete(query)
}

exports.update = async (query) => {
    let validate = await val.Form(query, {
        id: "required",
        content:"required"
    });
    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }

    return model.update(query)
}
exports.list_admin =  async () => {
    return model.list()
}