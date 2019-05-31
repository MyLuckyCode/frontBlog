<template>
    <div class="loading-page" v-if="loading">
        <div class="loadView">
            <div class="item"></div>
            <p>加载中...</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: () => ({
            loading: true
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
    }
    .loadView{
        width:100px;
        height:100px;
    }
    .loadView > div{
        width:100px;
        height:100px;
        background:rgb(24,144,255);
        animation:animate  2s infinite ease-in-out;
    }
    .loadView > p{
        text-align:center;
        height:50px;
        padding-top:20px;
        color: rgb(24,144,255);
        letter-spacing:1px;

    }

    @keyframes animate{
        0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        }
        25%{
             transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        }
        50% {
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        }
        75%{
            transform: perspective(120px) rotateX(-0deg) rotateY(-179.9deg);
        }
        100% {
            transform: perspective(120px) rotateX(-0deg) rotateY(-360deg);
        }
    }

</style>
