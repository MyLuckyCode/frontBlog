<template>
    <div class="introduce">
        <span>博客简介</span>

        <!--<video id="my-video_html5_api" width="308" height="173" controls preload="none" class="vjs-tech" style="margin-top:0" @click.stop autoplay>-->
            <!--<source src="http://localhost/smarty/admin_blog/upload/video/web.mp4" type="video/mp4">-->
        <!--</video>-->
        <p class="content">唯品秀博客: weipxiu.com，一个关注Web前端开发技术、关注用户体验、坚持更多原创实战教程的个人网站，愿景：成为宇宙中最具有代表性的前端博客，期待您的参与</p>
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

</style>
