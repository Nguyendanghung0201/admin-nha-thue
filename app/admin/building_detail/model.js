const builDtdRes = require("./repository");
exports.addbuild_detail = async function (query) {
    let dataInsert = {
        build_id: query.build_id,
        room_id: query.room_id,
        type: query.type,
        name: query.name,
        position: query.position,
        traffic: query.traffic,
        data: query.data
    };
    //create code user

    // return dataInsert;
    result = await buildRes.insert_build(dataInsert);
    return {
        status: true,
        msg: "success",
        code: 0,
        data: {}
    };
}