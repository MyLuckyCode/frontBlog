<template>
    <div class="label">
        <div class="header">
            <span class="icon"><i class="icon-18 iconfont">&#xe611;</i></span>
            <h2 class="title">标签云</h2>
        </div>
        <div class="items">
            <ul v-if="label.length">
                <li v-for="(item,index) in label" :key="index" v-bind:style="{background:rgb()}">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Cookie from '~/common/cookie.js';
    export default{
        data(){
            return {
                label:[],
                liColor:{background:this.rgb}
            }
        },
        methods:{
           rgb(){ //颜色的随机生成
               var str = 'rgba(' + parseInt( Math.random() * 256 ) + ',' + parseInt( Math.random() * 256 ) + ',' + parseInt( Math.random() * 256 ) + ',0.6)';
               return str;
           }
        },
        async created(){
            let caChe = this.$store.state.caChe;
            if(Cookie.is('label') && caChe){
                this.label=JSON.parse(Cookie.get('label'));
            }else {
                axios.get(this.$store.state.url.getLabel).then((res)=>{
                    this.label=res.data;
                    Cookie.set('label',JSON.stringify(res.data));
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/css/basic.scss";
    .label{
        background:#fff;
        border-radius:4px;
        border:1px solid #eaeaea;
    }
    .label .header{
        border-bottom:1px solid rgba(7,17,27,0.2);
        display: flex;
    }
    .label .header .icon{
        flex:0 0 40px;
        display:flex;
        justify-content: center;
        align-items: center;
        width:40px;
        height:40px;
        color:$colorActive;
        border-right:1px solid rgba(7,17,27,0.1);
    }
    .label .header .title{
        flex:1;
        display: flex;
        align-items: center;
        font-size:15px;
        padding-left:11px;
        font-weight:500;
        color:rgb(115,115,115);
    }
    .label .items{
        padding:5px 15px;
        font-size:0;
    }
    .label .items li{
        display:inline-block;
        font-size:12px;
        border-radius:4px;
        color:#fff;
        padding:5px;
        margin:5px 0;
        margin-right:5px;
        transition:1s;
    }
</style>
