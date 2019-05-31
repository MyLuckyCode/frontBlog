<template>
    <div class="total">
        <div class="header">
            <span class="icon"><i class="icon-18 iconfont">&#xe611;</i></span>
            <h2 class="title">站点统计</h2>
        </div>
        <div class="items">
            <div class="left">
                <p>标签：{{total.label}}</p>
                <p>页面：{{total.page}}个</p>
                <p>分类：{{total.nav}}个</p>
                <p>总访问量：{{total.visit}}</p>
            </div>
            <div class="right">
                <p>文章：{{total.article}}篇</p>
                <p>评论：{{total.comment}}条</p>
                <p>最后更新：{{total.lastDate|formatDate}}</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import {formatDate} from '~/common/date.js'
    import Cookie from '~/common/cookie.js';
    export default{
        data(){
            return {
                total:{}
            }
        },
        async created(){
            let caChe = this.$store.state.caChe;
            if(Cookie.is('total') && caChe){
                let data=JSON.parse(Cookie.get('total'));
               this.total=data[0];
            }else {
                axios.get(this.$store.state.url.getTotal).then((res)=>{
                    Cookie.set('total',JSON.stringify(res.data));
                    this.total=res.data[0];
                })
            }
        },
        filters:{
            formatDate(time){
                let date=new Date(time);
                return formatDate(date,'YYYY-mm-dd');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/css/basic.scss";
    .total{
        background:#fff;
        border-radius:4px;
        border:1px solid #eaeaea;
    }
    .total .header{
        border-bottom:1px solid rgba(7,17,27,0.2);
        display: flex;
    }
    .total .header .icon{
        flex:0 0 40px;
        display:flex;
        justify-content: center;
        align-items: center;
        width:40px;
        height:40px;
        color:$colorActive;
        border-right:1px solid rgba(7,17,27,0.1);
    }
    .total .header .title{
        flex:1;
        display: flex;
        align-items: center;
        font-size:15px;
        padding-left:11px;
        font-weight:500;
        color:rgb(115,115,115);
    }
    .total .items{
        padding:5px 15px;
        display:flex;
        font-size:12px;
    }
    .total .items p{
        margin:10px 0;
        color:rgb(115,115,115);
    }
    .total .items .left{
        width:140px;
        flex:0 0 140px;
    }
    .total .items .right{
        flex:1;
    }
</style>
