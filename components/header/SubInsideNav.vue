<template>
    <div class="subnav">
        <ul>
            <li v-for="(item,index) in list" :key="index"><nuxt-link :to="item.url">{{item.name}}</nuxt-link></li>
        </ul>
    </div>

</template>

<script type="text/ecmascript-6">
    export default{
        props:['list'],
        data(){
            return {}
        }
    }
</script>

<style scoped>

    @import "@/assets/css/basic.css";
    .subnav{
        position:absolute;
        padding-top:10px;
        Z-index:10;
    }
    .subnav ul{
        background:#fff;
        position:relative;
        border-radius:4px;
        box-shadow:0px 0px 25px rgba(0,0,0,0.3);
        padding:1px;
    }
    .subnav ul:after{
        content:'';
        border-bottom:5px solid #fff;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        position:absolute;
        top:-5px;
        left:72.5px;
    }
    .subnav ul > li{
        width:150px;
        height:40px;
        line-height:40px;
        text-align:center;
        &:hover{
            color:#fff;
            background: var(--backgroundActive);
        }
    }
    .subnav ul > li a{
        display:block;
    }
</style>
