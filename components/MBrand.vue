<template>
    <div class="m_brand">
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="banner in brand">
                    <img :src="banner.img">
                </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    import axios from 'axios';
    import Cookie from '~/common/cookie.js';
    import Vue from 'vue';
    import 'swiper/dist/css/swiper.css'
    if(process.client){
        const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
        Vue.use(VueAwesomeSwiper)
    }
   // import { Swiper, Slide } from 'vue-swiper-component';
    export default{
        data(){
            return {
                brand:[],
                swiperOption: {
//                    autoplay: {
//                        delay:1000
//                    },
                    loop:true,
                    initialSlide: 0,
                    pagination: {
                        el:'.swiper-pagination'
                    }
                }
            }
        },

        async created(){

            var htmlWidth;
            if (process.client) {
                htmlWidth = window.innerWidth;
                if ( htmlWidth >= 1200 )return;
            }
            let caChe = this.$store.state.caChe;
            if(Cookie.is('m_brand') && caChe){
                this.brand=JSON.parse(Cookie.get('m_brand'));
                this.brand.forEach((item)=>{
                    item.img=this.$store.state.url.blogApiImageUrl+item.imgUrl+'&m=getSizeImage&type=max&size='+htmlWidth;
                })
            }else {

                axios.get(this.$store.state.url.getBrand).then((res)=>{
                    Cookie.set('m_brand',JSON.stringify(res.data));
                    res.data.forEach(async (item)=>{
                       // item.img=this.$store.state.url.blogApiStaticImageUrl+item.imgUrl;
                        //item.img=this.$store.state.url.blogUrl+'?a=images&uniqueId='+item.imgUrl;
                        item.img=this.$store.state.url.blogApiImageUrl+item.imgUrl+'&m=getSizeImage&type=max&size='+htmlWidth;
                    })
                    this.brand=res.data
                })
            }
        }
    }
</script>

<style>
.m_brand{
    display: none;
    width:100%;
    margin-top:10px;
    transition:0.5s;
}
.m_brand img{
    max-width: 100%;
}

@media screen and (max-width: 1199px) {
    .m_brand{
        display: block;
    }
}


</style>
