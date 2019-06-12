
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);



let blogUrl = 'http://127.0.0.1/smarty/admin_blog/';    //博客后台地址
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










