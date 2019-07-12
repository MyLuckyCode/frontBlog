<template>
    <div class="ImageList" >
        <div class="left">
            <div class="letView">
                <img src="@/assets/img/imageList1.jpg" alt="" width="310" height="180">
                <div class="img_bg"></div>
                <p class="img_txt">有些话不一定要说出来 | 但一定要记录在某个地方</p>
            </div>
        </div>
        <div class="right">

            <div  class="rightItem" v-for="(item,index) in list" :key="index" :style="'width:'+item.width+'px;'" v-if="flag" >
                <div class="text">
                    <h3 class="text_title">404</h3>
                    <p class="text_desc">路<br>在何方</p>
                </div>
                <img class="pic" :width="item.width" height="84" :src="$store.state.url.blogUrl+'frontStatic/img/'+item.url+'.jpg'">
            </div>
            <div v-else></div>

        </div>

    </div>
</template>

<script>
    export default{
        data(){
            return {
                flag:false,
                list:[{
                    url:'imageList2',
                    width:110
                },{
                    url:'imageList3',
                    width:110
                },{
                    url:'imageList4',
                    width:160
                },{
                    url:'imageList5',
                    width:110
                },{
                    url:'imageList6',
                    width:160
                },{
                    url:'imageList7',
                    width:110
                },{
                    url:'imageList8',
                    width:110
                },{
                    url:'imageList9',
                    width:110
                }]
            }
        },
        created(){
            if (process.client) {
                let htmlWidth = window.innerWidth;
                if ( htmlWidth >= 1200 )this.flag = true;
            }
        },
        methods:{
            setClass(e){

              //  console.log( e.fromElement.classList.add() );
                // e.classList.add('rightItem_active');
                console.log( e.fromElement );
            }
        }
    }
</script>

<style scoped>
    .ImageList{
        height:180px;
        display: flex;
        margin-bottom:10px;
    }
    .ImageList .left{
        flex:0 0 325px;
        width:325px;
    }
    .ImageList .left .letView{
        width:310px;
        height:180px;
        position:relative;
    }
    .ImageList .left .letView:hover > .img_bg{
        left:200px;
    }
    .ImageList .left .letView .img_bg{
        width:180px;
        height:180px;
        position:absolute;
        left:-100px;
        top:0;
        background-image:linear-gradient(left,transparent 0,rgba(255,255,255,0.5) 80%,transparent 100%);
        /*background-image:linear-gradient(0deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.5), hsla(0, 0%, 100%, 0));*/
        transform: skewx(-25deg);
        transition: 0.5s;
        cursor: pointer;
    }

    .ImageList .left .letView .img_txt{
        position:absolute;
        left:0;
        bottom:0;
        height:35px;
        width:100%;
        background:rgba(0,0,0,0.7);
        text-align: center;
        padding-top:8px;
        overflow: hidden;
        font-size:12px;
        color:#fff;
    }
    .ImageList .left .img{

    }
    .ImageList .right{
        flex:1;
        flex-wrap:wrap;
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-content: space-between;
    }
    .ImageList .right .rightItem{
        background:rgb(245,245,245);
        height:84px;
        position:relative;
        transform-style:preserve-3d;
        transition: .4s;
        transform-origin: center;
        cursor:pointer;
        prespective:10000px;
    }
    .ImageList .right .rightItem:hover{
        transform: rotateX(89deg) translateZ(0);
    }

    .ImageList .right .rightItem .text{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        background:linear-gradient(155deg,rgb(34,150,227) 50%,rgb(25,143,222) 50%);
        transform-origin: bottom;
        transform:translate3d(0,0,-42px) rotateX(-90deg);
        transition:0.5s;
    }

    .ImageList .right .rightItem .text .text_title{
        font-size:24px;
        line-height: 34px;
        margin:5px 0 0 8px;
        color:#fff;
    }
    .ImageList .right .rightItem .text .text_desc{
        font-size:14px;
        margin-left:8px;
        color:#fff;
    }
    .ImageList .right .rightItem .pic{
        transform:translateZ(42px);
        position:absolute;
        top:0;
        left:0;
    }

    @media screen and (max-width: 1199px) {
        .ImageList{
            display: none;
        }
    }

</style>
