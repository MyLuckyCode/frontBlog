<template>
    <div class="FocusToday">
        <div class="top">
            <span class="title">【今日焦点】</span><nuxt-link :to="{name:'details-id',params:{id:item.id}}">{{item.title}}</nuxt-link>
            <img class="new_icon" src="~/assets/img/new.gif" alt="">
        </div>
        <p class="bottom">
            {{item.info}}
        </p>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import Cookie from '~/common/cookie.js';
    export default{
        data(){
            return {
                item:{}
            }
        },
        async created(){
            let caChe = this.$store.state.caChe;
            if(Cookie.is('config') && caChe){
                if(Object.keys(this.$store.state.config).length==0){
                    console.log( Cookie.get( 'config' ) );
                    let config = JSON.parse(Cookie.get('config'));
                    this.$store.commit('setConfig',config[0]);
                }
            }else {
                let res =await axios.get(this.$store.state.url.getConfig)
                Cookie.set('config',JSON.stringify(res.data),'current');
                this.$store.commit('setConfig',res.data[0]);
            }

            if(Cookie.is('focusArticle') && caChe){
                let data = JSON.parse(Cookie.get('focusArticle'));
                this.item = data[0];
            }else {
                let res2 = await await axios.get(this.$store.state.url.getFocusArticle,{
                    params:{id:this.$store.state.config.focusArticle}
                })
                Cookie.set('focusArticle',JSON.stringify(res2.data),'current');
                this.item=res2.data[0]
            }



        }
    }
</script>

<style scoped>
    .FocusToday{
        width:100%;
        height:120px;
        background: #fff;
        margin-top:10px;
        padding:15px 20px;
    }
    .FocusToday .top{
        width:100%;
        color:rgb(24,144,255);
        font-size:18px;
        line-height: 24px;
        margin:0 0 18px;
        box-reflect:below 0 linear-gradient(transparent,transparent 50%,rgba(255,255,255,.5));
        -webkit-box-reflect:below 0 linear-gradient(transparent 0%,rgba(255,255,255,.2));
    }
    .FocusToday .top .title{
        font-size:20px;
        margin-left:-8px;
    }
    .FocusToday .top .new_icon{
        vertical-align: middle;
        margin-left:4px;
    }
    .FocusToday .bottom{
        font-size:14px;
        color:#666;
        line-height: 25px;
        width:100%;
        text-indent:2em;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
</style>
