(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9192d282"],{"9e2c":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"nk-content"},[e("label",{staticClass:"form-label",attrs:{for:"pay-amount"}},[t._v("danh sách ảnh ")]),e("div",{staticClass:"form-file"},[e("input",{staticClass:"form-file-input",attrs:{type:"file",id:"customFile"},on:{change:t.onChangeFileUpload}}),e("label",{staticClass:"form-file-label",attrs:{for:"customFile"}},[t._v("Thêm ảnh mới")])]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Ngôn ngữ")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.ngonngu,expression:"ngonngu"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.ngonngu=e.target.multiple?a:a[0]}}},[e("option",{attrs:{value:"vi"}},[t._v("Tiếng Việt")]),e("option",{attrs:{value:"en"}},[t._v("English")]),e("option",{attrs:{value:"jp"}},[t._v("Tiếng nhật")])])]),e("div",{staticClass:"form-group"},[e("label",{staticClass:"form-label",attrs:{for:"phone-no"}},[t._v("Submit")]),e("b-button",{attrs:{size:"lg",variant:"primary",block:"",type:"submit"},on:{click:t.showModal}},[t._v(" Upload ảnh ")])],1)])},s=[],o=a("bbca"),i=(a("79fa"),{name:"index",metaInfo(){return{title:"TÌm kiếm nhà"}},data(){return{ngonngu:"vi",masonha:"",data:[],loading:!1,image:""}},components:{NoData:o["a"]},mounted(){},methods:{async showModal(){if(this.image){await this.uploadFile(this.image)}else alert("chưa chọn ảnh")},async uploadFile(t){let e=new FormData;e.append("single",t),e.append("type",this.ngonngu);const a=this;return new Promise((n,s)=>{if(t.size>2097152)s({code:507});else{let t=new XMLHttpRequest;t.open("POST","http://samuraichintai.com/apiupload",!0),t.onreadystatechange=function(){if(4!==this.readyState&&n({code:0}),200!==this.status)n({code:0});else{const t=JSON.parse(this.responseText);t&&0==t.code?(a.$awnSuccess(a.$t("dialog.update_avatar_success")),n({code:0})):(507===t.code?a.$awnAlert(a.$t("message.size_too_big")):a.$awnAlert(a.$t("dialog.error")),s({code:500}))}},t.send(e)}})},async onChangeFileUpload(t){this.image=t.target.files[0]}},watch:{}}),l=i,r=(a("ecc7"),a("2877")),c=Object(r["a"])(l,n,s,!1,null,"6cbe3648",null);e["default"]=c.exports},b43f:function(t,e,a){},ecc7:function(t,e,a){"use strict";a("b43f")}}]);