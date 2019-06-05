<template>
    <div class="hot">
        <div class="header">
            <span class="icon"><i class="icon-18 iconfont">&#xe611;</i></span>
            <h2 class="title">热门文章</h2>
        </div>
        <div class="items" v-if="hot.length">
            <div class="item" v-for="(item,index) in hot" :key="index">
                <i>{{index+1}}</i>
                <nuxt-link :to="{name:'details-id',params:{id:item.id}}"><p>{{item.title}}</p></nuxt-link>
            </div>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Cookie from '~/common/cookie.js';
    export default{
        data(){
            return {
                hot:[]
            }
        },
        async created(){
            let caChe = this.$store.state.caChe;
            if(Cookie.is('hot') && caChe){
                this.hot=JSON.parse(Cookie.get('hot'));
            }else {
                axios.get(this.$store.state.url.getHotArticle).then((res)=>{
                    this.hot=res.data;
                    Cookie.set('hot',JSON.stringify(res.data));
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/css/basic.scss";
    .hot{
        background:#fff;
        border-radius:4px;
        border:1px solid #eaeaea;
    }
    .hot .header{
        border-bottom:1px solid rgba(7,17,27,0.2);
        display: flex;
    }
    .hot .header .icon{
        flex:0 0 40px;
        display:flex;
        justify-content: center;
        align-items: center;
        width:40px;
        height:40px;
        color:$colorActive;
        border-right:1px solid rgba(7,17,27,0.1);
    }
    .hot .header .title{
        flex:1;
        display: flex;
        align-items: center;
        font-size:15px;
        padding-left:11px;
        font-weight:500;
        color:rgb(115,115,115);
    }
    .hot .items{
        padding:5px 15px;
    }
    .hot .items .item{
        padding:10px 0;
    }
    .hot .items .item i{
        display:inline-block;
        width:20px;
        height:20px;
        line-height:20px;
        text-align:center;
        color:#fff;
        font-size:10px;
        border-radius:5px;
        background:rgb(204,204,204);
        font-style:normal;
        vertical-align:middle;
    }
    .hot .items .item p{
        display:inline-block;
        vertical-align:middle;
        width:280px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left:10px;
        color:rgb(115,115,115);
        font-size:15px;
        &:hover{
            color:$colorActive;
        }
    }

    .hot .items .item:nth-child(1) i{
        background:rgb(253,140,132);
    }
    .hot .items .item:nth-child(2) i{
        background:rgb(127,215,90);
    }
    .hot .items .item:nth-child(3) i{
        background:rgb(96,196,253);
    }
</style>
