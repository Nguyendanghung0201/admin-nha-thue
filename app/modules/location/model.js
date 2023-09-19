const repLocation = require('./repository')
exports.list_province = async () => {
    let result = await repLocation.getListProvice()
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
}

exports.list_city = async(query)=>{
    let result = await repLocation.getListCity(query.param.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
}

exports.list_town = async(query)=>{
    let result = await repLocation.getListTown(query.param.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
}
exports.list_along = async(query)=>{
    let result = await repLocation.getListAlong(query.param.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
}
exports.province = async(query)=>{
    let result = await repLocation.province(query.param.id)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
}


