
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const fs = require('fs')
const { URL } = require('url');
const cors = require('cors');
var http = require('http');
var axios = require('axios');
const app = express();
const device = require('express-device');
const requestIp = require('request-ip');
const session = require('express-session');
require('./app/cors/global');
var randomstring = require("randomstring");
var citys = require("./b.json")
var cheerio = require("cheerio");
app.use(timeout(5 * 60 * 1000));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('public'));
const path = require('path');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: global.config.keyJWT,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
const multer = require('multer');
const crawler = require('./app/modules/build/crawler');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
var server = http.createServer(app);

//config update file
/** @namespace global.config */
app.use(cors(global.config.cors));
//get device name
app.use(device.capture());
//get IP device
app.use(requestIp.mw());
app.use(express.static(__dirname + '/public/admin'));

app.use(function (err, req, res, next) {
    return res.send({ status: false, msg: "error", code: 700, data: err });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.locals.token = req.session.token;
    next();
});
const delay = (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(), ms));

const url_dich = 'https://api-edge.cognitive.microsofttranslator.com/translate?from=ja&to=en&api-version=3.0&includeSentenceLength=true' //vi
app.all('/quanly/client/:act', [middleware.verifyToken, middleware.checkadmin], async function (request, response) {

    let dataReponse = null;
    let dataError = null;
    try {

        let act = request.params.act.replace(/[^a-z0-9\_\-]/i, '').toLowerCase();
        let mod = (request.mod) ? request.mod : request.query.mod;
        let nameRole = request.body.userInfo ? request.body.userInfo.level : '';

        let authMethod = global.authMethod.check_function(request.method, act, mod, nameRole);
        /** @namespace request.files */

        request.body.files = request.files ? request.files : '';
        if (authMethod) {

            let controller = require('./app/modules/' + act + '/controller');
            if ((controller) && (controller[mod])) {
                let query = request.body;
                query.param = request.query;
                query.clientIp = request.clientIp;
                query.device = request.device;
                try {
                    dataReponse = await controller[mod](query);

                } catch (ex) {
                    console.log(ex);
                    dataReponse = { status: false, msg: "error", code: 700, data: [] };
                }
            } else {
                dataReponse = { status: false, msg: "error", code: 703, data: [] };
            }
        } else {
            dataReponse = { status: false, msg: "error", code: 701, data: [] };
        }
    } catch (sys) {
        console.log(sys)
        dataReponse = { status: false, msg: "error", code: 700, data: sys };
    }
    response.send(dataReponse)
});
app.all('/quanly/admin/:act', [middleware.verifyToken, middleware.checkadmin], async function (request, response) {

    let dataReponse = null;
    let dataError = null;
    try {
        let act = request.params.act.replace(/[^a-z0-9\_\-]/i, '').toLowerCase();
        let mod = (request.mod) ? request.mod : request.query.mod;
        let nameRole = request.body.userInfo ? request.body.userInfo.level : '';
        let authMethod = global.authMethod.check_function(request.method, act, mod, nameRole);
        /** @namespace request.files */
        request.body.files = request.files ? request.files : '';
        if (authMethod) {
            let controller = require('./app/admin/' + act + '/controller');
            if ((controller) && (controller[mod])) {
                let query = request.body;
                query.param = request.query;
                query.clientIp = request.clientIp;
                query.device = request.device;
                try {
                    dataReponse = await controller[mod](query);

                } catch (ex) {
                    console.log(ex);
                    dataReponse = { status: false, msg: "error", code: 700, data: [] };
                }
            } else {
                dataReponse = { status: false, msg: "error", code: 703, data: [] };
            }
        } else {
            dataReponse = { status: false, msg: "error", code: 701, data: [] };
        }
    } catch (sys) {
        console.log(sys)
        dataReponse = { status: false, msg: "error", code: 700, data: sys };
    }
    response.send(dataReponse)
});
app.post('/apiupload', [middleware.verifyToken, middleware.checkadmin], upload.single('single'), async function (request, response) {
    let dataReponse;

    try {
        const file = request.file
        if (!file) {
            return dataReponse = { status: false, msg: "error", code: 700, data: 'sys' };
        }
        let url = 'http://157.230.27.124:2021/uploads/';

        dataReponse = {
            status: true,
            msg: "success",
            code: 0,
            data: url + file.filename
        }
    } catch (sys) {
        console.log(sys)
        dataReponse = { status: false, msg: "error", code: 700, data: sys };
    }
    response.send(dataReponse)
});
app.post('/quanly/getinfor_file', [middleware.verifyToken, middleware.checkadmin], async (req, res) => {

    let { name } = req.body;
    if (name) {
        if (!fs.existsSync(`./output/json/${name}.json`)) {
            return res.json({
                status: false,
                msg: "file không tồn tại",
                code: 700, data: []
            })
        }
        const rawData = fs.readFileSync(`./output/json/${name}.json`);
        const data = JSON.parse(rawData);
        res.json({
            status: true,
            msg: "success",
            code: 0,
            data: data
        })
    } else {
        res.json(
            { status: false, msg: "file khong ton tai", code: 700, data: [] }
        )
    }

})



