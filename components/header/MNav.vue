<template>
    <div class="m_nav" @touchmove.prevent>

        <ul>
            <li><nuxt-link :to="{name:'index'}" exact :class="[urlName=='index' ? 'active' : '']"> 首页</nuxt-link></li>
            <li class="web">
                <nuxt-link :to="{name:'article-page',params:{page:1}}" exact :class="[urlName=='web' ? 'active' : '']">前端开发 <i class="icon-10 iconfont">&#xe65e;</i></nuxt-link>
                <ul>
                    <li v-for="(item,index) in web_list" :key="index"><nuxt-link :to="item.url">{{item.name}}</nuxt-link></li>
                </ul>
            </li>
            <li><nuxt-link :to="{name:'works'}" exact :class="[urlName=='works' ? 'active' : '']">个人案例</nuxt-link></li>
            <li><nuxt-link :to="{name:'timemachine-page'}" exact :class="[urlName=='timemachine-page' ? 'active' : '']">时光机</nuxt-link></li>
            <li><nuxt-link :to="{name:'article-page',params:{page:1},query:{type:'life',title:'生活随笔'}}" exact :class="[urlName=='life' ? 'active' : '']">生活随笔</nuxt-link></li>
            <li><a href="http://www.xinhuanet.com/politics/xxjxs/" target="_blank">学<span class="xijinp">习</span>进行时</a></li>
            <li><nuxt-link :to="{name:'about'}" exact :class="[urlName=='about' ? 'active' : '']">关于博主</nuxt-link></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">

    import axios from 'axios';
    import Cookie from '~/common/cookie.js';
    export default{
        data(){
            return {
                indexActiveFlag:true,
                web_item_flag:false,
                web_list:[]
            }
        },
        methods:{


        },
        computed:{
            urlName(){
                let name=this.$route.name;

                if(name=='article-page'){
                    if(this.$route.query.type=='life'){
                        name='life';
                    }else {
                        name='web';
                    }
                }
                return name;
            }
        },
        mounted(){
            let caChe = this.$store.state.caChe;
            if(Cookie.is('web_nav') && caChe){
                this.web_list=JSON.parse(Cookie.get('web_nav'));
            }else {
                axios.get(this.$store.state.url.getWebNav).then((res)=>{
                    let list=res.data.map((item)=>{
                        item.url='/article/1?type='+item.id+'&title='+item.name
                        return item
                    });
                    Cookie.set('web_nav',JSON.stringify(list));
                    this.web_list=list ;
                });
            }

        }

    }
</script>

<style scoped>


    @import "@/assets/css/basic.css";
    .xijinp{
        font-family: xi;
        font-size:20px;
        padding:2px;
        font-weight:bold;
    }

    .m_nav{
        display: none;
        width:160px;
        padding-top:50px;
        padding-right:20px;
        height:100%;
        background:var(--colorActive);
        position:fixed;
        top:0;
        left:0;
        z-index: 12;
        transition:0.5s;
        transform: translateX(-161px);
    }

    .m_nav > ul > li{

        margin-left:10px;
        font-size:14px;
        color:rgba(255,255,255,0.8);
        padding:0.18rem 0;
        border-bottom:1px solid rgba(255,255,255,0.4);
    }
    .m_nav > ul > li > ul > li{
        margin-top:8px;
        height:20px;
        padding:0.06rem 0;
        margin-left:10px;
    }
    .m_nav ul li a{
        display:inline-block;
        text-decoration: none;
        &.active{color:#fff;font-weight:bold;}
    }

    @media screen and (max-width:992px ){
        .m_nav{
            display: block;
        }
    }


</style>
