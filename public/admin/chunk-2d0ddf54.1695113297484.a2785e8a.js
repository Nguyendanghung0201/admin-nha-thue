(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ddf54"],{8435:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"nk-content nk-content-fluid"},[e("div",{staticClass:"card card-bordered h-100"},[e("div",{staticClass:"card-inner"},[t._m(0),t.detailHome.address?e("div",[e("div",{staticClass:"row g-4"},[e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"full-name"}},[t._v("tên tiêu đề")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.name,expression:"detailHome.name"}],staticClass:"form-control",attrs:{type:"text",id:"full-name"},domProps:{value:t.detailHome.name},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"name",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"email-address"}},[t._v("Địa chỉ")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.address,expression:"detailHome.address"}],staticClass:"form-control",attrs:{type:"text",id:"email-address",placeholder:t.detailHome.address},domProps:{value:t.detailHome.address},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"address",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Giá ")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.price,expression:"detailHome.price"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.detailHome.price,id:"phone-no"},domProps:{value:t.detailHome.price},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"price",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Diện tích ")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.area,expression:"detailHome.area"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.detailHome.area,id:"phone-no"},domProps:{value:t.detailHome.area},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"area",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Trạm nhà Ga Thông tin")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.line,expression:"detailHome.line"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.detailHome.lat_map,id:"phone-no"},domProps:{value:t.detailHome.line},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"line",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Năm xây ")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.nam_xay,expression:"detailHome.nam_xay"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.detailHome.long_map,id:"phone-no"},domProps:{value:t.detailHome.nam_xay},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"nam_xay",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Vĩ độ ")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.lat_map,expression:"detailHome.lat_map"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.detailHome.lat_map,id:"phone-no"},domProps:{value:t.detailHome.lat_map},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"lat_map",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Kinh độ ")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.long_map,expression:"detailHome.long_map"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.detailHome.long_map,id:"phone-no"},domProps:{value:t.detailHome.long_map},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"long_map",e.target.value)}}})])])]),t.positon?e("div",[e("GmapMap",{staticStyle:{width:"100%",height:"600px"},attrs:{center:t.positon.position,zoom:13,"map-type-id":"terrain"}},[e("GmapMarker",{attrs:{position:t.positon.position,clickable:!0,draggable:!0,icon:"http://157.230.27.124:2021/favicon.png"},on:{click:function(e){t.center=t.positon.position}}})],1)],1):t._e()]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Khu vực")]),e("div",{staticClass:"form-control-wrap"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.province_id,expression:"detailHome.province_id"}],staticClass:"form-control",on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.detailHome,"province_id",e.target.multiple?a:a[0])},function(e){return t.onChange()}]}},t._l(t.proviceOptions,(function(a,o){return e("option",{key:o,domProps:{value:a.id}},[t._v(t._s(a.name))])})),0)])]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Thành phố")]),e("div",{staticClass:"form-control-wrap"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.city_id,expression:"detailHome.city_id"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.detailHome,"city_id",e.target.multiple?a:a[0])}}},t._l(t.cityOptions,(function(a,o){return e("option",{key:o,domProps:{value:a.id}},[t._v(t._s(a.name_en))])})),0)])]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Gần Tuyến tàu")]),e("div",{staticClass:"form-control-wrap"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.along_id,expression:"detailHome.along_id"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.detailHome,"along_id",e.target.multiple?a:a[0])}}},t._l(t.list_gatau,(function(a,o){return e("option",{key:o,domProps:{value:a.id}},[t._v(t._s(a.along_name_en))])})),0)])]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Khuyến mại")]),e("div",{staticClass:"form-control-wrap"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.khuyenmai,expression:"detailHome.khuyenmai"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.detailHome,"khuyenmai",e.target.multiple?a:a[0])}}},[t._l(t.list_khuyen_mai,(function(a,o){return e("option",{key:o,domProps:{value:a.id}},[t._v(t._s(a.content))])})),e("option",{attrs:{value:"0"}},[t._v("không có khuyến mại")])],2)])]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label"},[t._v("Kiểu phòng ")]),e("ul",{staticClass:"custom-control-group g-3 align-center"},[e("li",[e("div",{staticClass:"custom-control custom-control-sm custom-checkbox"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.kieu_phong,expression:"detailHome.kieu_phong"}],staticClass:"custom-control-input",attrs:{type:"radio",value:"1R",id:"com-email"},domProps:{checked:t._q(t.detailHome.kieu_phong,"1R")},on:{change:function(e){return t.$set(t.detailHome,"kieu_phong","1R")}}}),e("label",{staticClass:"custom-control-label",attrs:{for:"com-email"}},[t._v(" 1R")])])]),e("li",[e("div",{staticClass:"custom-control custom-control-sm custom-checkbox"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.kieu_phong,expression:"detailHome.kieu_phong"}],staticClass:"custom-control-input",attrs:{type:"radio",value:"1DK",id:"com-sms"},domProps:{checked:t._q(t.detailHome.kieu_phong,"1DK")},on:{change:function(e){return t.$set(t.detailHome,"kieu_phong","1DK")}}}),e("label",{staticClass:"custom-control-label",attrs:{for:"com-sms"}},[t._v(" 1K-1DK-1LDK")])])]),e("li",[e("div",{staticClass:"custom-control custom-control-sm custom-checkbox"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.kieu_phong,expression:"detailHome.kieu_phong"}],staticClass:"custom-control-input",attrs:{type:"radio",value:"3LDK",id:"com-phone"},domProps:{checked:t._q(t.detailHome.kieu_phong,"3LDK")},on:{change:function(e){return t.$set(t.detailHome,"kieu_phong","3LDK")}}}),e("label",{staticClass:"custom-control-label",attrs:{for:"com-phone"}},[t._v("2K-2DK-3LDK")])])]),e("li",[e("div",{staticClass:"custom-control custom-control-sm custom-checkbox"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.kieu_phong,expression:"detailHome.kieu_phong"}],staticClass:"custom-control-input",attrs:{type:"radio",value:"3DK",id:"com-phone-ld"},domProps:{checked:t._q(t.detailHome.kieu_phong,"3DK")},on:{change:function(e){return t.$set(t.detailHome,"kieu_phong","3DK")}}}),e("label",{staticClass:"custom-control-label",attrs:{for:"com-phone-ld"}},[t._v(" 3K-3DK-3LDK")])])])])]),e("div",{staticClass:"row g-4"},[e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("Giao Thông")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.gia_thong,expression:"detailHome.gia_thong"}],staticClass:"form-control",attrs:{type:"text",id:"pay-amount"},domProps:{value:t.detailHome.gia_thong},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"gia_thong",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("Đậu xe")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.dau_xe,expression:"detailHome.dau_xe"}],staticClass:"form-control",attrs:{type:"text",id:"pay-amount"},domProps:{value:t.detailHome.dau_xe},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"dau_xe",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("Tiền cọc")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.tien_coc,expression:"detailHome.tien_coc"}],staticClass:"form-control",attrs:{type:"text",id:"pay-amount"},domProps:{value:t.detailHome.tien_coc},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"tien_coc",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Tiền Lễ ")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.tien_le,expression:"detailHome.tien_le"}],staticClass:"form-control",attrs:{type:"text",placeholder:t.detailHome.long_map,id:"phone-no"},domProps:{value:t.detailHome.tien_le},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"tien_le",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("Tòa nhà ( Tầng)")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.room_number,expression:"detailHome.room_number"}],staticClass:"form-control",attrs:{type:"text",id:"pay-amount"},domProps:{value:t.detailHome.room_number},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"room_number",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("THông tin 1")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.thongtin_1,expression:"detailHome.thongtin_1"}],staticClass:"form-control",attrs:{type:"text",id:"pay-amount"},domProps:{value:t.detailHome.thongtin_1},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"thongtin_1",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("THông tin 2")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.thongtin_2,expression:"detailHome.thongtin_2"}],staticClass:"form-control",attrs:{type:"text",id:"pay-amount"},domProps:{value:t.detailHome.thongtin_2},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"thongtin_2",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("THông tin 3")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.thongtin_3,expression:"detailHome.thongtin_3"}],staticClass:"form-control",attrs:{type:"text",id:"pay-amount"},domProps:{value:t.detailHome.thongtin_3},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"thongtin_3",e.target.value)}}})])])]),e("div",{staticClass:"col-lg-6"},[e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("THông tin 4")]),e("div",{staticClass:"form-control-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.detailHome.thongtin_4,expression:"detailHome.thongtin_4"}],staticClass:"form-control",attrs:{type:"text",id:"pay-amount"},domProps:{value:t.detailHome.thongtin_4},on:{input:function(e){e.target.composing||t.$set(t.detailHome,"thongtin_4",e.target.value)}}})])])])]),e("div",[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("Ảnh đại diện")]),e("div",{staticClass:"form-control-wrap"},[e("img",{attrs:{src:t.detailHome.images}})]),t._m(1)]),e("div",{staticClass:"row g-gs"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("danh sách ảnh ")]),t._m(2),t._l(t.listimage,(function(a,o){return e("div",{key:o,staticClass:"col-sm-6 col-lg-4"},[e("img",{attrs:{src:a}}),e("div",{staticClass:"form-group"},[e("div",{staticClass:"form-control-wrap"},[e("li",{on:{click:function(e){return t.deleteImage(a)}}},[t._m(3,!0)])])])])}))],2),e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-lg btn-primary",on:{click:function(e){return t.saveBuild()}}},[t._v("Lưu lại")])])]):t._e()])])])},i=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"card-head"},[e("h5",{staticClass:"card-title"},[t._v("Thông tin căn nhà")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"customFileLabel"}},[t._v("Đổi ảnh")]),e("div",{staticClass:"form-control-wrap"},[e("div",{staticClass:"form-file"},[e("input",{staticClass:"form-file-input",attrs:{type:"file",id:"customFile"}}),t._v(" "),e("label",{staticClass:"form-file-label",attrs:{for:"customFile"}},[t._v("Đổi ảnh")])])])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-file"},[e("input",{staticClass:"form-file-input",attrs:{type:"file",id:"customFile"}}),t._v(" "),e("label",{staticClass:"form-file-label",attrs:{for:"customFile"}},[t._v("Thêm ảnh mới")])])},function(){var t=this,e=t._self._c;return e("a",{attrs:{href:"javascript:void(0);"}},[e("em",{staticClass:"icon ni ni-trash"}),e("span",[t._v("Xóa")])])}],s=a("87ea"),l=a("bbca"),n=a("79fa"),r=(a("ef08"),{name:"detailService",components:{},data(){return{change:!1,id:null,checked1:"",checked2:!0,checked3:!0,checked4:!0,listimage:[],detailHome:{},detailCopy:{},proviceOptions:[],list_gatau:[],cityOptions:[],list_khuyen_mai:[],data:[],positon:!1}},components:{NoData:l["a"]},mounted(){this.id=this.$route.params.id,this.id&&this.getinfor(),this.getlistProvince(),this.getListKhuyenmai()},methods:{onChange(t){this.getListCity(this.detailHome.province_id)},getinfor(){this.$store.dispatch("Home/detailHome",{id:this.id}).then(t=>{if(0===t.code&&t.success){this.detailHome=t.data,delete this.detailHome.mybuild,delete this.detailHome.created_at,delete this.detailHome.updated_at;let e=this.detailHome.list_img_url.split(",");this.listimage=e.filter(t=>t),this.detailHome.lat_map&&this.detailHome.long_map&&(this.positon={position:{lat:Number(this.detailHome.lat_map),lng:Number(this.detailHome.long_map)}},console.log(this.positon)),this.detailHome.province_id&&(this.getListCity(this.detailHome.province_id),this.getListNhaGa(this.detailHome.province_id))}}).catch(t=>{this.setFormError(t)}).finally(()=>{})},deleteImage(t){this.listimage=this.listimage.filter(e=>e!=t),this.change=!0},saveBuild(){this.$confirm(this.$i18n.t("home.title_change",{code:"name"}),n["a"].t("home.please_confirm"),{icon:"warning",confirmButtonColor:"#1ee0ac",cancelButtonColor:"#d33",cancelButtonText:n["a"].t("button.cancel"),confirmButtonText:n["a"].t("button.confirm")}).then(({value:t})=>{if(t){if(this.change){let t=this.listimage.toString();this.detailHome.list_img_url=t,delete this.detailHome.id}let t={mod:"update",data:this.detailHome,id:this.detailHome.id};this.$store.dispatch("Home/updateBuild",t).then(t=>{0===t.code&&t.success&&this.$awnSuccess("Thay đổi thành công")}).catch(t=>{this.setFormError(t)}).finally(()=>{})}})},getlistProvince(){this.$store.dispatch("Home/listProvice").then(t=>{0===t.code&&t.success&&(this.proviceOptions=t.data)}).catch(t=>{this.setFormError(t)}).finally(()=>{})},getListCity(t){let e={id:t};this.$store.dispatch("Home/listCity",e).then(t=>{0===t.code&&t.success&&(this.cityOptions=t.data)}).catch(t=>{this.setFormError(t)}).finally(()=>{})},getListNhaGa(t){let e={id:t};this.$store.dispatch("Home/listAlong",e).then(t=>{0===t.code&&t.success&&(this.list_gatau=t.data)}).catch(t=>{this.setFormError(t)}).finally(()=>{})},getListKhuyenmai(){this.$store.dispatch("Home/getlistKhuyenmai").then(t=>{0===t.code&&t.success&&(this.list_khuyen_mai=t.data)}).catch(t=>{this.setFormError(t)}).finally(()=>{})}},computed:{lang(){return Object(s["e"])()}},watch:{}}),m=r,c=a("2877"),d=Object(c["a"])(m,o,i,!1,null,"71d647fd",null);e["default"]=d.exports}}]);