app.get('/update_date_build/:id', [middleware.verifyToken, middleware.checkadmin], async (req, res) => {
    let id = req.params.id
    var currentDate = new Date();
    // Lấy ngày, tháng và năm hiện tại
    var day = currentDate.getDate(); // Ngày
    var month = currentDate.getMonth() + 1; // Tháng (lưu ý: tháng bắt đầu từ 0, nên cần cộng thêm 1)
    var year = currentDate.getFullYear(); // Năm
    // so sánh vs ngày update gần nhất. nếu ngày update gần nhất trùng thì chỉ cần update. nếu ngày cũ rồi thì  update lại toàn bộ
    if (!fs.existsSync(`./output/update/update.json`)) {
        return res.json({
            status: false,
            msg: "file không tồn tại",
            code: 700, data: []
        })
    }
    //  https://www.villagehouse.jp/vi/thue/?type=City&codes=1108+1102+1107+1105+1103+1106+1109+012181+012041+012246+012165+012173+012289+012319+013463+016101+012106+012068+012351+012025+012084+012220+012238+012033+012203+014257+012131+012092+012050+012122+012076+014249+012262+012149+014290
    const rawData = fs.readFileSync(`./output/update/update.json`);
    const data_last_update = JSON.parse(rawData);
    if (year != data_last_update.year || month != data_last_update.month || day != data_last_update.day) {
        await db('building2').update('status_crawl', 'process')
        let new_update = {
            "day": day,
            "month": month,
            "year": year

        }
        const exp4 = JSON.stringify(new_update, null, 4);
        fs.writeFileSync(`./output/update/update.json`, exp4)
        await delay(1000)
    }

    let list = []
    if (id == 1) {
        list = await global.db('building2').select("id", 'detail_id').where({
            status: 1,
            status_crawl: 'process'

        }).orderBy('id', 'asc')
            .paginate({ perPage: 100, isLengthAware: true, currentPage: 1 })
    } else {
        list = await global.db('building2').select("id", 'detail_id').where({
            status: 1,
            status_crawl: 'process'

        }).orderBy('id', 'desc')
            .paginate({ perPage: 100, isLengthAware: true, currentPage: 1 })
    }


    if (list.data.length > 0) {
        res.json({
            status: true,
            msg: "success",
            code: 0,
            data: list
        })

    } else {
        res.json({
            status: true,
            msg: "success",
            code: 0,
            data: [],
            done: true
        })
    }

})

async function dichchu(a, Bearer) {
    try {
        let b = await axios.post(url_dich, a, {
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + Bearer
            }
        })
        if (b.status == 200) {
            let text = b.data ?? false
            return text
        } else {
            return false
        }
    } catch (e) {
        return false
    }


}

app.get('/quanly/update_real', async (req, res) => {
    // let { cookie } = req.body;
    let list = await db('building2').select('id', 'name', 'web', 'status', 'detail_id', 'real_id').where('thongtin_1', 'realpro').andWhereRaw('created_at < NOW() - INTERVAL 3 DAY')
    res.json({
        status: true,
        msg: "success",
        code: 0,
        data: list
    })
})


app.get('/need_update/:id', async (req, res) => {
    let id = req.params.id;
    if (!id) return res.json({
        status: false,
        data: [],
        code: 450,
        msg: "error",
    })
    if (id == 'all') {
        await db('building2').update('status_crawl', 'process')
    } else {
        await db('building2').update('status_crawl', 'process').where('detail_id', id)
    }
    return res.json({
        status: true,
        msg: "success",
        code: 0,
        data: [],
    })

})

