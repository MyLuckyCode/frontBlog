<template>
    <div class="container">
        <div class="about">
            <div class="face">
                <img src="~/assets/img/face.png" alt="">
            </div>
            <p style="text-align: center;color:#ddd;">这个页面，想来想去不知道怎么设计~</p>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {

            }
        },
        layout:'info'
    }
</script>

<style scoped>

    .about{
        height:800px;
        width:100%;
        border-radius: 4px;
        margin-top:10px;
        background:#fff;
    }
    .about .face{
        width:100%;
        padding:20px 0;
        display: flex;
        justify-content: center;
    }
    .about .face img{
        border-radius:50%;
        height:150px;
    }
</style>
