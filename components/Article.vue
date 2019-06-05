<template>
    <div class="items">
        <div class="item" v-for="(item,index) in items" :key="index">
            <div class="img">
                <nuxt-link :to="{name:'details-id',params:{id:item.id}}"><img :src="$store.state.url.blogApiImageUrl+item.face" alt="" draggable="false"></nuxt-link>
            </div>
            <div class="content">
                <div class="p1">
                    <nuxt-link :to="{name:'article-page',params:{page:1},query:{type:item.nav,title:item.NavName}}"><span class="label" >{{item.NavName}} <i></i></span></nuxt-link>
                    <nuxt-link :to="{name:'details-id',params:{id:item.id}}"><span class="title">{{item.title}}</span></nuxt-link>
                </div>
                <div class="p2">
                    {{item.source==1 ? '原创' : '转载'}} <span>·</span> {{item.author}}
                </div>
                <div class="p3">
                   {{item.info}}
                </div>
                <div class="p4">
                    <span><i class="icon-10 iconfont">&#xe7d5;</i>{{item.date}}</span>
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

    export default{
        data(){
            return {

            }
        },
        props:['items'],
        created(){
          //  let data=await axios.get(this.$store.state.url.getIndexArticle);
         //   console.log( data );
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/css/basic.scss";
.items .item{
    padding:15px;
    display:flex;
    height:170px;
    margin-bottom: 10px;
    background:#fff;
    border-radius:5px;
    position:relative;
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
    width:220px;
    height:140px;
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

}
.items .item .content .p1 .label{
    display:inline-block;
    vertical-align: middle;
    padding:3px 5px;
    font-size:10px;
    color:#fff;
    font-weight:500;
    background:$background;
    cursor:pointer;
    position:relative;
    border-left-color:$background;
    transition:0.4s;
    &:hover{
        background:$backgroundActive;
         border-left-color:$backgroundActive;
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
.items .item .content .p1 .title{
    display:inline-block;
    vertical-align: middle;
    margin-left:12px;
    color:rgb(115,115,115);
    font-size:18px;
    cursor:pointer;
    transition:1s;
    &:hover{
        color:$colorActive;
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
    background:$background;
    color:#fff;
    border-radius:4px;
    cursor:pointer;
    transition:0.5s;
    &:hover{
        background:$backgroundActive;
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
    top:16px;
    border:4px solid transparent;
    border-left:4px solid #1890ff;
    border-top:4px solid #1890ff;
    z-index: 1;

}


</style>
