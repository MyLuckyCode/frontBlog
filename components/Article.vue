<template>
    <div class="items">
        <div class="item" v-for="(item,index) in items" :key="index">
            <div class="m_title ellipsis-1"><nuxt-link :to="{name:'details-id',params:{id:item.id}}"><span>{{item.title}}</span></nuxt-link></div>
            <div class="img">
                <nuxt-link :to="{name:'details-id',params:{id:item.id}}"><img :src="$store.state.url.blogApiImageUrl+item.face" alt="" draggable="false"></nuxt-link>
            </div>
            <div class="content">
                <div class="p1">
                    <nuxt-link :to="{name:'article-page',params:{page:1},query:{type:item.nav,title:item.NavName}}"><span class="label" >{{item.NavName}} <i></i></span></nuxt-link>
                    <nuxt-link :to="{name:'details-id',params:{id:item.id}}" style="height:25px;line-height:25px;"><span class="ellipsis-1s title" :title="item.title">{{item.title}}</span></nuxt-link>
                </div>
                <div class="p2">
                    {{item.source==1 ? '原创' : '转载'}} <span>·</span> {{item.author}}
                </div>
                <div class="p3 ellipsis-2">
                   {{item.info}}
                </div>
                <div class="p4">
                    <span><i class="icon-10 iconfont">&#xe7d5;</i>{{item.date|formatDate}}</span>
                    <span><i class="icon-10 iconfont">&#xe7d2;</i>{{item.readCount}}</span>
                    <span><i class="icon-10 iconfont">&#xe619;</i>{{item.commentCount}} 条评论</span>
                    <span><i class="icon-10 iconfont">&#xe60c;</i>{{item.fabulous}} 喜欢</span>
                </div>
                <nuxt-link :to="{name:'details-id',params:{id:item.id}}"><span class="button">阅读全文</span></nuxt-link>
            </div>
            <em class="roof" v-if="item.roof==1">顶</em>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import dateparser from '~/common/DateParser.js'
    export default{
        data(){
            return {

            }
        },
        props:['items'],
        created(){
          //  let data=await axios.get(this.$store.state.url.getIndexArticle);
         //   console.log( data );
        },
        filters:{
            formatDate(time){
                return dateparser.getLocalTime(time);
            }
        }
    }
</script>

<style scoped>
    @import "@/assets/css/basic.css";
.items .item{
    padding:15px;
    display:flex;
    height:170px;
    margin-bottom: 10px;
    background:#fff;
    border-radius:5px;
    position:relative;
    overflow: hidden;
}
.items .item .m_title{
    color:#444;
    position:absolute;
    top:0.1rem;
    left:0.3rem;
    font-weight: 400;
    font-size:0.32rem;
    display: none;
    width:100%;
    padding-right:10px;
}
.items .item:after{
    content:'';
    display: block;
    width:0%;
    height:1px;
    background: #1890ff;
    position:absolute;
    left:0px;
    bottom:-1px;
    transition:0.5s;
}
.items .item:hover:after{
    width:100%;
}
/*initial.png*/
.items .item .img{
    flex:0 0 220px;
    width:220px;
    height:140px;
    border-radius:4px;
    overflow: hidden;
    background-image:url(~/assets/img/noPic.png);
	background-size:contain;
	background-repeat:no-repeat;
    overflow: hidden;
}
.items .item .img img{
    width:100%;
    height:100%;
    transition:0.5s;
    cursor:pointer;
}
.items .item .img img:hover{
    transform: scale(1.2);
}
.items .item .content{
    padding-left:15px;
    flex:1;
    display:flex;
    flex-direction: column;
    position:relative;
    min-width: 0;
    overflow: hidden;
}
.items .item .content .p1{
    display: flex;
	min-width:0;
}
.items .item .content .p1 .label{
    display:inline-block;
    padding:3px 5px;
    font-size:12px;
    color:#fff;
	line-height:150%;
    font-weight:500;
    background:var(--background);
    cursor:pointer;
    position:relative;
    border-left-color:var(--background);
    transition:0.4s;
    &:hover{
        background:var(--backgroundActive);
         border-left-color:var(--backgroundActive);
    }
}
.items .item .content .p1 .label i{
    position:absolute;
    right:-5px;
    top:6px;
    border-left:5px solid;
    border-left-color: inherit;
    border-top:5px solid transparent;
    border-bottom:5px solid transparent;
}
.items .item .content .p1 a:nth-child(1){
	display:flex;
}
.items .item .content .p1 a:nth-child(2){
    flex:1;
	display:flex;
    padding-right:50px;
    min-width: 0;
}
.items .item .content .p1 .title{
	width:100%;
    vertical-align: middle;
    margin-left:12px;
    color:rgb(115,115,115);
    font-size:18px;
    cursor:pointer;
    transition:1s;

    &:hover{
        color:var(--colorActive);
    }
}
.items .item .content .p2{
    font-size:13px;
    color:rgb(105,105,105);
    margin-top:10px;
    span{
        font-weight: bold;
    }
}
.items .item .content .p3{
    max-height:50px;
    margin-top:10px;
    padding-right:10px;
    font-size:14px;
    color:rgb(105,105,105);
    line-height:170%;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break:break-all;
}
.items .item .content .p4{
    position:absolute;
    bottom:0;
    left:15px;
    display: flex;
    justify-content: space-between;
}
.items .item .content .p4 span{
    font-size:12px;
    display:inline-block;
    margin-right:25px;
    vertical-align: bottom;
    color:#666;
}
.items .item .content span.button{
    display:inline-block;
    position:absolute;
    right:0;
    bottom:0;
    font-size:12px;
    margin-right:15px;
    padding:5px 8px;
    background:var(--background);
    color:#fff;
    border-radius:4px;
    cursor:pointer;
    transition:0.5s;
    &:hover{
        background:var(--backgroundActive);
    }
}
.items .item .roof{
    display: block;
    color:#fff;
    position:absolute;
    right:15px;
	top:20px;
    background:#1890ff;
    opacity: 0.8;
    border-radius: 2px;
    font-style:normal;
    font-size:12px;
    padding:0 12px;
    z-index: 20;
}
.items .item .roof:after{

    content:'';
    display: block;
    position:absolute;
    left:42%;
    border:4px solid transparent;
    border-left:4px solid #1890ff;
    border-top:4px solid #1890ff;
    z-index: 1;
}


    @media screen and (max-width:992px ){
        .items .item .content .p1{
            height:25px;
            line-height: 25px;
        }
        .items .item .content .p1 a{
            //line-height: 0.30rem;
        }
        .m_nav{
            display: block;
        }
    }

    @media screen and (max-width:767px){
        .items .item{
            padding:0.1rem 0.3rem;
            height:2.2rem;
            padding-top:0.65rem;
            width:100%;
            border-radius: 0;
        }
        .items .item .img{
            flex:0 0 2rem;
            width:2rem;
            height:1.35rem;
        }
        .items .item .m_title{
            display: block;
        }

        .items .item .content .p3{
            font-size:0.26rem;
            color:#999;
            margin-top:0;
        }

        .items .item .content .p4{
            bottom:0.1rem;
        }
        .items .item .content .p4 span {
            margin-right: 15px;
            font-size:0.24rem;
        }
        span.button,.roof,.items .item .content .p1,.items .item .content .p2,.items .item .content .p4 span:nth-child(2){
            display: none !important;
        }
    }

    @media screen and (max-width:375px){
        .items .item .content .p4 span {
            margin-right: 10px;
        }
        .items .item .content .p4 span:nth-child(4){
            display: none !important;
        }
    }



</style>
