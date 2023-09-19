const buildRes = require("./repository");

exports.delete = async function (query) {
    await buildRes.delete(query.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}


exports.add = async function (query) {
   let detail= await buildRes.insert_build(query.list)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: detail
    };
}

exports.update = async function (query) {
    await buildRes.update(query.id, query.data)
    return {

        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}


exports.uploadfile = async function (query) {
    // await buildRes.uploadfile(query.id, query.file)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
}