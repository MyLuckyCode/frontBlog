<template>
  <div class="body" @click="leftKey($event)" @contextmenu.prevent="rightkey($event)">
    <Header></Header>
    <Brand v-if="flag"></Brand>
    <div class="main container clear">
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
  import Footer from '~/components/footer';
  import Sidebar from '~/components/sidebar';
  import Heart from '~/components/heart.vue';
  import Ment from '~/components/ment.vue';
  import Brand from '~/components/Brand.vue'
  export default{
      components:{
          Header,Footer,Sidebar,Heart,Ment,Brand
      },
      data(){
        return {
          flag:true
        }
      },
      watch:{
        '$route.path'(){
          this.flag = (this.$route.path =='/');
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
        }
      }
  }
</script>

<style lang="scss" scoped>

.body{
  padding-top:60px;
}

.main{
  padding:20px 0;
}
  /*.main .container{*/
    /*margin-top:20px;*/
  /*}*/
  .main .left{
    float:left;
    width:850px;
  }
  .main .right{
    float:right;
    width:340px;
  }








</style>
