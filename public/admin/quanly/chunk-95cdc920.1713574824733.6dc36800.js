(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-95cdc920"],{"0af6":function(t,s,a){},"78c5":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"nk-content"},[s("div"),s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"nk-content nk-content-fluid pt-0"},[s("div",{staticClass:"container-xl wide-lg"},[s("div",{staticClass:"nk-tb-list"},[t._m(0),t._l(t.data,(function(a,i){return t.data.length>0?s("div",{key:i,staticClass:"nk-tb-item"},[s("div",{staticClass:"nk-tb-col tb-col-sm"},[s("span",[t._v(t._s(a.detail_id))])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v(t._s(a.name))])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v(t._s(a.price)+" ")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v(t._s(a.area))])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v(t._s(a.address))])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v(t._s(a.web))])]),s("div",{staticClass:"nk-tb-col nk-tb-col-tools"},[s("ul",{staticClass:"nk-tb-actions gx-1 my-n1"},[s("li",{staticClass:"mr-n1"},[s("div",{staticClass:"dropdown"},[t._m(1,!0),s("div",{staticClass:"dropdown-menu dropdown-menu-right"},[s("ul",{staticClass:"link-list-opt no-bdr"},[s("li",{on:{click:function(s){return t.deleteCty(a.detail_id)}}},[t._m(2,!0)]),s("li",{on:{click:function(s){return t.chitiet(a.detail_id)}}},[t._m(3,!0)])])])])])])])]):t._e()})),t.loading?s("div",[s("NoData")],1):t._e()],2)])])])])},n=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"nk-tb-item nk-tb-head"},[s("div",{staticClass:"nk-tb-col tb-col-sm"},[s("span",[t._v("Id")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("Tên ngôi nhà")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("người thuê nhà")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("mã hợp đồng")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("Giá ")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("Diện tích")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("Địa chỉ")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("Web đã Craw")])]),s("div",{staticClass:"nk-tb-col"},[s("span",[t._v("xem chi tiết")])])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"dropdown-toggle btn btn-icon btn-trigger",attrs:{href:"#","data-toggle":"dropdown"}},[s("em",{staticClass:"icon ni ni-more-h"})])},function(){var t=this,s=t._self._c;return s("a",{attrs:{href:"javascript:void(0);"}},[s("em",{staticClass:"icon ni ni-trash"}),s("span",[t._v("Xóa")])])},function(){var t=this,s=t._self._c;return s("a",{attrs:{href:"javascript:void(0);"}},[s("em",{staticClass:"icon ni ni-edit"}),s("span",[t._v("Chi tiết")])])}],c=(a("14d9"),a("bbca")),e=a("79fa"),o={name:"index",metaInfo(){return{title:"TÌm kiếm nhà"}},data(){return{nha_type:1,masonha:"",data:[],loading:!1}},components:{NoData:c["a"]},mounted(){},methods:{chitiet(t){this.$router.push({path:"/quanly/nha-thue/detail/"+t})},deleteCty(t){this.$confirm(this.$i18n.t("home.title_change",{code:"name"}),e["a"].t("home.please_confirm"),{icon:"warning",confirmButtonColor:"#1ee0ac",cancelButtonColor:"#d33",cancelButtonText:e["a"].t("button.cancel"),confirmButtonText:e["a"].t("button.confirm")}).then(({value:s})=>{if(s){let s={mod:"delete",id:t};this.$store.dispatch("Home/deleteBuild",s).then(t=>{if(0===t.code&&t.success)return this.$alert("xoa thanh cong")}).catch(t=>{this.setFormError(t)}).finally(()=>{this.requestLoading=!1})}})},timkiemnha(){this.loading=!1,this.masonha&&this.$store.dispatch("Home/detailHome",{id:this.masonha}).then(t=>{t&&0===t.code&&t.success&&t.data?(this.data=[t.data],console.log(this.data)):this.loading=!0}).catch(t=>{this.setFormError(t)}).finally(()=>{})}},watch:{}},l=o,d=(a("fb7b"),a("2877")),r=Object(d["a"])(l,i,n,!1,null,"67119230",null);s["default"]=r.exports},fb7b:function(t,s,a){"use strict";a("0af6")}}]);