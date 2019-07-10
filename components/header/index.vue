<template>
    <div>
        <div :class="['header',header_animate ? 'header_animate' : '']" :style="header_style">
            <div class="container">
                <div class="logo">
                    <img src="~/assets/img/logo.png">
                </div>

                <div class="mobile">
                    <div class="m_ment" @click="mAlertNav"><i class="iconfont">&#xe611;</i></div>
                    <div class="m_search" style="font-size:25px;">
                        <div class="m_search_c" :style="m_search_style">
                            <input type="search" v-model="search" @blur="searchBlur" @focus="searchFocus" placeholder="请输入关键字"><span :style="m_search_i_style"><i class="iconfont" style="font-size:18px;" @click="sendSearch">&#xe617;</i></span>
                        </div>
                    </div>
                </div>

                <div class="nav">
                    <ul>
                        <li><nuxt-link :to="{name:'index'}" exact :class="[urlName=='index' ? 'active' : '']"> <i class="icon-11 iconfont">&#xe651;</i>首页</nuxt-link></li>
                        <li class="web" @mouseenter ="web_item_flag=true" @mouseleave="web_item_flag=false" >
                            <nuxt-link :to="{name:'article-page',params:{page:1}}" exact :class="[urlName=='web' ? 'active' : '']">前端开发 <i class="icon-10 iconfont">&#xe65e;</i></nuxt-link>
                            <transition name="web">
                                <SubInsideNav class="web_item" :list="web_list" v-show="web_item_flag"></SubInsideNav>
                            </transition>
                        </li>
                        <li><nuxt-link :to="{name:'works'}" exact :class="[urlName=='works' ? 'active' : '']">个人案例</nuxt-link></li>
                        <li><nuxt-link :to="{name:'timemachine-page'}" exact :class="[urlName=='timemachine-page' ? 'active' : '']">时光机</nuxt-link></li>
                        <li><nuxt-link :to="{name:'article-page',params:{page:1},query:{type:'life',title:'生活随笔'}}" exact :class="[urlName=='life' ? 'active' : '']">生活随笔</nuxt-link></li>
                        <li><a href="http://www.xinhuanet.com/politics/xxjxs/" target="_blank">学<span class="xijinp">习</span>进行时</a></li>
                        <li><nuxt-link :to="{name:'about'}" exact :class="[urlName=='about' ? 'active' : '']">关于博主</nuxt-link></li>
                    </ul>
                </div>
                <div class="search">
                    <div class="content">
                        <input type="text" v-model="search" placeholder="请输入关键字"><span><i class="icon-18 iconfont" @click="sendSearch">&#xe612;</i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="header_wait"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SubInsideNav from './SubInsideNav.vue'
    import axios from 'axios';
    import Cookie from '~/common/cookie.js';
    export default{
        data(){
            return {
                indexActiveFlag:true,
                web_item_flag:false,
                web_list:[],
                header_style:{
                    height:'60px',
                    transform:'translateX(0px)'
                },
                m_search_style:{
                    width:'50%'
                },
                m_search_i_style:{
                    background:'rgb(220,220,220)'
                },
                search:'',
                header_animate:false
            }
        },
        components:{
            SubInsideNav
        },
        methods:{
            sendSearch(){
                console.log(this.search);
                if(this.search=='') return;
                this.$router.push({name:'search-page',params:{page:1},query:{s:this.search}})
            },
            searchBlur(){
                this.m_search_style.width='50%';
                this.m_search_i_style.background='rgb(220,220,220)';
            },
            searchFocus(){
                this.m_search_style.width='90%';
                this.m_search_i_style.background='rgb(150,150,150)';
            },
            mAlertNav(flag){
                if(flag===true){
                    this.header_style.transform='translateX(0px)';
                }else {
                    this.header_style.transform='translateX(160px)';
                    this.$emit('mAlertNav');
                }


            }
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


            window.addEventListener('scroll',(e)=>{
                let top = document.documentElement.scrollTop || document.body.scrollTop;
                if(top>5){
                    this.header_style.height='40px';
                    this.header_animate=false;
                }else if(top<=20){
                    this.header_style.height='60px';
                    this.header_animate=true;
                }
            })
        }
    }