app.get('/quanly/checkgetdetail/:id', async (req, res) => {
    let id = req.params.id
    let a = await db("building2").select('id', 'detail_id').where('detail_id', id).first() //.andWhere('status_crawl', '<>', 'process')
    if (a) {
        if (a.status_crawl == 'process') {
            await db("building2").delete().where('id', a.id)
            return res.json({
                status: false,
                data: [],
                code: 0,
                pass: false

            })
        } else {
            return res.json({
                status: true,
                data: [],
                delete: true,
                code: 0,
                pass: true

            })
        }

    } else {
        return res.json({
            status: false,
            data: [],
            code: 0,
            pass: false

        })
    }
})


app.post('/quanly/getdetail', async (req, res) => {
    try {
        let { url, cookie, id } = req.body;
        if (!url || !cookie || !id) {
            return res.json({
                status: false,
                code: 700,
                err: "Lỗi hệ thống"
            })
        }
        // let getnha = await db("building2").select('id', 'detail_id').where('detail_id', id).andWhere('status_crawl','<>','process').first()
        // if (getnha) {
        //     return res.json({
        //         status: true,
        //         data: [],
        //         delete: true,
        //         code: 0,
        //         pass: true

        //     })
        // }

        let html = await axios.get(url, {
            headers: {
                "cookie": cookie,
                'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.69',
                "origin": 'https://www.realnetpro.com',
                "referer": url
            }
        })

        if (html.data === 'この部屋の情報は入居中であるか公開されていません。') {
            await db('building2').where('detail_id', id).del()
            return res.json({
                status: true,
                data: [],
                delete: true,
                code: 0,
                pass: true

            })
        }
        if (html.data) {
            let $ = cheerio.load(html.data, { decodeEntities: false, xmlMode: true, lowerCaseTags: true })
            let listimage = $('.photo_list_box .image_list img')
            if (!listimage) {
                return res.json({
                    status: false,
                    code: 700,
                    err: "Cập nhật lại cookie"
                })
            }
            let imageavt = ""
            let a = $("#maparea2")
            let vido = a.attr('src')
            let list_img_url = ''
            for (let img of listimage) {
                let url = $(img).attr('src')
                if (!imageavt) {
                    imageavt = url
                }
                list_img_url = list_img_url + ',' + url
            }
            let infor = $('.room_info .basic_table tr')
            let list_infor = []
            for (let el of infor) {
                let key = $(el).find('td.td_m').text()
                if (key) {
                    let value = ""
                    if (key == '交通') {
                        value = $(el).find('td:nth-child(2)').html()
                    } else {
                        value = $(el).find('td:nth-child(2)').text()
                    }

                    if (value) {
                        list_infor.push({
                            key: key.trim().replace(/\n|\r/g, "").replace(/\s+/g, ' '),
                            value: value.trim().replace(/\n|\r/g, "").replace(/\s+/g, ' ')
                        })
                    }
                }
            }

            let token = await axios.get('https://edge.microsoft.com/translate/auth', {
                headers: { "content-type": "text/plain" }
            })
            let Bearer = ''
            if (token.status == 200) {
                Bearer = token.data
            }
            let arr = list_infor.map(e => {
                return {
                    Text: e.value
                }
            })

            let b = await dichchu(arr, Bearer)

            list_infor = list_infor.map((e, i) => {
                let el_en = b[i].translations[0].text
                e.value2 = el_en
                return e
            })

            res.json({
                data: {
                    list_img_url,
                    list_infor,
                    imageavt,
                    vido
                },
                status: true,
                msg: "success",
                code: 0,

            })
        } else {
            res.json({
                status: false,
                code: 701,
                err: "Lỗi hệ thống"
            })
        }
    } catch (e) {
        console.log(e)
        res.json({
            status: false,
            code: 702,
            err: e
        })
    }


})
app.post('/quanly/getlist_home', async (req, res) => {

    let { url, name, cookie, pagemin, pagemax } = req.body;
    if (!url || !cookie || !pagemin || !pagemax) {
        return res.json({
            status: false, msg: "error", code: 770, data: []
        })
    }
    name = name ?? 'file_crawl'
    try {
        let arr = []
        for (let i = pagemin; i <= pagemax; i++) {
            let f = await axios.get('https://www.realnetpro.com/main.php?method=estate&display=building&page=' + i, {
                headers: {
                    "cookie": cookie,
                    'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.69',
                    "origin": 'https://www.realnetpro.com'
                }
            });

            if (f.data) {

                let $ = cheerio.load(f.data, { decodeEntities: false, xmlMode: true, lowerCaseTags: true });
                let list = $('.main_contents .one_building')
                if (list) {

                    for (let element of list) {
                        let name = $(element).find('.building_info .building_name').text()

                        let data = $(element).find('.building_info > div:nth-child(2)').text().trim()

                        let address = ''
                        let line = ''

                        let rooms = $(element).find('.room_info_tr')
                        let real_id = "";
                        if (rooms) {
                            for (let el of rooms) {
                                real_id = $(el).find('.browsing_date').attr('id')
                                break;
                            }
                        }
                        if (real_id) {
                            {
                                let el = {
                                    name: name ? name.trim() : '',
                                    real_id: real_id,
                                    address: address ? address.trim() : '',
                                    line: line ? line.trim() : '',
                                }
                                arr.push(el)
                            }
                        }


                    }
                } else {
                    console.log('break list', i)
                    break;

                }
            } else {
                console.log('break list 2', i)
                break;
            }

            await delay(1000)
        }
        if (arr.length == 0) {
            return res.json({
                status: false, msg: "error", code: 600, data: []
            })
        }

        let time = name;
        const exp4 = JSON.stringify({
            data: arr,
            cookie,
            pagemin,
            pagemax,
            time: time
        }, null, 4);
        fs.writeFileSync(`./output/json/${time}.json`, exp4)

        return res.json({
            status: true,
            msg: "success",
            code: 0,
            data: arr,
            name: time
        })

    } catch (e) {
        console.log('loi ', e)
        res.json({
            status: false, msg: "error", code: 700, data: e
        })
    }
    console.log('end')


})
let Bearer_village = ""
let resigon = require('./json.json')
app.get('/quanly/test', async (req, res) => {
    let total = 0
    let error = false
    let count = 0
    console.log('bat dau crawl ')
    try {
        res.json({
            status: true,
            msg: "success",
            code: 0,
            data: [],
        })
        let token = await axios.get('https://edge.microsoft.com/translate/auth', {
            headers: { "content-type": "text/plain" }
        })

        if (token.status == 200) {
            Bearer_village = token.data
        }
        for (let city of resigon.prefectures) {

            let id = city.id;
            let list = citys.cities.filter(e => id == e.pid)
            let ids = list.map(e => e.id)
            let query = "type=City&codes=" + ids.toString().replaceAll(',', "+")
            console.log('hh ', id)
            for (let i = 1; i <= 5; i++) {
                //
                let data = await axios.post('https://www.villagehouse.jp/vhmserverapi.PropertyListService/GetListContent', {
                    filters: {},
                    lang: 0,
                    limit: 20,
                    list_type: {
                        cities: {
                            ids: ids
                        }
                    },
                    query: query,
                    offset: 0 + (i - 1) * 20,
                    sortBy: 0

                })
                if (data.status == 200 && data.data && data.data.content) {
                    let content = '<div class="mainchinh">' + data.data.content + '</div>'
                    let has_more = data.data.has_more ?? false
                    let $ = cheerio.load(content, { decodeEntities: false, xmlMode: true, lowerCaseTags: true });
                    let list = $('.mainchinh > li.container-search-cards-community')
                    let arr = []
                    for (let element of list) {
                        let status = $(element).find('.container-search-cards-community-wrap .container-search-cards-community-right .container-search-cards-community-status b').text()
                        if (status == '空室あり') {
                            let link = $(element).find('.container-search-cards-community-wrap .container-search-cards-community-right a').attr('href')
                            // arr.push(link)
                            let url = 'https://www.villagehouse.jp' + link;
                            let check_ =  await db('building2').where('web', url).first()
                            if (check_) {
                                console.log('da them')
                                // const createdAtDate = new Date(check_.created_at);

                                // // Tạo đối tượng Date cho ngày hiện tại
                                // const currentDate = new Date();

                                // // Tạo đối tượng Date cho 7 ngày trước
                                // const sevenDaysAgo = new Date();
                                // sevenDaysAgo.setDate(currentDate.getDate() - 7);
                                // const isWithinLastSevenDays = createdAtDate >= sevenDaysAgo
                                continue

                            }
                           
                            let result = await crawlNha_village(url)
                          
                            if (result.code == 700) {
                                count++
                            }
                            await delay(1000)
                          
                        }
                    }
                    if (!has_more) {
                        break
                    }
                } else {
                    break
                }
            }
            if (count >= 2) {
                break
            }


        }
    } catch (e) {
        error = true
        console.log('looi  ', e)
    }

})
async function crawler3(urls) {
    let result = await axios.get(urls)
    let $ = cheerio.load(result.data, { decodeEntities: false, xmlMode: true, lowerCaseTags: true });
    // Extract data from the page using cheerio.
    const house_id = $('.container-instance.container-showcase').attr(
        'data-property-id',
    );

    const title = $('title').text().trim();

    const name = $('h1.container-showcase-heading').text().trim();
    const address = $('.container-showcase-subheading .element-address')
        .text()
        .trim();
    const images = JSON.stringify(
        $('.container-gallery-data')
            .map((_, elem1) => {
                return $(elem1)
                    .find('img')
                    .map((__, elem2) => $(elem2).attr('data-src'))
                    .get();
            })
            .get(),
    );

    // traffic
    const traffic_info = JSON.stringify(
        $('.container-information-traffic-left li')
            .map((_, elem) => {
                return {
                    label: $(elem)
                        .find('.container-information-list-heading')
                        .text()
                        .trim(),
                    value: $(elem)
                        .find('.container-information-list-annotation')
                        .text()
                        .trim(),
                };
            })
            .get(),
    );

    const traffic_map = $('.container-information-traffic-right-map img').attr('data-src');
    // const traffic_map2 = $('.container-information-traffic-right-map img').attr('data-src');

    const traffic_coordinates_map = JSON.stringify(
        new URL(traffic_map).searchParams.get('center')?.split(','),
    );

    // house information
    const houseInfoElem = $('.container-information-summary-item');
    const information = JSON.stringify(
        $(houseInfoElem[0])
            .find('.container-information-list li')
            .map((index, elem) => $(elem).text().trim())
            .get(),
    );

    const public_services = JSON.stringify(
        $(houseInfoElem[1])
            .find('.container-information-list li')
            .map((index, elem) => {
                return {
                    label: $(elem)
                        .find('.container-information-list-heading')
                        .text()
                        .trim(),
                    value: $(elem)
                        .find('.container-information-list-annotation')
                        .map((index, elem) => $(elem).text().trim())
                        .get()
                        .join(', '),
                };
            })
            .get(),
    );

    const schools = JSON.stringify(
        $(houseInfoElem[2])
            .find('.container-information-list li')
            .map((index, elem) => {
                return {
                    label: $(elem)
                        .find('.container-information-list-heading')
                        .text()
                        .trim(),
                    value: $(elem)
                        .find('.container-information-list-annotation')
                        .map((index, elem) => $(elem).text().trim())
                        .get()
                        .join(', '),
                };
            })
            .get(),
    );

    // rooms
    const rooms = JSON.stringify(
        $('.container-rooms-group-card')
            .map((index, elem) => {
                // .match(/\d+/g)
                // const slot = $($(elem).find(".container-rooms-group-card-header-brief span")[0]).text().match(/\d+/g);

                return {
                    // tên phòng
                    name: $(elem).attr('data-name'),
                    // diện tích
                    size: `${$(elem).attr('data-size')}m²`,
                    // giá
                    price: `¥${$(elem).attr('data-rent')}`,
                    // phòng còn trống
                    slots: $(elem)
                        .find(
                            '.container-rooms-group-card-list-item .container-rooms-group-card-list-item-info',
                        )
                        .map((index, elem) => {
                            const slotInfo = $(elem).find(
                                '.container-rooms-group-card-list-item-info-property',
                            );

                            return {
                                // cho thuê
                                price: $($(slotInfo).find('dl dd')[0])
                                    .text()
                                    .trim(),

                                // diện tích
                                size: $($(slotInfo).find('dl dd')[1])
                                    .text()
                                    .trim(),

                                // phòng
                                room: $($(slotInfo).find('dl dd')[2])
                                    .text()
                                    .trim(),

                                // ngày xem phòng
                                date: $($(slotInfo).find('dl dd')[3])
                                    .text()
                                    .trim(),

                                features: $(elem)
                                    .find(
                                        '.container-rooms-group-card-list-item-info-feature dl',
                                    )
                                    .map((index, elem) =>
                                        $(elem).text().trim(),
                                    )
                                    .get(),
                            };
                        })
                        .get(),
                    // detail:
                };
            })
            .get(),
    );

    const phone_number = $(
        '.container-contact-bottom-telephone .container-contact-bottom-telephone-number',
    ).text();

    const result2 = {
        house_id,
        // url: request.url,
        name,
        address,
        images,

        traffic_info,
        traffic_map,
        traffic_coordinates_map,

        information,
        public_services,
        schools,
        rooms,
        phone_number,
        // crawled_at: new Date().toISOString(),
    };



    return result2;
};
async function crawlNha_village(url) {
    let check_cu = await db('building2').where('web', url).del()
    // console.log(url)
    let data = await crawler3(url)


    if (data && data.house_id && data.address && data.rooms) {
        let rooms = JSON.parse(data.rooms)
        if (Array.isArray(rooms)) {
            let traffic_info = JSON.parse(data.traffic_info)
            let trafic = ""
            for (let item of traffic_info) {
                trafic = trafic + item.label + " - " + item.value + '<br>'
            }
            let images = JSON.parse(data.images)
            let avt = images[0]

            let list_image = [...new Set(images)].toString()
            let traffic_coordinates_map = JSON.parse(data.traffic_coordinates_map)
            for (let item of rooms) {
                if (item.slots && item.slots.length > 0) {
                    let a = data.address + data.name + trafic
                    let arr = [{
                        Text: a
                    }]
                    let b = await dichchu(arr, Bearer_village)
                    let new_search = b[0].translations[0].text
                    let mau_crawl = {
                        address: data.address, // địa chỉ nhà
                        along_id: 0,  // ko cần thiết
                        area: item.size, // diện tích
                        city_id: 0, // ko cần thiết
                        date: "defaul",  // ko cần thiết
                        dau_xe: "",  // ko cần thiết
                        detail_id: data.house_id + 'VG' + item.name,   //"6985658RE", // ramdom số + ĐUôi web ví dụ VIL
                        gia_thong: trafic,
                        images: avt, // ảnh đại diện
                        khuyenmai: 0, // ko cần thiết
                        kieu_phong: item.name,
                        lat_map: traffic_coordinates_map[0],  // tọa độ trên map
                        long_map: traffic_coordinates_map[1],
                        line: "", // ko cần thiết
                        list_img_url: list_image,
                        nam_xay: "",
                        name: data.name, // tên khu nhà
                        phi_dich_vu: "",
                        phone: "",
                        price: item.price,
                        province_id: 27,
                        real_id: data.house_id,  // id bên web crawl
                        room_number: "", // số phòng tầng trong tòa nà
                        search_key: a + new_search, // tổng hợp địa chỉ , giao thông tên tòa nha để tìm key search
                        status: 1,
                        status_crawl: "create",  // trạng thái crawl 
                        thongtin_1: "village",
                        thongtin_2: "",
                        thongtin_3: "",
                        thongtin_4: "",
                        tien_coc: "",
                        tien_le: "",
                        toa_tang: "",
                        // updated_at: "2023-12-10T04:04:06.000Z",
                        web: url, //  link crawl
                    }
                 
                    await db('building2').insert(mau_crawl)
                    break
                }

            }
            return { tatus: true, msg: "success", code: 0 }

        } else {

            return { status: false, msg: "error", code: 700 }

        }

    } else {
        return { status: false, msg: "error", code: 700 }

    }

}

