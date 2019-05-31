<template>
    <div>
        <ImageList />
        <FocusToday />
        <div class="article">
            <!--<h2>最新文章</h2>-->
            <Article :items="articleData"></Article>
            <Pagination class="page"
                           @current-change="handleCurrentChange"
                           :page-size="$store.state.page.page_size"
                           layout="prev, pager, next, jumper"
                           :total="$store.state.article.total">
            </Pagination>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">

import Brand from '~/components/Brand.vue'
import ImageList from '~/components/ImageList.vue'
import Article from '~/components/Article.vue'
import axios from 'axios';
import FocusToday from '~/components/FocusToday.vue'
import {Pagination} from 'element-ui'
export default {
    async asyncData(content){


        let list = await axios.get(content.store.state.url.getIndexArticle,{
            params:{
                page:1,
                page_size:content.store.state.page.page_size,
                type:'web'
            }
        });


        return {articleData:list.data}
    },
    async fetch(content){

        if(content.params.type!=content.store.state.article.type){
            let total = await axios.get(content.store.state.url.getIndexTotal,{
                params:{
                    type:'web'
                }
            });
            content.store.commit('setArticleTotal',total.data);
            content.store.commit('setArticleType',content.params.type);
        }
    },
    data(){
        return {
            articleData:[]
        }
    },
  components: {
      Brand,Article,ImageList,FocusToday,Pagination
  },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.$router.push({name:'article-page',params:{page:val},query:{type:'web'}});
        }
    }
}


</script>

<style scoped>

.article{


    border-radius:4px;

    margin-top:20px;
}
.article h2{
    font-size:15px;
    color:rgb(161,161,161);
    padding-bottom:15px;
    border-bottom:1px solid rgba(161,161,161,0.5);
}

.page{
    padding-top:25px;
    text-align:center;
    font-weight:normal;
}





</style>

