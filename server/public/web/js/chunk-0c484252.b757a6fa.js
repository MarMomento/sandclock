(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c484252"],{"192c":function(t,e,a){"use strict";a.r(e);var c=a("7a23"),n={class:"container tag-detail-page py-3"},r={class:"row mb-5"},o={class:"col-12"},i={class:"row justify-content-center"},s={class:"col-7"},l={class:"col-2"},u={class:"d-flex flex-column"},b={class:"text-muted mb-2"},d={class:"text-muted"};function f(t,e,a,f,j,O){var g=Object(c["F"])("TagCard"),p=Object(c["F"])("ArticleTab"),v=Object(c["F"])("LoadMore");return Object(c["x"])(),Object(c["i"])("div",n,[Object(c["l"])("div",r,[Object(c["l"])("div",o,[t.tag?(Object(c["x"])(),Object(c["i"])(g,{key:0,tag:t.tag,isDetail:!0,onFollowTag:t.followTag},null,8,["tag","onFollowTag"])):Object(c["j"])("",!0)])]),Object(c["l"])("div",i,[Object(c["l"])("div",s,[Object(c["l"])(p,{isUnderTag:!0,currentTab:t.currentTab,tabs:t.tabs,articleList:t.articleList,onChangeTab:t.getLatest},null,8,["currentTab","tabs","articleList","onChangeTab"]),Object(c["l"])(v,{isLastPage:t.isLastPage,onLoadMore:t.loadMore},null,8,["isLastPage","onLoadMore"])]),Object(c["l"])("div",l,[Object(c["l"])("div",u,[Object(c["l"])("div",b," 已经发布 "+Object(c["J"])(t.tag&&t.tag.articles_count)+" 篇文章 ",1),Object(c["l"])("div",d," 已经有 "+Object(c["J"])(t.tag&&t.tag.followers_count)+" 用户关注 ",1)])])])])}var j=a("5530"),O=a("1da1"),g=(a("96cf"),a("99af"),a("4bf4")),p=a("6c02"),v=a("79f6"),m=a("581d"),y=a("f898"),w=a("a2c9"),x=a("6ff3"),h=Object(c["m"])({name:"TagDetail",components:{TagCard:g["a"],ArticleTab:y["a"],LoadMore:w["a"]},setup:function(){var t=Object(p["d"])(),e=Object(c["B"])({id:Object(c["C"])(t.params.id),currentTab:"",tabs:[{type:"week",text:"最近一周"},{type:"month",text:"最近一月"},{type:"year",text:"最近一年"}],articleList:[],tag:null}),a=Object(x["a"])({date:7,page:1,per_page:10,count:0},Object(O["a"])(regeneratorRuntime.mark((function t(){var a,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["l"])(e.id,{date:n.date,page:n.page+1,per_page:n.per_page});case 2:a=t.sent,c=a.data,e.articleList=e.articleList.concat(c.data),n.count=c.count;case 6:case"end":return t.stop()}}),t)})))),n=a.pagination,r=a.isLastPage,o=a.loadMore,i=function(){var t=Object(O["a"])(regeneratorRuntime.mark((function t(){var a,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["r"])(e.id);case 2:a=t.sent,c=a.data,e.tag=c;case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),s=Object(m["a"])(),l=s.followTheTag,u=function(){var t=Object(O["a"])(regeneratorRuntime.mark((function t(e,a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l(e,a);case 2:return t.next=4,i();case 4:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),b=function(){var t=Object(O["a"])(regeneratorRuntime.mark((function t(a){var c,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["l"])(e.id,a);case 2:c=t.sent,r=c.data,e.articleList=r.data,n.count=r.count;case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),d=function(t){switch(e.currentTab=t,n.page=1,t){case"week":n.date=7;break;case"month":n.date=30;break;case"year":n.date=365;break;default:break}b({date:n.date,page:n.page,per_page:n.per_page})};return Object(c["v"])((function(){i(),d("week")})),Object(c["s"])((function(){e.id=t.params.id,i(),d("week")})),Object(j["a"])(Object(j["a"])({},Object(c["K"])(e)),{},{followTag:u,getLatest:d,isLastPage:r,loadMore:o})}});h.render=f;e["default"]=h},"49fe":function(t,e,a){},"4bf4":function(t,e,a){"use strict";a("b0c0"),a("a4d3"),a("e01a");var c=a("7a23"),n=Object(c["T"])("data-v-02c11c35");Object(c["A"])("data-v-02c11c35");var r={class:"card-title fw-bolder tag-title"},o={class:"card-text"},i={class:"mt-auto"},s={class:"tag-detail text-muted"},l={class:"me-2"},u={class:"d-flex px-lg-4 py-lg-3"},b={class:"w-100 ms-4"},d={class:"card-title fw-bolder d-flex justify-content-between"},f={class:"text-dark fs-2"},j={class:"card-text col-12 col-md-8"};Object(c["y"])();var O=n((function(t,e,a,O,g,p){var v=Object(c["F"])("router-link"),m=Object(c["F"])("Card");return t.isDetail?(Object(c["x"])(),Object(c["i"])(m,{key:1,class:"tag-card tag-detail-card"},{header:n((function(){return[Object(c["l"])("div",{class:"tag-color-bar",style:{backgroundColor:t.color}},null,4)]})),text:n((function(){return[Object(c["l"])("div",u,[t.tag.avatar_url?(Object(c["x"])(),Object(c["i"])("img",{key:0,class:"tag-icon",src:t.tag.avatar_url},null,8,["src"])):Object(c["j"])("",!0),Object(c["l"])("div",b,[Object(c["l"])("h5",d,[Object(c["l"])("span",f,"#"+Object(c["J"])(t.tag.name),1),Object(c["l"])("button",{type:"button",class:["btn  px-4 mt-auto",t.isFollowing?"btn-secondary":"btn-outline-secondary"],onClick:e[2]||(e[2]=function(e){return t.followTag(t.tag)})},Object(c["J"])(t.isFollowing?"已关注":"关注"),3)]),Object(c["l"])("p",j,Object(c["J"])(t.tag.description),1)])])]})),_:1})):(Object(c["x"])(),Object(c["i"])(m,{key:0,class:"tag-card"},{header:n((function(){return[Object(c["l"])("div",{class:"tag-color-bar",style:{backgroundColor:t.color}},null,4)]})),title:n((function(){return[t.tag.avatar_url?(Object(c["x"])(),Object(c["i"])("img",{key:0,class:"tag-icon position-absolute end-0 bottom-0",src:t.tag.avatar_url},null,8,["src"])):Object(c["j"])("",!0),Object(c["l"])("h5",r,[Object(c["l"])(v,{class:"text-decoration-none text-dark",to:"/tag/".concat(t.tag._id)},{default:n((function(){return[Object(c["k"])("#"+Object(c["J"])(t.tag.name),1)]})),_:1},8,["to"])])]})),text:n((function(){return[Object(c["l"])("p",o,Object(c["J"])(t.tag.description),1)]})),action:n((function(){return[Object(c["l"])("div",i,[Object(c["l"])("p",s,[Object(c["l"])("small",l," 已发表 "+Object(c["J"])(t.tag.articles_count)+" 篇文章 ",1),Object(c["l"])("small",null," 已有 "+Object(c["J"])(t.tag.followers_count)+" 人关注 ",1)]),Object(c["l"])("button",{type:"button",class:["btn  px-4 mt-auto",t.isFollowing?"btn-secondary":"btn-outline-secondary"],onClick:e[1]||(e[1]=function(e){return t.followTag(t.tag)})},Object(c["J"])(t.isFollowing?"已关注":"关注"),3)])]})),_:1}))})),g=(a("caad"),a("2532"),a("67c0")),p=a("5502"),v=a("12f9"),m=Object(c["m"])({name:"TagCard",components:{Card:v["a"]},props:{isDetail:{type:Boolean,default:!1},tag:{type:Object,required:!0}},emits:["follow-tag"],setup:function(t,e){var a=e.emit,n=Object(g["a"])(),r=Object(p["b"])(),o=Object(c["g"])((function(){return r.state.user})),i=Object(c["g"])((function(){return!!o.value.info&&o.value.info.following_tags.includes(t.tag._id)})),s=function(t){a("follow-tag",i.value,t)};return{color:n,isFollowing:i,followTag:s}}});a("f06a");m.render=O,m.__scopeId="data-v-02c11c35";e["a"]=m},"52f2":function(t,e,a){},"581d":function(t,e,a){"use strict";var c=a("1da1"),n=(a("96cf"),a("5502")),r=a("6c02"),o=a("565a"),i=a("0ef5"),s=a("7a23"),l=a("79f6"),u=function(){var t=Object(r["e"])(),e=Object(n["b"])(),a=Object(s["g"])((function(){return e.state.user})),u=function(){var n=Object(c["a"])(regeneratorRuntime.mark((function c(n,r){var s,u,b,d;return regeneratorRuntime.wrap((function(c){while(1)switch(c.prev=c.next){case 0:if(a.value.isLogin){c.next=3;break}return t.push("/login"),c.abrupt("return");case 3:if(c.prev=3,!n){c.next=12;break}return c.next=7,Object(l["D"])(r._id);case 7:s=c.sent,u=s.status,204===u&&Object(o["a"])({type:"success",message:"取消关注成功"}),c.next=17;break;case 12:return c.next=14,Object(l["v"])(r._id);case 14:b=c.sent,d=b.status,204===d&&Object(o["a"])({type:"success",message:"关注成功"});case 17:e.dispatch(i["a"].FETCH_CURRENT_USER),c.next=22;break;case 20:c.prev=20,c.t0=c["catch"](3);case 22:case"end":return c.stop()}}),c,null,[[3,20]])})));return function(t,e){return n.apply(this,arguments)}}();return{followTheTag:u}};e["a"]=u},"6ff3":function(t,e,a){"use strict";var c=a("1da1"),n=(a("96cf"),a("7a23")),r=function(t,e){var a=Object(n["B"])(t),r=Object(n["g"])((function(){return a.page>=Math.ceil(a.count/a.per_page)})),o=function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e();case 2:a.page++;case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{pagination:a,isLastPage:r,loadMore:o}};e["a"]=r},a2c9:function(t,e,a){"use strict";var c=a("7a23"),n={class:"load-more d-flex justify-content-center my-2"},r={key:0,class:"text-muted"};function o(t,e,a,o,i,s){return Object(c["x"])(),Object(c["i"])("div",n,[t.isLastPage?(Object(c["x"])(),Object(c["i"])(c["a"],{key:0},[t.isLastPage?(Object(c["x"])(),Object(c["i"])("small",r,"已经到底啦~~~")):Object(c["j"])("",!0)],64)):(Object(c["x"])(),Object(c["i"])("button",{key:1,class:"btn btn-primary",onClick:e[1]||(e[1]=function(){return t.loadMore&&t.loadMore.apply(t,arguments)})},"加载更多"))])}var i=Object(c["m"])({name:"LoadMore",props:{isLastPage:{type:Boolean,required:!0}},emits:["load-more"],setup:function(t,e){var a=e.emit,c=function(){a("load-more")};return{loadMore:c}}});i.render=o;e["a"]=i},d55f:function(t,e,a){"use strict";var c=a("7a23");function n(t,e,a,n,r,o){return Object(c["x"])(),Object(c["i"])("div",{class:["tab",{"d-flex":"leftRight"===t.type}]},[Object(c["E"])(t.$slots,"menu"),Object(c["E"])(t.$slots,"content")],2)}var r=Object(c["m"])({name:"Tab",props:{type:{type:String,default:"topBottom"}}});r.render=n;e["a"]=r},d59a:function(t,e,a){"use strict";a("52f2")},e01a:function(t,e,a){"use strict";var c=a("23e7"),n=a("83ab"),r=a("da84"),o=a("5135"),i=a("861d"),s=a("9bf2").f,l=a("e893"),u=r.Symbol;if(n&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var b={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new u(t):void 0===t?u():u(t);return""===t&&(b[e]=!0),e};l(d,u);var f=d.prototype=u.prototype;f.constructor=d;var j=f.toString,O="Symbol(test)"==String(u("test")),g=/^Symbol\((.*)\)[^)]+$/;s(f,"description",{configurable:!0,get:function(){var t=i(this)?this.valueOf():this,e=j.call(t);if(o(b,t))return"";var a=O?e.slice(7,-1):e.replace(g,"$1");return""===a?void 0:a}}),c({global:!0,forced:!0},{Symbol:d})}},f06a:function(t,e,a){"use strict";a("49fe")},f898:function(t,e,a){"use strict";var c=a("7a23"),n=Object(c["T"])("data-v-21d8d714");Object(c["A"])("data-v-21d8d714");var r={class:"d-flex justify-content-between align-items-center mb-2"},o=Object(c["l"])("div",{class:"fw-bolder fs-5"},"最新文章",-1),i={class:"nav nav-tabs article-tabs"};Object(c["y"])();var s=n((function(t,e,a,s,l,u){var b=Object(c["F"])("ArticleCard"),d=Object(c["F"])("Tab");return Object(c["x"])(),Object(c["i"])(d,{class:"article-tab"},{menu:n((function(){return[Object(c["l"])("div",r,[o,Object(c["l"])("ul",i,[(Object(c["x"])(!0),Object(c["i"])(c["a"],null,Object(c["D"])(t.tabs,(function(e){return Object(c["x"])(),Object(c["i"])("li",{class:"nav-item",key:e.type},[Object(c["l"])("button",{class:["nav-link",{active:t.currentTab===e.type}],type:"button",onClick:function(a){return t.changeTab(e.type)}},Object(c["J"])(e.text),11,["onClick"])])})),128))])])]})),content:n((function(){return[(Object(c["x"])(!0),Object(c["i"])(c["a"],null,Object(c["D"])(t.articleList,(function(e,a){return Object(c["x"])(),Object(c["i"])(b,{key:e._id,showImg:!t.isUnderTag&&0===a,article:e,class:"mb-3",onCollectArticle:t.collectTheArticle},null,8,["showImg","article","onCollectArticle"])})),128))]})),_:1})})),l=a("d55f"),u=a("e3c1"),b=a("85bc"),d=Object(c["m"])({name:"ArticleTab",components:{Tab:l["a"],ArticleCard:u["a"]},props:{isUnderTag:{type:Boolean,default:!1},currentTab:{type:String,required:!0},tabs:{type:Object,required:!0},articleList:{type:Array,required:!0}},emits:["change-tab"],setup:function(t,e){var a=e.emit,c=Object(b["a"])(),n=c.collectTheArticle,r=function(e){t.currentTab!==e&&a("change-tab",e)};return{collectTheArticle:n,changeTab:r}}});a("d59a");d.render=s,d.__scopeId="data-v-21d8d714";e["a"]=d}}]);
//# sourceMappingURL=chunk-0c484252.b757a6fa.js.map