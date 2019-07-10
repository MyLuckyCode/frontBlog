<template>
    <div class="body" @click="leftKey($event)" @contextmenu.prevent="rightkey($event)">
        <Header @mAlertNav="mAlertNav" ref="header"></Header>
        <Mnav :style="MnavStyle"></Mnav>
        <!--移动端点击导航时遮罩-->
        <transition name="mask">
            <div class="m_nav_mask" v-if="mNavMaskFlag"  @touchstart.prevent ="setMNavMaskFlag"></div>
        </transition>
        <div class="main" ref="main" :style="mainStyle">
            <nuxt></nuxt>
        </div>
        <Footer></Footer>
		<Heart ref="heart"></Heart>
		<Ment ref="ment"></Ment>
    </div>
</template>

<script type="text/ecmascript-6">
    import Header from '~/components/header';
    import Mnav from '~/components/header/Mnav.vue';
    import Footer from '~/components/footer';
	import Heart from '~/components/heart.vue';
	import Ment from '~/components/ment.vue';
    export default{
        components:{
            Header,Footer,Heart,Ment,Mnav
        },
        async created(){
            this.$nextTick(()=>{
                this.$refs.main.style.minHeight=(document.documentElement.clientHeight-60-150)+'px';
            })

        },
        data(){
            return {
                mNavMaskFlag:false,
                mainStyle:{
                    transform:'translateX(0)'
                },
                MnavStyle:{
                    transform:'translateX(-161px)'
                }
            }
        },
        watch:{
            '$route'(){
                this.setMNavMaskFlag();
            }
        },
		methods:{
			leftKey(event){
			  this.$refs.heart.leftKey(event);
			  this.$refs.ment.rightKey(1);
			},
			rightkey(event){
			  this.$refs.ment.rightKey(event);
			},
            setMNavMaskFlag(){

                this.mNavMaskFlag=false;
                this.$refs.header.mAlertNav(true);
                this.mainStyle.transform='translateX(0px)';
                this.MnavStyle.transform='translateX(-161px)';

            },
            mAlertNav(){
                this.mainStyle.transform='translateX(160px)';
                this.MnavStyle.transform='translateX(0px)';
                this.mNavMaskFlag=true;
            }
		}
    }

</script>

<style scoped>
    .m_nav_mask{
        display: none;
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:10;
        background:rgba(0,0,0,0.5);
    }
.main{
    background: linear-gradient(bottom,rgb(247,235,235), rgb(253,251,245));
    transition:0.5s;
}

.mask-enter-active,.mask-leave-active{
    opacity: 1;
    transition:0.5s;
}
.mask-enter,.mask-leave-to{
    opacity: 0;
}

@media screen and (max-width:992px ){
    .m_nav_mask{display: block}
}

</style>
