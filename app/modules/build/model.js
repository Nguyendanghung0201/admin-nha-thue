const buildRes = require("./repository");


exports.list = async function (query) {

    let result = await buildRes.get_list(query);
    // let list = await buildRes.getMybuild(query.userInfo.Id);
    // let list2 = list.map(e => e.buiding_id)
    // let result2 = result.data.map(e => {
    //     if (list2.includes(e.id)) {
    //         e.mybuild = true;
    //     } else {
    //         e.mybuild = false;
    //     }
    //     return e
    // })
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
}

exports.list_nha_gan = async function (query) {
    let result = await buildRes.get_list_gan(query.city)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result
    };
}
exports.list_ga = async function (query) {
    let list_id = query.param.id;
    let list_id_arr = list_id.split("or")

    let result = await buildRes.get_list_ga(query.page, list_id_arr);
    let list = await buildRes.getMybuild(query.userInfo.Id);
    let list2 = list.map(e => e.buiding_id)
    let result2 = result.data.map(e => {
        if (list2.includes(e.id)) {
            e.mybuild = true;
        } else {
            e.mybuild = false;
        }
        return e
    })
    return {
        status: true,
        msg: "success",
        code: 0,
        data: {
            data: result2,
            pagination: result.pagination
        }
    };
}
exports.detail = async function (query) {
    let result = await buildRes.detail(query.param.id);
    // let check = await buildRes.check(query.userInfo.Id, query.param.id);
    // if (result) {
    //     if (check) {
    //         result.mybuild = true
    //     } else {
    //         result.mybuild = false
    //     }
    // }
    // let city = result.city_id;
    // let list_nha_gan = []
    // if (city) {
    //     list_nha_gan = await buildRes.get_list_gan(city)
    // }
    return {
        status: true,
        msg: "success",
        code: 0,
        data: result,
        // list_nha_gan: list_nha_gan
    };
}