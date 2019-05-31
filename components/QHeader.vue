<template>
    <div class="header">
        <div class="container">
            <div class="logo"></div>
            <ul class="nav">
                <li>
                    <div class="one">首页</div>
                    <div class="two">首页</div>
                </li>
                <li>
                    <div class="one">笔记</div>
                    <div class="two">笔记</div></li>
                <li>
                    <div class="one">实战案例</div>
                    <div class="two">实战案例</div>
                </li>
                <li>
                    <div class="one">关于博主</div>
                    <div class="two">关于博主</div>
                </li>
                <li>
                    <div class="one">前端相关</div>
                    <div class="two">前端相关</div>
                </li>
                <li>
                    <div class="one">软件分享</div>
                    <div class="two">软件分享</div>
                </li>
                <li>
                    <div class="one">生活随笔</div>
                    <div class="two">生活随笔</div>
                </li>
            </ul>

            <div class="search">
                搜索
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {}
        },
        mounted(){


        }
    }
</script>

<style scoped>
    .header{
        width:100%;
        height:70px;
        background:#fff;
    }
    .container{
        width:1200px;
        margin:0 auto;
        display: flex;
        align-items: center;
    }
    .container .logo{
        width:140px;
        height:70px;
        flex:0 0 140px;
        margin-right:20px;
        background:#fcf8e3;
    }
    .container .nav{
        flex:1;
        display:flex;
        height:24px;

    }
    .container .nav li{
        margin-right:30px;
        position:relative;
        transform-style:preserve-3d;
        transform: rotateX(0deg);
        transition:.3s;
        cursor:pointer;
    }
    .container .nav li:hover{
        transform: rotateX(90deg);
    }
    .container .nav li div{

        font-size:16px;
        background:#fff;
    }
    .container .nav li div.one{
        transform:translate3d(0,0,12px);
        transition:1s;
    }
    .container .nav li div.two{
        position:absolute;
        top:0;
        left:0;
        transform:translate3d(0,0,-12px) rotateX(-90deg);
        transform-origin: bottom;
    }
    .container .search{
        float:right;
    }


</style>