</script>

<style lang="scss" scoped>



    @import "@/assets/css/basic.scss";
    .xijinp{
        font-family: xi;
        font-size:20px;
        padding:2px;
        font-weight:bold;
    }
    .header_wait{
        width:100%;
        height:60px;
    }
    .header{
        width:100%;
        background:#fff;
        position:fixed;
        top:0;
        left:0;
        z-index: 10;
        transition:0.5s;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    }
    .header .container{
        display: flex;
        height:100%;
    }
    .header_animate{
        animation:header_animate 1s;
    }
    @keyframes header_animate{
        0%{
            top:0;
        }
        40%{
            top:35px;
        }
        50%{
            top:10px;
        }
        65%{
            top:20px;
        }
        75%{
            top:10px;
        }
        80%{
            top:20px;
        }
        100%{
            top:0px;
        }
    }
    .header .container .logo{
        width:140px;
        flex:0 0 140;
        height:100%;
        margin-right:20px;
        background:#fcf8e3;
		display:flex;
		align-items:center;
    }
	.header .container .logo img{
		width:140px;
		height:40px;
	}
	.header .container .mobile{
        height:100%;
        flex:1;
        display: none;
        align-items: center;
        justify-content: space-between;
        color:#fff;
	}
    .header .container .mobile i.iconfont{
        font-size:0.5rem;
    }
    .header .container .mobile .m_ment{
        display: flex;
        margin-left:0.2rem;
    }
    .header .container .mobile .m_search{
        flex:1;
        height:100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right:0.2rem;
    }
    .header .container .mobile .m_search .m_search_c{
        background:#fff;
        border-radius: 20px;
        width:60%;
        height:30px;
        display: flex;
        align-items: center;
        position:relative;
        transition:0.5s;
    }
    .header .container .mobile .m_search .m_search_c input{
        padding-left:10px;
        height:100%;
        width:100%;
        border-radius: 20px;
        border:none;
        padding-right:50px;
        outline: none;
        color:#737373;
    }
    .header .container .mobile .m_search .m_search_c span{
        background: rgb(200,200,200);
        width:25px;
        height:25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        position:absolute;
        top:2.5px;
        right:10px;
        font-size:15px;
        transition:0.5s;
    }
    .header .container .nav{
        height:100%;
        flex:1;
        display: flex;
        align-items: center;
    }
    .header .container .nav ul li{
        display:inline-block;
        margin-right:30px;
        height:60px;
        line-height:60px;
        font-size:14px;
        cursor:pointer;
        color:rgb(161,161,161);
        font-weight:600;
        position:relative;
    }
    .header .container .nav ul li.web .web_item{
        left:-45px;
        top:60px;
    }
    .header .container .nav ul li.works .works_item{
        left:-40px;
        top:60px;
    }
    .header .container .nav ul li a{
        display:inline-block;
        color:$color;
        text-decoration: none;
        &:hover{color:$colorActive;}
        &.active{color:$colorActive;}
    }
    .header .container .search{
        display: flex;
        align-items:center;
    }
    .header .container .search .content{

    }
    .header .container .search .content input{
        width:150px;
        height:30px;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
        border:1px solid rgb(233,234,237);
        vertical-align: top;
        border-right:none;
        padding-left:5px;
        outline:none;
    }
    .header .container .search .content span{
        display:inline-block;
        width:30px;
        height:30px;
        background:rgb(233,234,237);
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
        padding-top:4px;
        padding-left:6px;
        cursor:pointer;
        color:rgb(125,125,125);
    }


    .web-enter-active,.web-leave-active{
        opacity: 1;
        transition:0.5s;
    }
    .web-enter,.web-leave-to{
        opacity: 0;
        transform:translateY(20px);
    }



    @media screen and (max-width:992px ){
        .header{
            background:$colorActive !important;
        }
        .logo,.nav,.search{
            display: none !important;
        }
        .mobile{
            display: flex !important;
        }
    }



</style>
