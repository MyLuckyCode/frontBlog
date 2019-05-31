<template>
    <div class="container">
        <div class="works">
            <div class="item" v-for="item in list" @click="goUrl(item.target)">
                <img :src="item.img" alt="">
                <div class="hover-div">
                    <h3>{{item.title}}</h3>
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
                item.img = content.store.state.url.blogUrl+'upload/clippingImages/'+item.imgUrl
            })
            return {list:list.data};

        },
        data(){
            return {}
        },
        methods:{
            goUrl(target){
                if(target==''){
                    alert('该项目目前没有在线链接');
                    return;
                }

                window.open(target,"_blank");
                console.log(target)
            }
        },
        layout:'info'
    }
</script>

<style scoped>
    .works{
        height:700px;
        width:100%;
        border-radius: 4px;
        background:#fff;
        padding-top:20px;
    }
    .works .item{
        float:left;
        margin-right:82.5px;
        width:345px;
        height:200px;
        cursor: pointer;
        margin-bottom: 30px;
        background: red;
        border-radius: 8px;
        overflow: hidden;
        transition:1s;
        position:relative;
    }
    .works .item:nth-child(3n){
        margin-right:0;
    }
    .works .item:hover{
        transform:scale(1.1);
    }
    .works .item .hover-div:hover h3{
        opacity: 0;
        filter:alpha(opacity=0);
        transform:translateY(60px);
    }
    .works .item .hover-div:hover p{
        opacity: 1;
        filter:alpha(opacity=100);
        transform:translateY(60px);
    }
    .works .item:hover .hover-div{
        background: rgba(0,0,0,0.7);
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
        background: rgba(0,0,0,0.4);
        position:absolute;
        top:0;
        left:0;
        transition: 1s;
        text-align: center;
    }
    .works .item .hover-div h3{
        transform:translateY(90px);
        margin:0;
        transition:1s;
        opacity: 1;
        filter:alpha(opacity=100);
        color:#fff;
    }
    .works .item .hover-div p{
        padding:0 50px;
        transform:translateY(120px);
        margin:0;
        transition:1s;
        opacity: 0;
        filter:alpha(opacity=0);
        color:#fff;
    }



</style>
