<template>
    <div class="loading-page" v-if="loading">
        <div class="loadView">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
        <p>加载中...</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start () {
                this.loading = true
            },
            finish () {
                this.loading = false
            }
        }
    }
</script>

<style scoped>
    .loading-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items:center;
        flex-flow: column;
    }
    .loadView{
        width:100px;
        height:100px;
        position:relative;
    }
    .loadView .item{
        width: 25px;
        height: 25px;
        background-color: rgba(255,255,255,0);
        margin: auto;
        border: 4px solid rgb(24,144,255);
        position:absolute;
        top:0;left:0;right:0;
        bottom:0;
    }
    .loadView .item:nth-child(1){
        animation:animateItem1 1s infinite;
        animation-delay: 0.5s;
    }
    .loadView .item:nth-child(2){
        animation:animateItem2 1s infinite;
    }
    .loadView .item:nth-child(3){
        animation:animateItem3 1s infinite;
    }
    .loadView .item:nth-child(4){
        animation:animateItem4 1s infinite;
        animation-delay: 0.5s;
    }
    p{
        text-align:center;
        height:50px;
        padding-top:25px;
        color: rgb(24,144,255);
        letter-spacing:1px;
        font-weight:bold;
    }

    @keyframes animateItem1{
        to{
            transform:translate(0,0);
        }
        50%{
            transform:translate(-150%,-150%) scale(2,2);
        }
        from{
            transform:translate(0,0);
        }
    }

    @keyframes animateItem2{
        to{
            transform:translate(0,0);
        }
        50%{
            transform:translate(150%,-150%) scale(2,2);
        }
        from{
            transform:translate(0,0);
        }
    }

    @keyframes animateItem3{
        to{
            transform:translate(0,0);
        }
        50%{
            transform:translate(-150%,150%) scale(2,2);
        }
        from{
            transform:translate(0,0);
        }
    }

    @keyframes animateItem4{
        to{
            transform:translate(0,0);
        }
        50%{
            transform:translate(150%,150%) scale(2,2);
        }
        from{
            transform:translate(0,0);
        }
    }

    @media screen and (max-width:992px){
        p{
            font-size:0.32rem;
        }

    }

</style>
