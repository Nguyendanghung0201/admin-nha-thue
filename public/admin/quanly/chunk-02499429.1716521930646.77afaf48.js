(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02499429"],{"0d06":function(t,n,c){"use strict";c("1ed4")},"1ed4":function(t,n,c){},"9b33":function(t,n,c){"use strict";c("c10b")},c10b:function(t,n,c){},fa4a:function(t,n,c){"use strict";c.r(n);var a=function(){var t=this,n=t._self._c;return n("div",{staticClass:"nk-content nk-content-fluid pt-0"},[n("div",{staticClass:"container-xl wide-lg"},[n("div",{staticClass:"nk-content-body"},[n("div",{staticClass:"content-page wide-md m-auto"},[n("div",{staticClass:"nk-block"},[n("div",{staticClass:"card card-bordered"},[n("div",{staticClass:"card-inner p-sm-5"},[t._m(0),n("div",{staticClass:"form-group"}),n("div",{staticClass:"form-group"},[n("button",{staticClass:"btn btn-lg btn-primary",on:{click:function(n){return t.crawldulieu_list_nha()}}},[t._v("Bắt đầu crawl")])])])])])])])])])},i=[function(){var t=this,n=t._self._c;return n("div",{staticClass:"nk-block-head-content"},[n("h3",{staticClass:"nk-block-title py-1 px-4 fw-normal text-dark w-fit-content mx-sm-auto mx-0"},[t._v(" Crawl du lieu villagehouse")])])}],s={name:"Tool",metaInfo(){return{title:this.$t("menu.term_of_use")}},data(){return{url:""}},methods:{async crawldulieu_list_nha(){this.$confirm("Bạn có chắc chắn muốn crawl nhà ?","Vui lòng xác nhận",{icon:"warning",confirmButtonColor:"#1ee0ac",cancelButtonColor:"#d33",cancelButtonText:"hủy",confirmButtonText:"chắc chắn"}).then(async({value:t})=>{if(t){let t=await this.$store.dispatch("Home/crawl_village");t.success?this.$awnSuccess("Crawl nhà thành công"):this.$alert("lỗi hãy thực hiện lại")}})}},mounted(){}},e=s,l=(c("9b33"),c("0d06"),c("2877")),o=Object(l["a"])(e,a,i,!1,null,"72bc7cca",null);n["default"]=o.exports}}]);