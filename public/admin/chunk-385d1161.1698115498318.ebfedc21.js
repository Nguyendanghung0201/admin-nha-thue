(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-385d1161"],{2999:function(t,s,a){},"323ea":function(t,s,a){"use strict";a("e83b")},"5b82":function(t,s,a){"use strict";a.r(s);var n=function(){var t=this,s=t._self._c;return s("div",{staticClass:"nk-content nk-content-fluid pt-0"},[s("div",{staticClass:"container-xl wide-lg"},[t._m(0),s("div",{staticClass:"nk-block"},[s("div",{staticClass:"nk-block-head nk-block-head-sm"},[s("div",{staticClass:"nk-block-between"},[t._m(1),s("div",{staticClass:"nk-block-head-content"},[s("div",{staticClass:"toggle-wrap nk-block-tools-toggle"},[t._m(2),s("div",{staticClass:"toggle-expand-content",attrs:{"data-content":"pageMenu"}},[s("ul",{staticClass:"nk-block-tools g-3"},[t._m(3),s("li",[s("div",{staticClass:"drodown"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.masonha,expression:"masonha"}],attrs:{placeholder:"Them thanh pho"},domProps:{value:t.masonha},on:{input:function(s){s.target.composing||(t.masonha=s.target.value)}}})])]),s("li",{staticClass:"nk-block-tools-opt"},[t._m(4),s("a",{staticClass:"toggle btn btn-primary d-none d-md-inline-flex",attrs:{href:"#","data-target":"addProduct"},on:{click:function(s){return t.timkiemnha()}}},[s("em",{staticClass:"icon ni ni-plus"}),s("span",[t._v("Thêm thành phố")])])])])])])])])]),s("div",{staticClass:"nk-block"},[s("div",{staticClass:"card card-bordered"},[s("div",{staticClass:"card-inner-group"},[s("div",{staticClass:"card-inner p-0"},[s("div",{staticClass:"nk-tb-list"},[t._m(5),t._l(t.cityOptions,(function(a,n){return s("div",{key:n,staticClass:"nk-tb-item"},[t._m(6,!0),s("div",{staticClass:"nk-tb-col tb-col-sm"},[s("span",{staticClass:"tb-product"},[s("span",{staticClass:"title"},[t._v(t._s(a.id))])])]),s("div",{staticClass:"nk-tb-col"},[s("span",{staticClass:"tb-sub"},[t._v(t._s(a.name))])]),s("div",{staticClass:"nk-tb-col"},[s("span",{staticClass:"tb-lead"},[t._v(t._s(a.code))])]),s("div",{staticClass:"nk-tb-col"},[s("input",{directives:[{name:"model",rawName:"v-model",value:a.name2,expression:"item.name2"}],attrs:{placeholder:a.name},domProps:{value:a.name2},on:{input:function(s){s.target.composing||t.$set(a,"name2",s.target.value)}}})]),t._m(7,!0),s("div",{staticClass:"nk-tb-col nk-tb-col-tools"},[s("ul",{staticClass:"nk-tb-actions gx-1 my-n1"},[s("li",{staticClass:"mr-n1"},[s("div",{staticClass:"dropdown"},[t._m(8,!0),s("div",{staticClass:"dropdown-menu dropdown-menu-right"},[s("ul",{staticClass:"link-list-opt no-bdr"},[s("li",{on:{click:function(s){return t.change(a.id,a.name2)}}},[t._m(9,!0)]),s("li",{on:{click:function(s){return t.deleteCty(a.detail_id)}}},[t._m(10,!0)]),s("li",{on:{click:function(s){return t.listnha(a.id,a.name)}}},[t._m(11,!0)])])])])])])])])}))],2)])])])])])])])},i=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"nk-content-body"},[s("div",{staticClass:"nk-block-head nk-block-head-sm"},[s("div",{staticClass:"nk-block-between flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start justify-content-sm-between"},[s("div",{staticClass:"nk-block-head-content"},[s("h3",{staticClass:"nk-block-title page-title"},[t._v(" Danh sách thành phố trong khu vực Nhật Bản ")]),s("div",{staticClass:"nk-block-des text-soft"})])])]),s("div",{staticClass:"d-md-flex d-none nk-block-head nk-block-head-sm d-flex justify-content-end"}),s("div",{staticClass:"d-md-none d-block nk-block-head nk-block-head-sm d-flex justify-content-end"}),s("div",{staticClass:"nk-block"},[s("h3")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"nk-block-head-content"},[s("h3",{staticClass:"nk-block-title page-title"},[t._v("Danh sách nhà")])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"btn btn-icon btn-trigger toggle-expand mr-n1",attrs:{href:"#","data-target":"pageMenu"}},[s("em",{staticClass:"icon ni ni-more-v"})])},function(){var t=this,s=t._self._c;return s("li",[s("div",{staticClass:"form-control-wrap"},[s("div",{staticClass:"form-icon form-icon-right"},[s("em",{staticClass:"icon ni ni-search"})]),s("input",{staticClass:"form-control",attrs:{type:"text",id:"default-04",placeholder:"Tìm kiếm nhà bằng mã"}})])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"toggle btn btn-icon btn-primary d-md-none",attrs:{href:"#","data-target":"addProduct"}},[s("em",{staticClass:"icon ni ni-plus"})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"nk-tb-item nk-tb-head"},[s("div",{staticClass:"nk-tb-col nk-tb-col-check"},[s("div",{staticClass:"custom-control custom-control-sm custom-checkbox notext"},[s("input",{staticClass:"custom-control-input",attrs:{type:"checkbox",id:"pid"}}),s("label",{staticClass:"custom-control-label",attrs:{for:"pid"}})])]),s("div",{staticClass:"nk-tb-col tb-col-sm"},[s("span",[t._v("Id")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("Tên thành phố")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("code")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("Nhập tên muốn sửa")])]),s("div",{staticClass:"nk-tb-col tb-col-md"},[s("em",{staticClass:"tb-asterisk icon ni ni-star-round"})]),s("div",{staticClass:"nk-tb-col nk-tb-col-tools"},[s("ul",{staticClass:"nk-tb-actions gx-1 my-n1"},[s("li",{staticClass:"mr-n1"},[s("div",{staticClass:"dropdown"},[s("a",{staticClass:"dropdown-toggle btn btn-icon btn-trigger",attrs:{href:"#","data-toggle":"dropdown"}},[s("em",{staticClass:"icon ni ni-more-h"})]),s("div",{staticClass:"dropdown-menu dropdown-menu-right"},[s("ul",{staticClass:"link-list-opt no-bdr"},[s("li",[s("a",{attrs:{href:"#"}},[s("em",{staticClass:"icon ni ni-edit"}),s("span",[t._v("Sửa tên")])])]),s("li",[s("a",{attrs:{href:"#"}},[s("em",{staticClass:"icon ni ni-trash"}),s("span",[t._v("Xóa")])])])])])])])])])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"nk-tb-col nk-tb-col-check"},[s("div",{staticClass:"custom-control custom-control-sm custom-checkbox notext"},[s("input",{staticClass:"custom-control-input",attrs:{type:"checkbox",id:"pid1"}}),s("label",{staticClass:"custom-control-label",attrs:{for:"pid1"}})])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"nk-tb-col tb-col-md"},[s("div",{staticClass:"asterisk tb-asterisk"},[s("a",{attrs:{href:"#"}},[s("em",{staticClass:"asterisk-off icon ni ni-star"}),s("em",{staticClass:"asterisk-on icon ni ni-star-fill"})])])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"dropdown-toggle btn btn-icon btn-trigger",attrs:{href:"#","data-toggle":"dropdown"}},[s("em",{staticClass:"icon ni ni-more-h"})])},function(){var t=this,s=t._self._c;return s("a",{attrs:{href:"#"}},[s("em",{staticClass:"icon ni ni-edit"}),s("span",[t._v("Sửa tên")])])},function(){var t=this,s=t._self._c;return s("a",{attrs:{href:"#"}},[s("em",{staticClass:"icon ni ni-trash"}),s("span",[t._v("Xóa")])])},function(){var t=this,s=t._self._c;return s("a",{attrs:{href:"javascript:void(0)"}},[s("em",{staticClass:"icon ni ni-check-round-cut"}),s("span",[t._v("Danh sách nhà")])])}],e=(a("14d9"),a("87ea")),c=a("bbca"),o=a("79fa"),l=a("57ed"),r={name:"Dashboard",data(){return{data:[],masonha:"",provice:null,proviceOptions:[],provice_name:null,cityOptions:[],thanhphomoi:""}},components:{NoData:c["a"],BootstrapSelect:l["a"]},mounted(){},computed:{lang(){return Object(e["e"])()}},methods:{timkiemnha(){this.masonha},addCity(){this.provice?this.thanhphomoi?this.$confirm(this.$i18n.t("home.title_change",{code:"name"}),o["a"].t("home.please_confirm"),{icon:"warning",confirmButtonColor:"#1ee0ac",cancelButtonColor:"#d33",cancelButtonText:o["a"].t("button.cancel"),confirmButtonText:o["a"].t("button.confirm")}).then(({value:t})=>{if(t){let t={mod:"add",data:{code:"0000",province_code:this.provice,name:this.thanhphomoi}};this.$store.dispatch("Home/addCity",t).then(t=>{0===t.code&&t.success}).catch(t=>{this.setFormError(t)}).finally(()=>{this.requestLoading=!1})}}):this.$awnAlert("Thêm tên thành phố"):this.$awnAlert(this.$t("dialog.miss_city"))},listnha(t,s){this.$router.push({name:"faq.index",query:{id:t,page:"1",type:"area",name:s}})},deleteCty(t){this.$confirm(this.$i18n.t("home.title_change",{code:"name"}),o["a"].t("home.please_confirm"),{icon:"warning",confirmButtonColor:"#1ee0ac",cancelButtonColor:"#d33",cancelButtonText:o["a"].t("button.cancel"),confirmButtonText:o["a"].t("button.confirm")}).then(({value:s})=>{if(s){let s={mod:"delete",id:t};this.$store.dispatch("Home/deleteCity",s).then(s=>{0===s.code&&s.success&&(this.cityOptions=this.cityOptions.filter(s=>s.id!=t))}).catch(t=>{this.setFormError(t)}).finally(()=>{this.requestLoading=!1})}})}},watch:{},metaInfo(){return{title:this.$t("menu.dashboard")}}},d=r,m=(a("323ea"),a("f19c"),a("2877")),h=Object(m["a"])(d,n,i,!1,null,"f14e4c9a",null);s["default"]=h.exports},e83b:function(t,s,a){},f19c:function(t,s,a){"use strict";a("2999")}}]);