<template>
    <div class="item">
        <div class="left">
            <img :src=this.$store.state.url.commentFace+item.face alt="">
        </div>
        <div class="right">
            <div class="top">
                <div class="name">{{item.name}}</div>
                <div class="date">发表于 {{item.date}}</div>
                <div class="small_date">发表于 {{item.date|formatDate}}</div>
                <div class="browser" v-for="(v,k) in browser">{{v}}</div>
                <div class="floor" style="color:rgb(106,230,120);">
                    <i class="iconfont" v-if="index==0" title="沙发">&#xe61c;</i>
                    <i class="iconfont" v-else-if="index==1" title="板凳">&#xe60e;</i>
                    <i class="iconfont" v-else>{{index+1}}#</i>
                </div>
            </div>
            <div class="bottom">
                <div class="content" @click="setComment({content_id:item.content_id,pid:item.id,name:item.name})">{{item.content}}</div>
                <ul>

                    <li v-for="item1 in item.ul" @click="setComment({content_id:item.content_id,pid:item1.id,p_name:item1.name})"><span class="active" @click.stop="setComment({content_id:item.content_id,pid:item1.id,p_name:item1.name})">{{item1.name}}</span><span v-if="item1.p_name">回复<span class="active" @click.stop="setComment({content_id:item.content_id,pid:item1.id,p_name:item1.p_name})">{{item1.p_name}}</span></span>：{{item1.content}}</li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import dateparser from '~/common/DateParser.js'
    export default{
        props:['item','index'],
        data(){
            return {}
        },
        methods:{
            setComment(obj){
                console.log(obj)
                this.$emit('setComment',obj);
            }
        },
        filters:{
            formatDate(time){
                return dateparser.getLocalTime(time);
            }
        },
        computed:{
            ul(){
                if(this.item.ul){
                    return this.item.ul.reverse();
                }
                return this.item.ul;
            },
            browser(){
                this.item.browser = JSON.parse(this.item.browser);
                return this.item.browser;

            }
        }
    }
</script>

<style scoped>
    .item{
        border-bottom:1px solid rgb(245,245,245);
        width:100%;
        min-height:70px;
        display: flex;
        padding-top:15px;
        padding-bottom:20px;
        color:rgb(115,115,115);
        font-size:16px;
    }
    .item .left{
        flex:0 0 100px;
        display: flex;
        justify-content: center;
    }
    .item .left img{
        width:50px;
        height:50px;
    }
    .item .right{
        flex:1;
        display: flex;
        padding-top:0px;
        flex-direction: column;
    }
    .item .right .top{
        display: flex;
        margin-bottom:8px;
        align-items: flex-end;
    }
    .item .right .top .name{
        padding-right:15px;
        padding-left:20px;
        line-height: 120%;
        background: url(~/assets/img/member.gif);
        background-repeat: no-repeat;
        background-position:center left ;
    }
    .item .right .top .small_date{
        display: none;
    }
    .item .right .top .date{
        padding-right:15px;
    }
    .item .right .top .date:before{
        content:'|   ';
    }
    .item .right .top .browser{
        background: linear-gradient(90deg,#5087ec,#d95040,#f2bd42);
        margin-left: 8px;
        color:#fff;
        font-weight:300;
        font-size:12px;
        padding:2px 4px;
        border-radius: 3px;
    }
    .item .right .top .floor{
        flex:1;
        text-align:right;
        padding-right:15px;
        font-size:12px;
    }
    .item .right .bottom{
        font-size:15px;
        padding-top:2px;
        padding-right:20px;

    }
    .item .right .bottom .content{
        padding-bottom: 15px;
        cursor:pointer;
        transition:.5s;
    }
    .item .right .bottom .content:hover{
        background:rgb(250,250,250);
    }
    .item .right .bottom ul{
        padding-top:5px;
        padding-left:16px;
    }
    .item .right .bottom ul li{
        padding:2px 0;
        cursor:pointer;
        transition:.5s;
    }.item .right .bottom ul li:hover{
        background:rgb(250,250,250);
    }

    .item .right .bottom ul li span.active{
        color:rgb(106,230,120);
    }
    .item .right .bottom ul li span.active:hover{
        text-decoration: underline;
    }


    @media screen and (max-width:767px){
        .item .right .top .browser{
            display: none;
        }
        .item .left{
            flex:0 0 70px;
            justify-content: flex-start;
        }
    }

    @media screen and (max-width:414px){
        .item .right .top .date{
            display: none;
        }
        .item .right .top .small_date{
            display: block;
        }
    }

    @media screen and (min-width:415px){
        .item .right .top .small_date{
            display: none;
        }
    }


</style>