//https://www.villagehouse.jp/vi/thue/hokkaido/hokkaido/sapporo-shi-011002/sakuradai-1063/ 
app.get('/quanly/tesst2', async (req, res) => {
    // let list = citys.cities.filter(e => 23 == e.pid)
    // let ids = list.map(e => e.id)
    // let ids2 = [ids[0], ids[1]]
    // let query = "type=City&codes=" + ids2.toString().replaceAll(',', "+")

    // let data = await axios.post('https://www.villagehouse.jp/vhmserverapi.PropertyListService/GetListContent', {
    //     filters: {},
    //     lang: 1,
    //     limit: 20,
    //     list_type: {
    //         cities: {
    //             ids: ids2
    //         }
    //     },
    //     query: query,
    //     offset: 0,
    //     sortBy: 0

    // })

    let list = await db("building2").select('id', 'search_key').where('thongtin_1', 'village')
    for (let item of list) {
        let token = await axios.get('https://edge.microsoft.com/translate/auth', {
            headers: { "content-type": "text/plain" }
        })
        let Bearer = ''
        if (token.status == 200) {
            Bearer = token.data
        }
        let arr = [{
            Text: item.search_key
        }]


        let b = await dichchu(arr, Bearer)
        let new_search = b[0].translations[0].text
        await db('building2').update('search_key', item.search_key + new_search).where('id', item.id)

    }
    res.json({
        kq: 'ok'
    })
})
app.post('/quanly/crawl_villagehouse', async (req, res) => {

    let url = req.body.url
    if (url) {
        let check_cu = await db('building2').where('web', url).del()
        // console.log(url)
        let data3 = await crawler([url])
        let data = data3[0]

        if (data && data.house_id && data.address && data.rooms) {
            let rooms = JSON.parse(data.rooms)
            if (Array.isArray(rooms)) {
                let traffic_info = JSON.parse(data.traffic_info)
                let trafic = ""
                for (let item of traffic_info) {
                    trafic = trafic + item.label + " - " + item.value + '<br>'
                }
                let images = JSON.parse(data.images)
                let avt = images[0]

                let list_image = [...new Set(images)].toString()
                let traffic_coordinates_map = JSON.parse(data.traffic_coordinates_map)
                for (let item of rooms) {
                    if (item.slots && item.slots.length > 0) {

                        let mau_crawl = {
                            address: data.address, // địa chỉ nhà
                            along_id: 0,  // ko cần thiết
                            area: item.size, // diện tích
                            city_id: 0, // ko cần thiết
                            date: "defaul",  // ko cần thiết
                            dau_xe: "",  // ko cần thiết
                            detail_id: data.house_id + 'VG' + item.name,   //"6985658RE", // ramdom số + ĐUôi web ví dụ VIL
                            gia_thong: trafic,
                            images: avt, // ảnh đại diện
                            khuyenmai: 0, // ko cần thiết
                            kieu_phong: item.name,
                            lat_map: traffic_coordinates_map[0],  // tọa độ trên map
                            long_map: traffic_coordinates_map[1],
                            line: "", // ko cần thiết
                            list_img_url: list_image,
                            nam_xay: "",
                            name: data.name, // tên khu nhà
                            phi_dich_vu: "",
                            phone: "",
                            price: item.price,
                            province_id: 27,
                            real_id: data.house_id,  // id bên web crawl
                            room_number: "", // số phòng tầng trong tòa nà
                            search_key: data.address + data.name, // tổng hợp địa chỉ , giao thông tên tòa nha để tìm key search
                            status: 1,
                            status_crawl: "create",  // trạng thái crawl 
                            thongtin_1: "",
                            thongtin_2: "",
                            thongtin_3: "",
                            thongtin_4: "",
                            tien_coc: "",
                            tien_le: "",
                            toa_tang: "",
                            // updated_at: "2023-12-10T04:04:06.000Z",
                            web: url, //  link crawl
                        }

                        await db('building2').insert(mau_crawl)
                        break
                    }

                }
                res.json({
                    status: true,
                    msg: "success",
                    code: 0,
                    data: [],
                })
            } else {
                res.json({
                    status: false, msg: "error", code: 700
                })
            }

        } else {
            res.json({
                status: false, msg: "error", code: 700
            })
        }

    } else {
        res.json({
            status: false, msg: "error", code: 700
        })
    }
})

app.get('/', (req, res) => {
    res.redirect('/quanly');
})
app.get('/quanly', async (req, res) => {
    console.log('admin2')
    res.render('admin')
})
app.get('/quanly/*', async (req, res) => {
    console.log('admin')
    res.render('admin')
})


server.listen(config.SPort, function () {
    console.log("API Init Completed in Port " + config.SPort);

})
