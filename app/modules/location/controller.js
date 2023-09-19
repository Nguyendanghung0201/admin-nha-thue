let model = require('./model')
exports.list_province = async () => {

  return await model.list_province()

}


exports.list_city = async (query) => {
  let validate = await val.Form(query.param, {
    id: "required",
  });
  if (!query.param.id) {
    return { status: false, msg: validate.error, code: 707, data: [] };
  }

  return await model.list_city(query)
}


exports.list_along = async (query) => {
  let validate = await val.Form(query.param, {
    id: "required",
  });
  if (!query.param.id) {
    return { status: false, msg: validate.error, code: 707, data: [] };
  }

  return await model.list_along(query)
}

exports.list_town = async (query) => {
  let validate = await val.Form(query.param, {
    id: "required",
  });
  if (!query.param.id) {
    return { status: false, msg: validate.error, code: 707, data: [] };
  }

  return await model.list_town(query)
}

exports.province = async (query) => {

  return await model.province(query)

}
