const buildRes = require("./repository");
exports.add = async function (query) {
    let data_insert = {
        tien_type: query.tien_type,// VND yên
        money: query.money,// 1000
        status: query.status, //"CREATE" "DONE"
        // nguoitao :"",//
        id_nha: query.id_nha,//
        mahopdong: query.mahopdong,//
        user_id_thue: query.user_id_thue,//
        user_thue: query.user_thue,//
        user_nhanhh_id: query.user_nhanhh_id,// tự get ra
        user_name_hh: query.user_name_hh
    }

    await buildRes.add(data_insert)

    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}