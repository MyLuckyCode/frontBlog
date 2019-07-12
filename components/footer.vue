<template>
    <div class="footer">
        <div class="container">
            <p><a href="https://github.com/MyLuckyCode" target="_blank"><i class="icon-18 iconfont">&#xe709;</i></a> </p>
            <p><span>网站运行：{{currentTimeHtml}}</span></p>
        </div>
        <div class="bottom"></div>
    </div>

</template>

<script>
    export default{
        data(){
            return {
                currentTimeHtml:''
            }
        },
        created(){
            setInterval(this.setTime, 1000);
        },
        methods:{
            secondToDate(second) {
                if (!second) {
                    return 0;
                }
                var time = new Array(0, 0, 0, 0, 0);
                if (second >= 365 * 24 * 3600) {
                    time[0] = parseInt(second / (365 * 24 * 3600));
                    second %= 365 * 24 * 3600;
                }
                if (second >= 24 * 3600) {
                    time[1] = parseInt(second / (24 * 3600));
                    second %= 24 * 3600;
                }
                if (second >= 3600) {
                    time[2] = parseInt(second / 3600);
                    second %= 3600;
                }
                if (second >= 60) {
                    time[3] = parseInt(second / 60);
                    second %= 60;
                }
                if (second > 0) {
                    time[4] = second;
                }
                return time;
            },
            setTime(){
                let create_time = Math.round(new Date(Date.UTC(2019, 4, 15, 0, 0, 0)).getTime() /1000);
                let timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000)/1000);
                let currentTime = this.secondToDate((timestamp - create_time));
                this.currentTimeHtml = currentTime[0] + '年' + currentTime[1] + '天' +
                        currentTime[2] + '时' + currentTime[3] + '分' + currentTime[4] +
                        '秒';
            }
        }
    }
</script>

<style scoped>

    .footer{
        width:100%;
        height:150px;
        /*background:transparent url(~assets/img/footer_bg.png) center center repeat-x;*/
        background-image:url(~assets/img/footer_bg.png);
        background-position: center;
        background-repeat: repeat-x;
        padding-top:35px;
        transition:0.5s;
    }
    .footer .container{
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
        height:80px;
    }
    .footer .container p{
        font-size:14px;
        letter-spacing:1px;
        color:rgb(155,155,155);
    }
    .footer .container p span{
        font-weight:bold;
    }

    .bottom{
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        height:40px;
        z-index:9999;
        background-image:linear-gradient(transparent 10%,transparent 15%,rgba(255,255,255,1));

    }
    @media screen and (max-width:767px ){
        .footer{
            height:120px;
            padding-top:0px;
        }
    }

</style>
