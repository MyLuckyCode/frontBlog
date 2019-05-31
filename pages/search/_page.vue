<template>
    <div class="article">

        <Article :items="articleData"></Article>
        <Pagination class="page"
                       @current-change="handleCurrentChange"
                       :page-size="$store.state.page.page_size"
                       layout="prev, pager, next, jumper"
                       :current-page="currentPage"
                       :total="count">
        </Pagination>
    </div>
</template>

<script type="text/ecmascript-6">

    import Article from '~/components/Article.vue'
    import axios from 'axios';
    import {Pagination} from 'element-ui'
    export default {
        async asyncData(content){
            console.log( content.query.s );
            if(content.query.s==undefined || content.query.s==''){
               content.app.router.push({name:'article-page'});
            }
            content.params.page = content.params.page==undefined ? '1' : content.params.page;
            let list = await axios.get(content.store.state.url.getSearch,{
                params:{
                    page: content.params.page,
                    s: content.query.s,
                    page_size:content.store.state.page.page_size
                }
            });

            if(list.data.count.length==0) content.redirect('/error');
            return {articleData:list.data.content,count:list.data.count}
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

        watchQuery:['s'],
        components: {
            Article,Pagination
        },
        methods: {
            handleCurrentChange(val) {
                this.$router.push({name:'search-page',params:{page:val},query:{s:this.$route.query.s}});
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

