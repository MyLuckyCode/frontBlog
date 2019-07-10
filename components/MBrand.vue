<template>
    <div class="m_brand">
        <Swiper v-if="brand.length > 0" :autoPlay="false" interval="2500" duration="500">
            <Slide v-for="(item,index) in brand" :key="index">
                <img :src="item.img" alt="">
            </Slide>
        </Swiper>
    </div>
</template>

<script type="text/ecmascript-6">

    import axios from 'axios';
    import Cookie from '~/common/cookie.js';
    import Vue from 'vue';
    import { Swiper, Slide } from 'vue-swiper-component';
    export default{
        data(){
            return {
                brand:[]
            }
        },
        components: {
            Swiper,
            Slide
        },
        async mounted(){

            //this.interval=setInterval(this.next,3000)
            if (process.client) {
                let htmlWidth = window.innerWidth;
                if ( htmlWidth >= 1200 )return;
            }
            let caChe = this.$store.state.caChe;
            if(Cookie.is('brand') && caChe){
                this.brand=JSON.parse(Cookie.get('brand'));
                this.brand.forEach((item)=>{
                    let img=new Image();
                img.src=item.img;
            })

            }else {
                axios.get(this.$store.state.url.getBrand).then((res)=>{
                    res.data.forEach(async (item)=>{
                    item.img=this.$store.state.url.blogApiStaticImageUrl+item.imgUrl;
                    //item.img=this.$store.state.url.blogUrl+'?a=images&uniqueId='+item.imgUrl;
                    let img=new Image();
                    img.src=item.img;
                })
                    Cookie.set('brand',JSON.stringify(res.data));
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
