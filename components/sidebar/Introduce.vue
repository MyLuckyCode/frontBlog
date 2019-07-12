<template>
    <div class="introduce">
        <span>博客简介</span>
        <p class="content">幸运码博客主要是记录web开发过程中的坑、笔记、案例的地方，偶尔也是记录生活的地方。</p>
        <p class="content"><a href="https://github.com/MyLuckyCode/frontBlog" target="_blank"><i class="icon-14 iconfont">&#xe709;</i>stars</a></p>
    </div>
</template>

<script>
    export default{
        data(){
            return {

            }
        }
    }
</script>

<style scoped>
    @import "@/assets/css/basic.css";
.introduce{
    position:relative;
    padding:35px 15px 15px 15px;
    border:1px solid #eaeaea;
    background:#fff;
    border-radius:4px;
    /*box-shadow:0px 0px 5px rgba(0,0,0,0.3);*/
    z-index: 2;
    /*box-shadow: -1px 1px 1px rgba(0,0,0,0.1);*/
}
.introduce span{
    dispaly:block;
    position:absolute;
    top:-1px;
    left:15px;
    padding:0 5px;
    color:#fff;
    font-size:12px;
    height:25px;
    line-height:25px;
    font-size:12px;
    background:rgb(255,94,82);
}
.introduce p{
    font-size:14px;
    color:rgb(115,115,115);
    line-height:150%;
}
.introduce p a{
    display: inline-block;
    margin-top:10px;
    padding:0 5px;
    border:1px solid #efefef;
    transition:0.5s;
    &:hover{
        color:var(--backgroundActive);
    }
}

</style>
