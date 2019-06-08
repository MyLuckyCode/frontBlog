<template>
    <div class="lately">
        <div class="header">
            <span class="icon"><i class="icon-18 iconfont">&#xe611;</i></span>
            <h2 class="title">最近更新</h2>
        </div>
        <div class="items">
            <div class="item" v-for="(item,key) in lately" :key="key">
                <div class="img">
                    <nuxt-link :to="{name:'details-id',params:{id:item.id}}"><img :src="$store.state.url.blogApiImageUrl+item.face" alt=""></nuxt-link>
                </div>
                <div class="content">
                    <p class="title"> <nuxt-link :to="{name:'details-id',params:{id:item.id}}">{{item.title}}</nuxt-link></p>
                    <p class="time">{{item.date|formatDate}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import {formatDate} from '~/common/date.js'
    import Cookie from '~/common/cookie.js';
    export default{
        data(){
            return {
                lately:[]
            }
        },
        async created(){
            let date=new Date();
            let caChe = this.$store.state.caChe;
            if(Cookie.is('lately') && caChe){
			
                this.lately=JSON.parse(Cookie.get('lately'));
				console.log(this.lately);
			}else {
                axios.get(this.$store.state.url.getUpdateArticle).then((res)=>{

                    this.lately=res.data;
                    Cookie.set('lately',JSON.stringify(res.data));
                })
            }

        },
        filters:{
            formatDate(time){
                let date=new Date(time);
                return formatDate(date,'YYYY-mm-dd');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/css/basic.scss";
.lately{
    background:#fff;
    border-radius:4px;
    border:1px solid #eaeaea;
}
.lately .header{
    border-bottom:1px solid rgba(7,17,27,0.2);
    display: flex;
}
.lately .header .icon{
    flex:0 0 40px;
    display:flex;
    justify-content: center;
    align-items: center;
    width:40px;
    height:40px;
    color:$colorActive;
    border-right:1px solid rgba(7,17,27,0.1);
}
.lately .header .title{
    flex:1;
    display: flex;
    align-items: center;
    font-size:15px;
    padding-left:11px;
    font-weight:500;
    color:rgb(115,115,115);

}
.lately .items{
    padding:5px 15px;
}
.lately .items .item{
    display:flex;
    padding:10px 0;
    border-bottom:1px solid rgba(7,17,27,0.1);
}
.lately .items .item:last-child{
    border:none;
}
.lately .items .item .img{
    width:103px;
    height:70px;
    flex:0 0 103px;
    overflow: hidden;
}
.lately .items .item .img img{
    width:103px;
    height:70px;
    transition:0.5s;
    cursor:pointer;
}
.lately .items .item .img img:hover{
    transform: scale(1.2);
}
.lately .items .item .content{

    flex:1;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    padding-left:12px;

    color:rgb(115,115,115);
    font-size:14px;

}
.lately .items .item .content p.title{
    flex:1;
    line-height:150%;
    padding-top:5px;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break:break-all;

    &:hover{
        color:$colorActive;
    }
}


.lately .items .item .content p.time{
    font-size:10px;
    padding-bottom:5px;
}

</style>
