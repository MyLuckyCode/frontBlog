<template>
    <transition-group name="heart" @afterEnter="afterEnterHeart">
        <div class="heart" v-for="(item,index) in heart" :data-index="index" :key="index" v-if="item.flag" :style="item.style">
            {{item.name}}
        </div>
    </transition-group>
</template>

<script>
    export default{
        data(){
            return {
                heart:[
                    {
                        name:'富强',
                        flag:false
                    },{
                        name:'民主',
                        flag:false
                    },{
                        name:'文明',
                        flag:false
                    },{
                        name:'和谐',
                        flag:false
                    },{
                        name:'自由',
                        flag:false
                    },{
                        name:'平等',
                        flag:false
                    },{
                        name:'公正',
                        flag:false
                    },{
                        name:'法治',
                        flag:false
                    },{
                        name:'爱国',
                        flag:false
                    },{
                        name:'敬业',
                        flag:false
                    },{
                        name:'诚信',
                        flag:false
                    },{
                        name:'友善',
                        flag:false
                    },{
                        name:'富强',
                        flag:false
                    },{
                        name:'民主',
                        flag:false
                    },{
                        name:'文明',
                        flag:false
                    },{
                        name:'和谐',
                        flag:false
                    },{
                        name:'自由',
                        flag:false
                    },{
                        name:'平等',
                        flag:false
                    },{
                        name:'公正',
                        flag:false
                    },{
                        name:'法治',
                        flag:false
                    },{
                        name:'爱国',
                        flag:false
                    },{
                        name:'敬业',
                        flag:false
                    },{
                        name:'诚信',
                        flag:false
                    },{
                        name:'友善',
                        flag:false
                    },{
                        name:'富强',
                        flag:false
                    },{
                        name:'民主',
                        flag:false
                    },{
                        name:'文明',
                        flag:false
                    },{
                        name:'和谐',
                        flag:false
                    },{
                        name:'自由',
                        flag:false
                    },{
                        name:'平等',
                        flag:false
                    },{
                        name:'公正',
                        flag:false
                    },{
                        name:'法治',
                        flag:false
                    },{
                        name:'爱国',
                        flag:false
                    },{
                        name:'敬业',
                        flag:false
                    },{
                        name:'诚信',
                        flag:false
                    },{
                        name:'友善',
                        flag:false
                    }
                ],
                index:0
            }
        },
        methods:{
            leftKey(e){
                let x=e.clientX-17.5;
                let y=e.clientY-25;
                this.index=(this.index%this.heart.length);
                let rgb=this.rgb();
                this.$set(this.heart[this.index],'style',{left:x+'px',top:y+'px',background:rgb,borderTopColor:rgb});
                this.$set(this.heart[this.index],'flag',true);
                this.index++;
            },
            afterEnterHeart(el){
                this.$set(this.heart[el.dataset.index],'flag',false);
            },
            rgb(){ //颜色的随机生成
                var str = 'rgba(' + parseInt( Math.random() * 256 ) + ',' + parseInt( Math.random() * 256 ) + ',' + parseInt( Math.random() * 256 ) + ',0.7)';
                return str;
            }
        }
    }
</script>

<style scoped>
    .heart{
        position:fixed;
        width:35px;
        height:20px;
        line-height:20px;
        background:#E9DC51;
        color:#fff;
        text-align:center;
        letter-spacing: 1px;
        z-index:9999;
        font-size:12px;
        font-weight:bold;
        border-radius:4px;
    }
    .heart:after{
        content:'';
        border-top:5px solid;
        border-top-color:inherit;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        position:absolute;
        bottom:-5px;
        left:12px;
    }


    .heart-leave-active{
        animation:mycontent 3s;
    }



    @keyframes mycontent {
        from{
            opacity:1;
            transform:translateY(0px);
        }
        80%{
            opacity: 0.3;
        }
        to{
            opacity: 0;
            transform:translateY(-250px) scale(1.2);
        }

    }
</style>
