
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const fs = require('fs')
const cors = require('cors');
var http = require('http');
var axios = require('axios');
const app = express();
const device = require('express-device');
const requestIp = require('request-ip');
const session = require('express-session');
require('./app/cors/global');
var randomstring = require("randomstring");

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
app.post('/getinfor_file', [middleware.verifyToken, middleware.checkadmin], async (req, res) => {

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

app.post('/getdetail', async (req, res) => {
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
            // await db('building2').delete().where('detail_id', id)
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
app.post('/getlist_home', async (req, res) => {

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
app.post('/quanly/crawl_villagehouse', async (req, res) => {
    let url = req.body.url
    if (url) {
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
                let list_image = images.toString()
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
