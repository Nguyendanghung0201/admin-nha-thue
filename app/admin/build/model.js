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

exports.getbuilding = async function (query) {
    let list =[]
    if(query.type ==1){
        //  nhà chưa cho thuê
         list = await  buildRes.get_list_nha_chua_thue(query.page)
    }else{
        list = await  buildRes.get_list_nha_chua_thue(query.page)
    }
    return {
        status: true,
        msg: "success",
        code: 0,
        data: list
    }
}