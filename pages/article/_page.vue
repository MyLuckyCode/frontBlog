<template>
    <div class="article">


        <h2 v-if="$route.query.type==undefined || $route.query.type=='web' ">当前位置 &gt; 前端开发</h2>
        <h2 v-else>当前位置 &gt; <nuxt-link :to="{name:'article-page',params:{page:1},query:{type:'web'}}">前端开发</nuxt-link>&nbsp;&gt; {{$route.query.title}}</h2>

        <Article :items="articleData"></Article>
        <Pagination class="page"
                       @current-change="handleCurrentChange"
                       :page-size="$store.state.page.page_size"
                       layout="prev, pager, next, jumper"
                       :current-page="currentPage"
                       :total="$store.state.article.total">
        </Pagination>
    </div>
</template>

<script type="text/ecmascript-6">

    import Article from '~/components/Article.vue'
    import axios from 'axios';
    import {Pagination} from 'element-ui'
    export default {
        async asyncData(content){

            content.params.page = content.params.page==undefined ? '1' : content.params.page;
            content.query.type = content.query.type==undefined ? 'web' : content.query.type;
            let list = await axios.get(content.store.state.url.getIndexArticle,{
                params:{
                    page: content.params.page,
                    type: content.query.type,
                    page_size:content.store.state.page.page_size
                }
            });

            if(list.data.length==0) content.redirect('/error');
            return {articleData:list.data,position:content.query.type}

        },
        async fetch(content){

            content.params.page = content.params.page==undefined ? '1' : content.params.page;
            content.query.type = content.query.type==undefined ? 'web' : content.query.type;
            if(content.query.type!=content.store.state.article.type){
                let total = await axios.get(content.store.state.url.getIndexTotal,{
                    params:{
                        type:content.query.type
                    }
                });
                content.store.commit('setArticleTotal',total.data);
                content.store.commit('setArticleType',content.query.type);
            }
        },
        data(){
            return {
                articleData:[]
            }
        },
        created(){

        },
        watchQuery:true,
        components: {
            Article,Pagination
        },
        methods: {
            handleCurrentChange(val) {
                this.$router.push({name:'article-page',params:{page:val},query:{type:this.$route.query.type,title:this.$route.query.title}});
            }
        },
        computed:{
            currentPage(){
                return parseInt(this.$route.params.page);
            }
        }

    }

</script>

<style scoped>
    h2 .nuxt-link-active{
        &:hover{
            color:rgb(67,149,255);
        }
    }
    .article{

        /*background:#fff;*/
        /*border-radius:4px;*/
        /*padding:15px;*/
    }
    .article h2{
        font-size:15px;
        color:rgb(161,161,161);
        padding:5px 0;
        text-indent:5px;
        border:1px solid #ddd;
        /*background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#f5f5f5));*/
        background:#fff;
        display: flex;
        margin-bottom: 10px;
        border-radius: 4px;
    }

    .page{
        padding-top:25px;
        text-align:center;
        font-weight:normal;
    }

</style>

