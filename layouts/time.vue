<template>
    <div class="body" @click="leftKey($event)" @contextmenu.prevent="rightkey($event)">
        <Header></Header>
        <div class="main" ref="main">
            <nuxt></nuxt>
        </div>
        <Footer></Footer>
		<Heart ref="heart"></Heart>
		<Ment ref="ment"></Ment>
    </div>
</template>

<script type="text/ecmascript-6">
    import Header from '~/components/header';
    import Footer from '~/components/footer';
	import Heart from '~/components/heart.vue';
	import Ment from '~/components/ment.vue';
    export default{
        components:{
            Header,Footer,Heart,Ment
        },
        async created(){
            this.$nextTick(()=>{
                this.$refs.main.style.minHeight=(document.documentElement.clientHeight-60-150)+'px';
            })

        },
		methods:{
			leftKey(event){
			  this.$refs.heart.leftKey(event);
			  this.$refs.ment.rightKey(1);
			},
			rightkey(event){
			  this.$refs.ment.rightKey(event);
			}
		}
    }

</script>

<style scoped>
.main{
    margin-top: 60px;
    background: linear-gradient(bottom,rgb(247,235,235), rgb(253,251,245));

}

</style>
