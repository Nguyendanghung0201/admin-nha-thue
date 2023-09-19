const model = require('./model');
exports.addbuild_detail = async function (query) {
    let validate = await val.Form(query, {
        build_id: "required",
        room_id: "required",
        type: 'required',
        name: "required",
        position: "required",
        traffic: "required",
        data:'required'

    });
    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }
    return await model.addbuild_detail(query);
};