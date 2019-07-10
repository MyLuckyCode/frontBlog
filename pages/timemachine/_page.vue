<template>
    <div class="time">
        <transition name="items" @enter="enterItems" @afterEnter="afterEnterItems">
            <div class="main"  v-show="flag">
                    <ul>
                        <li v-for="(item,index) in timeData" :key="index" class="item">
                            <transition name="item" @enter="enterItem">
                                <div class="box"  v-show="item.flag">
                                    <div class="pic">
                                        <img src="~assets/img/face.png" alt="">
                                    </div>
                                    <div class="icon"></div>
                                    <div class="date">{{item.date}}</div>
                                    <transition name="content" @enter="enterContent">
                                        <div class="content" v-show="item.content_flag">{{item.content}}</div>
                                    </transition>
                                </div>
                            </transition>
                        </li>
                        <li v-for="(item,index) in timeData" v-if="seat" style="visibility:hidden;" :key="index+timeData.length" class="seatItem">
                            <div class="box">
                                <div class="pic">
                                    <img src="~assets/img/face.png" alt="">
                                </div>
                                <div class="icon"></div>
                                <div class="date">{{item.date|formatDate}}</div>
                                <div class="content">{{item.content}}</div>
                            </div>
                        </li>
                    </ul>
            </div>
        </transition>
        <div class="page">
            <Pagination
                           @current-change="handleCurrentChange"
                           :page-size="$store.state.time.page_size"
                           layout="prev, pager, next, jumper"
                           :current-page="currentPage"
                           :total="$store.state.time.total">
            </Pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {formatDate} from '~/common/date.js'
import {Pagination} from 'element-ui';
import axios from 'axios';
    export default{
        async asyncData(content){
            content.params.page = content.params.page==undefined ? '1' : content.params.page;
            let list = await axios.get(content.store.state.url.getTime,{
                params:{
                    page: content.params.page,
                    page_size:content.store.state.time.page_size
                }
            });
            return {timeData:list.data}
        },
        async fetch(content){
            content.params.page = content.params.page==undefined ? '1' : content.params.page;
            if(content.store.state.time.total == 0 ){
                let total = await axios.get(content.store.state.url.getTimeCount);
                content.store.commit('setTimeTotal',total.data);
            }
        },
        components: {
            Pagination
        },
        data(){
            return {
                total:1,
                timeData:[],
                flag:false,
                item_index:0,
                content_index:0,
                seat:true
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.flag=true;
            })
        },
        filters:{
            formatDate(time){
                let date=new Date(time);
                return formatDate(date,'YYYY-mm-dd');
            }
        },
        methods:{
            enterItems(el){
                let seatItem = el.getElementsByClassName( 'seatItem' );
                let height=10;
                for(let i=0;i<seatItem.length;i++){
                    height += seatItem[i].offsetHeight+20;
                }
                el.style.height=height+'px';
            },
            afterEnterItems(el){
                let seatItem = el.getElementsByClassName( 'seatItem' );
                let items = el.getElementsByClassName( 'item' );
                for(let i=0;i<items.length;i++){
                    items[i].style.height=seatItem[i].offsetHeight+'px';
                }
                this.seat=false;
                this.item_index=0;
                this.$set(this.timeData[this.item_index],'flag',true);
                this.item_index++;
            },
            async enterItem(el){
                let flag=await this.animation('flag','item_index');
                if(flag){
                    this.$set(this.timeData[this.content_index],'content_flag',true);
                    this.content_index++;
                }
            },
            async enterContent(){
                let flag=await this.animation('content_flag','content_index');
            },
            animation(target,index){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        if(this[index]>=this.timeData.length ){
                            resolve(true);
                            return false;
                        }
                        if(this[index]==4){
                            resolve(true);
                        }else {
                            resolve(false);
                        }
                        this.$set(this.timeData[this[index]],target,true);
                        this[index]++;
                    },150);
                });
            },
            handleCurrentChange(val){
//                this.timeData.forEach((item)=>{
//                    item.flag=false;
//                });
                this.$router.push({name:'timemachine-page',params:{page:val}});
               //this.flag=false;
            }

        },
        computed:{
            currentPage(){
                return parseInt(this.$route.params.page);
            }
        },
        layout:'time'
    }
