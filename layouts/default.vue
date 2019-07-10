<template>
  <div class="body" @click="leftKey($event)" @contextmenu.prevent="rightkey($event)">
    <Header @mAlertNav="mAlertNav" ref="header"></Header>
    <Mnav :style="MnavStyle"></Mnav>
    <!--移动端点击导航时遮罩-->
    <transition name="mask">
      <div class="m_nav_mask" v-if="mNavMaskFlag"  @touchstart.prevent ="setMNavMaskFlag"></div>
    </transition>
    <Brand v-if="flag"></Brand>
    <MBrand></MBrand>
    <div class="main container" :style="mainStyle">
      <div class="left">
        <nuxt></nuxt>
      </div>
      <div class="right">
        <Sidebar></Sidebar>
      </div>
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
  import Sidebar from '~/components/sidebar';
  import Heart from '~/components/heart.vue';
  import Ment from '~/components/ment.vue';
  import Brand from '~/components/Brand.vue'
  import MBrand from '~/components/MBrand.vue'
  export default{
      components:{
          Header,Footer,Sidebar,Heart,Ment,Brand,Mnav,MBrand
      },
      data(){
        return {
          flag:true,
          mNavMaskFlag:false,
          mainStyle:{

          },
          MnavStyle:{
            transform:'translateX(-161px)'
          }
        }
      },
      watch:{
        '$route.path'(){
          this.flag = (this.$route.path =='/');

        },
        '$route'(){
          this.setMNavMaskFlag();
        }
      },
      created(){
        this.flag = (this.$route.path =='/');
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
          this.mainStyle.transform='';
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

<style lang="scss" scoped>

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
  padding:20px 0;
  display: flex;
  justify-content:space-between;
  transition:0.5s;

}
  /*.main .container{*/
    /*margin-top:20px;*/
  /*}*/
  .main .left{
    flex:1;
    max-width:850px;
  }
  .main .right{
    margin-left:10px;
    flex:0 0 340px;
  }


@media screen and (max-width:992px ){
.m_nav_mask{display: block}
    .main{
        padding:10px 0 0 0 ;
    }
  .main .right{
    display:none;
  }
  .main .left{
    max-width:100%;
  }
}


.mask-enter-active,.mask-leave-active{
  opacity: 1;
  transition:0.5s;
}
.mask-enter,.mask-leave-to{
  opacity: 0;
}




</style>
