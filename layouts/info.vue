<template>
    <div class="body">
        <Header></Header>
        <div class="main" ref="main">
            <nuxt></nuxt>
        </div>
        <Footer></Footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import Header from '~/components/header';
    import Footer from '~/components/footer';
    export default{
        components:{
            Header,Footer
        },
        async created(){
            this.$nextTick(()=>{
                console.log( document.documentElement.clientHeight );
                this.$refs.main.style.minHeight=(document.documentElement.clientHeight-60-150)+'px';
            })

        }
    }

</script>

<style scoped>
.main{
    margin-top: 60px;
}
.body{
    background: #fff;
}

</style>
