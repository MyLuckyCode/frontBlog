<template>
    <div class="ment" :style="mentStyle" v-show="flag">
        为实现中华民族伟大复兴的中国梦不懈奋斗
    </div>
</template>

<script>
    export default{
        data(){
            return {
                mentStyle:{},
                flag:false
            }
        },
        methods:{
            rightKey(e){
                if(e==1)return this.flag=false;
                this.flag=true;
                let x=e.clientX-128.5;
                let y=e.clientY-33;
                this.mentStyle={left:x+'px',top:y+'px'}
            }
        }
    }
</script>

<style scoped>
    .ment{
        display:inline-block;
        padding:5px;
        position:fixed;
        background:rgba(0,0,0,0.7);
        color:#fff;
        font-size:12px;
        font-weight:bold;
        letter-spacing: 1px;
        width:276px;
        z-index:9999;
    }
    .ment:after{
        content:'';
        border-top:8px solid rgba(0,0,0,0.7);
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        position:absolute;
        bottom:-8px;
        left:50%;
        transform: translateX(-50%);
    }
</style>
