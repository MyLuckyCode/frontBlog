<template>
    <div class="container">
        <div class="works">
            <div class="item" v-for="item in list" @click="goUrl(item.target)">
                <img :src="item.img" alt="">
                <div class="hover-div">
                    <p>{{item.info}}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    export default{
        async asyncData(content){
            let list = await axios.get(content.store.state.url.getWorks);
            list.data.forEach((item)=>{
                item.img = content.store.state.url.blogApiImageUrl+item.imgUrl
            })
            return {list:list.data};

        },
        data(){
            return {}
        },
        methods:{
            goUrl(target){
                if(target=='javascript:;'){
                    alert('该项目目前没有在线链接');
                    return;
                }

                window.open(target,"_blank");
            }
        },
        layout:'info'
    }
</script>

<style scoped>
    .container{
        padding-top:10px;
    }
    .works{

        width:100%;
        border-radius: 4px;
        background:#fff;
        padding:15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .works .item{
        width:345px;
        height:200px;
        cursor: pointer;
        margin-bottom: 40px;
        border-radius: 8px;
        overflow: hidden;
        transition:1s;
        position:relative;
    }
    .works .item:nth-child(3n){
        margin-right:0;
    }
    .works .item .hover-div:hover p{
        opacity: 1;
        filter:alpha(opacity=100);
        transform:translateY(-50%);
    }
    .works .item:hover .hover-div{
        background: rgba(0,0,0,0.4);
    }
    .works .item img{
        width:345px;
        height:200px;
        position:absolute;
        top:0;
        left:0;
    }
    .works .item .hover-div{
        width:345px;
        height:200px;
        background: rgba(0,0,0,0);
        position:absolute;
        top:0;
        left:0;
        transition: 1s;
        text-align: center;
    }
    .works .item .hover-div p{
        width:100%;
        padding:0 50px;
        transform:translateY(0%);
        margin:0;
        transition:1s;
        opacity: 0;
        filter:alpha(opacity=0);
        color:#fff;
        position:absolute;
        top:50%;
    }



</style>
