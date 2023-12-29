const model = require('./model')

exports.add = async (query) => {
    let validate = await val.Form(query, {
        hoahong: "required",
        gmail:"required",
        user_id:"required",
        user_id_thue:"required",
        name: "required",
        thanhkhoan:  "required",
        data: "required",
        

    });
    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }

    return model.add(query)
}