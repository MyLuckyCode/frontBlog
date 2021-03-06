
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

/*
localhost/ 这个地址是我本地的，如果你要测试可以使用
http://zhang97444.imwork.net/works/demo9/ 该地址为测试地址，可直接访问本站进行数据模拟
先访问看看是不是能打开，因为我现在是内网穿透，有时候电脑没开机
本站大量使用cookie缓存，如果修改模拟数据前台没有生效的话请删除cookie缓存
*/

let blogUrl = 'http://localhost/admin_blog/';    //博客后台地址
let blogApiUrl=blogUrl+'index.php?a=ajax&m=';           //博客后台API地址
let blogApiImageUrl=blogUrl+'index.php?a=images&uniqueId=';     //博客图片地址
let blogApiStaticImageUrl=blogUrl+'upload/clippingImages/';     //博客静态图片地址
const store = () => new Vuex.Store({
    state:{
        url:{
            blogUrl,
            blogApiImageUrl,
            blogApiStaticImageUrl,
            getIndexArticle:blogApiUrl+'getIndexArticle',
            getIndexTotal:blogApiUrl+'getIndexTotal',
            getArticleOne:blogApiUrl+'getArticleOne',
            getLabel:blogApiUrl+'getLabel',
            getHotArticle:blogApiUrl+'getHotArticle',
            getUpdateArticle:blogApiUrl+'getUpdateArticle',
            getWebNav:blogApiUrl+'getWebNav',
            setFabulous:blogApiUrl+'setFabulous',
            setReadCount:blogApiUrl+'setReadCount',
            getTime:blogApiUrl+'getTime',
            getTimeCount:blogApiUrl+'getTimeCount',
            getBrand:blogApiUrl+'getBrand',
            addComment:blogApiUrl+'addComment',
            getComment:blogApiUrl+'getComment',
            getWorks:blogApiUrl+'getWorks',
            getFocusArticle:blogApiUrl+'getFocusArticle',
            getConfig:blogApiUrl+'getConfig',
            setVisitCount:blogApiUrl+'setVisitCount',
            getTotal:blogApiUrl+'getTotal',
            getSearch:blogApiUrl+'getSearch',
            getSearchTotal:blogApiUrl+'getSearchTotal',
            commentFace:blogUrl+'face/'
        },
        caChe:true,
        article:{
            total:0,
            type:''
        },
        time:{
            total:0,
            page_size:8
        },
        page:{
            page_size:8
        },
        config:{}
    },
    mutations:{
        setArticleTotal(state,total){
            state.article.total=parseInt(total);
        },
        setArticleType(state,type){
            state.article.type=type;
        },
        setTimeTotal(state,total){
            state.time.total=parseInt(total);
        },
        setConfig(state,config){
            state.config=config;
        }
    }
});

//
//const store = () => new Vuex.Store({
//
//    state: {
//        counter: 0
//    },
//    mutations: {
//        increment (state) {
//            state.counter++
//        }
//    }
//})


export default store;