</script>

<style scoped>
.time{
    width:100%;
}
.time .main{
    max-width:900px;
    margin:0 auto;
    display:flex;
    justify-content: flex-end;
}
.time .main ul{
    border-left:1px solid #fff;
    padding:5px 0;
    width:800px;

}
.time .main li{
    width:740px;
    margin:10px auto;
    position:relative;
    transform-style:preserve-3d;
    perspective:800px;
}
.time .main li .box{
    transform-origin:left;
    transform-style:preserve-3d;
    perspective:800px;
}
.time .main li .pic{
    width:55px;
    height:55px;
    border-radius:50%;
    border:5px solid #fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
    position:absolute;
    left:-130px;
    top:0;
}
.time .main li .pic img{
    width:100%;
    height:100%;
    border-radius:50%;
}
.time .main li .icon{
    width:12px;
    height:12px;
    background:#f7ebe6;
    border:3px solid #fff;
    border-radius:50%;
    position:absolute;
    left:-36px;
    top:20px;
    box-shadow:inset 0 2px 5px rgba(0,0,0,0.2),0 5px 7px rgba(0,0,0,0.2) ;
}
.time .main li .date{
    width:100%;
    height:40px;
    line-height:40px;
    text-align:center;
    color:rgb(110,110,110);
    background:#fff;
}

.time .main li .content{
    padding:20px 10px;
    font-size:14px;
    color:rgb(130,130,130);
    border:1px solid #fff;
    background:rgb(247,235,230);
    transform-origin:top;
}

.page{
    text-align:center;
    padding-top:15px;
    padding-bottom: 20px;
}


.items-enter-active,.items-leave-active{
    opacity: 1;
    transition:all 1s ease 0.1s;;
}

.items-enter,.items-leave-to{
    opacity:0;
    height:0;
}


.item-enter-active{
    /*opacity: 1;*/
    /*transform:rotateY(0deg);*/
    /*transition:all 0.5s ease;*/
    /*width:740px;*/
    animation:myitem 0.7s;
}
.item-leave-active{
    transition:1s;
    opacity: 0;
}

.item-enter,.item-leave-to{
    /*opacity: 0;*/
    /*width:800px;*/
    /*transform:rotateY(90deg);*/
}


.content-enter-active,.content-leave-active{
    /*opacity: 1;*/
    /*transform:rotateY(0deg);*/
    /*transition:all 0.5s ease;*/
    /*width:740px;*/
    animation:mycontent 0.5s;
}

.content-enter,.content-leave-to{
    /*opacity: 0;*/
    /*width:800px;*/
    /*transform:rotateY(90deg);*/
}


@keyframes mycontent {
    from{
        opacity:0;
        transform:rotateX(-90deg);
    }
    60%{
        opacity:1;
        transform:rotateX(20deg);
    }
    to{
        transform:rotateX(0deg);
    }
}

@keyframes myitem {
    from{
        width:800px;
        opacity: 0;
        transform:rotateY(90deg);
    }
    80%{
        width:800px;
        opacity: 1;
        transform:rotateY(-5deg);
    }
    to{
        width:740px;
        transform:rotateY(0deg);
    }
}


@media screen and (max-width:992px ){
    .time .main{
        justify-content: center;
    }
    .time .main ul{

    }
    .time .main li{
        font-size:0.32rem;
    }
    .time .main li .pic{
        display: none;
    }
}
@media screen and (max-width:767px){
    .time .main ul{
        width:auto;
    }
    .time .main ul li{
        width:auto;
    }
}


</style>
