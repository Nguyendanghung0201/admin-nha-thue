const model = require('./model')

exports.add = async (query) => {
    let validate = await val.Form(query, {
        hoahong: "required",
        tien_type:"required",// VND yên
        money:"required" ,// 1000
        status:"required", //"CREATE" "DONE"
        // nguoitao :"",//
        id_nha:"required",//
        mahopdong:"required",//
        user_id_thue:"required",//
        

    });
    if (!validate.status) {
        return { status: false, msg: validate.error, code: 707, data: [] };
    }

    return model.add(query)
}