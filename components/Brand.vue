<template>
    <div class="brand clear">
        <div class="container">
            <a class="brand_img" target="_blank" :href="brand[0].target" v-if="brand[0]">
                <img :src="brand[0].img">
            </a>
            <ul class="ul">
                <li v-for="(item,key) in brand" @click="goBrand(key)" :key="key" :class="[key==index ? 'active' : '']"></li>
            </ul>
        </div>
        <div class="operation">
            <div class="next item" @click="next"><i class="icon-18 iconfont">&#xe60d;</i></div>
            <div class="prev item" @click="prev"><i class="icon-18 iconfont">&#xe622;</i></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery';
import axios from 'axios';
import Vue from 'vue'
import Cookie from '~/common/cookie.js';


    export default{
        data(){
            return {
                brand:[],
                index:0,
                flag:true,
                nextClick:['next3d_one','next3d_two','next3d_three','next3d_four','next3d_five','next3d_six'],
                prevClick:['prev3d_one','prev3d_two','prev3d_three','prev3d_four','prev3d_five'],
                _steep:100  //延长执行产生动画，不是真正的动画速度
            }
        },
        async mounted(){

            //this.interval=setInterval(this.next,3000)


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

        },
        destroyed(){
            clearInterval(this.interval);
        },
        methods:{
            next(){
             //   console.log( this.flag );
                if(!this.flag)return;
                clearInterval(this.interval);
                this.flag=false;
                $('.brand a.brand_img').css('background-image',`url()`).html('');
                let current=this.index;
                if(this.index>=(this.brand.length-1))this.index=-1;
                let next=++this.index
                let key = Math.round(Math.random() * (this.nextClick.length - 1))
                this[this.nextClick[key]](current,next);
            },
            prev(){

                if(!this.flag)return;
                clearInterval(this.interval);
                this.flag=false;
                $('.brand a.brand_img').css('background-image',`url()`).html('');
                let current=this.index;
                if(this.index<=0)this.index=this.brand.length;
                let prev=--this.index

                let key = Math.round(Math.random() * (this.prevClick.length - 1))
                this[this.prevClick[key]](current,prev);
            },
            transitionend(){
                this.flag=true;
                $('.brand a.brand_img').attr('href',`${this.brand[this.index].target}`).attr('title',`${this.brand[this.index].title}`).css('background-image',`url(${this.brand[this.index].img})`).html('');
                this.interval=setInterval(this.next,3000)
            },
            goBrand(goIndex){
                if(!this.flag)return;
                clearInterval(this.interval);
                if(this.index==goIndex)return;
                this.flag=false;
                $('.brand a.brand_img').css('background-image',`url()`).html('');
                let arr=this.nextClick.concat(this.prevClick);
                let key = Math.round(Math.random() * (arr.length - 1))

                let current=this.index;
                this.index=goIndex;

                this[arr[key]](current,goIndex);

            },
            next3d_six(current,next){


                $('.brand a.brand_img').css('background-image',`url(${this.brand[this.index].img})`);
                let rowCount=7;
                let columnCount=4;
                let w = 1200/rowCount;
                let h = 360/columnCount;
                let Allcount=rowCount*columnCount;

                let html='';
                for(let i=0;i<Allcount;i++){
                    html += `<div class="idid" style="width:${w}px;height:${h}px;opacity:0.8;position:relative;top:0;left:0;right:0;bottom:0;transform-style:preserve-3d;transition:.8s;">
                        <div style="width:${w}px;height:${h}px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%rowCount)*w}px -${Math.floor((i/rowCount))*h}px;transform: translateZ(0px);"></div>
                        <div style="width:${w}px;height:${h}px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%rowCount)*w}px -${Math.floor((i/rowCount))*h}px; transform: translateZ(0px) rotateY(0deg);transform-origin:center;"></div>
                    </div>`;
                }
                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    //console.log( '我执行了吗' );
                    $('.idid').css('prespective','500px').css('opacity',0);
                    for(let i=0;i<Allcount;i++){
                        let X = Math.round(Math.random() * 180);
                        let Y = Math.round(Math.random() * 180);
                        let Z = Math.round(Math.random() * 180);

                        //transition-delay: ${i*0.05}s;

                        $('.idid').eq(i).animate({}).css('transform',`rotateY(${Y}deg) rotateX(${X}deg) rotateZ(${Z}deg) scale(${1.2+Math.random()*0.5})`);


                        if(i%7==0){
                            $('.idid').eq(i).css('left','-400px');
                        }else if(i%7==1){
                            $('.idid').eq(i).css('left','-200px');
                        }else if(i%7==2){
                            $('.idid').eq(i).css('left','-80px');
                        }else if(i%7==3){
                            $('.idid').eq(i).css('left','0px');
                        }else if(i%7==4){
                            $('.idid').eq(i).css('left','80px');
                        }else if(i%7==5){
                            $('.idid').eq(i).css('left','200px');
                        }else if(i%7==6){
                            $('.idid').eq(i).css('left','400px');
                        }



                        if(Math.floor(i/7)==0){
                            $('.idid').eq(i).css('top','-80px');
                        }else if(Math.floor(i/7)==1){
                            $('.idid').eq(i).css('top','-20px');
                        }else if(Math.floor(i/7)==2){
                            $('.idid').eq(i).css('top','30px');
                        }else if(Math.floor(i/7)==3){
                            $('.idid').eq(i).css('top','150px');
                        }


                    }
                    //console.log( $( '.idid' ).eq( Allcount - 1 ) );
                    $('.idid').eq(Allcount-1).animate({}).on('transitionend',this.transitionend);


                },this._steep)
            },
            next3d_five(current,next){
                let MAX_W=600;
                let w=1200/MAX_W;
                let html='';
                    html += `<div class="idid" style="width:1200px;height:360px;display:flex;overflow:hidden;position:relative;transform-style:preserve-3d;perspective:800px;">
                             <div style="width:1200px;height:360px;position:absolute;top:0;left:0;background-image:url(${this.brand[next].img});transform: translateZ(-600px) translateY(-50px);transition:1s;"></div>
                             <div style="width:${MAX_W}px;height:360px;background-image:url(${this.brand[current].img});background-position: -${(0%w)*MAX_W}px 0px;transform: translateZ(0px);transition:1s;"></div>
                             <div style="width:${MAX_W}px;height:360px;background-image:url(${this.brand[current].img});background-position: -${(1%w)*MAX_W}px 0px;transform: translateZ(0px);transition:1s;"></div>

                    </div>`;

                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').find('div').eq(0).css('transform','translateZ(0px) translateY(0px)');
                    $('.idid').find('div').eq(1).css('transform','translateX(-100%)');
                    $('.idid').find('div').eq(2).animate({}).css('transform','translateX(100%)').on('transitionend',this.transitionend);
                },this._steep)
            },
            prev3d_five(current,prev){
                let MAX_W=600;
                let w=1200/MAX_W;
                let html='';
                html += `<div class="idid" style="width:1200px;height:360px;display:flex;overflow:hidden;position:relative;transform-style:preserve-3d;perspective:800px;">
                             <div style="width:1200px;height:360px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});transition:1s;"></div>
                             <div style="width:${MAX_W}px;height:360px;background-image:url(${this.brand[prev].img});background-position: -${(0%w)*MAX_W}px 0px;transform: translateX(-100%);transition:1s;"></div>
                             <div style="width:${MAX_W}px;height:360px;background-image:url(${this.brand[prev].img});background-position: -${(1%w)*MAX_W}px 0px;transform: translateX(100%);transition:1s;"></div>

                    </div>`;

                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').find('div').eq(0).css('transform','translateZ(-600px) translateY(-50px)');
                    $('.idid').find('div').eq(1).css('transform','translateX(0)');
                    $('.idid').find('div').animate({}).eq(2).css('transform','translateX(0)').on('transitionend',this.transitionend);

                },this._steep)
            },
            next3d_four(current,next){
                let MAX_W=600;
                let w=1200/MAX_W;
                let html='';

                    html += `
                        <div style="width:${MAX_W}px;height:360px;background-image:url(${this.brand[current].img});background-position: -${(0%w)*MAX_W}px 0px;transform: translateZ(0px);"></div>

                    <div class="idid" style="width:${MAX_W}px;height:360px;position:absolute;top:0;right:0;transform-style:preserve-3d;transition:1s;transform-origin: left;transform: translateZ(0px);">
                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(1%w)*MAX_W}px 0px;transform: translateZ(0px);"></div>
                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:0;left:0px;background-image:url(${this.brand[next].img});background-position: -${(0%MAX_W)*MAX_W}px 0px; transform: translateZ(00px) rotateY(180deg);transform-origin:center;"></div>
                    </div>

                        <div style="width:${MAX_W}px;height:360px;z-index:-1;background-image:url(${this.brand[next].img});background-position: -${(1%w)*MAX_W}px 0px; transform: translateZ(0px);transform-origin:center;"></div>
                   `;

                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').animate({}).css('transform','rotateY(180deg) translateZ(0px)').on('transitionend',this.transitionend);
                },this._steep)
            },
            prev3d_four(current,prev){
                let MAX_W=600;
                let w=1200/MAX_W;
                let html='';
                //console.log(prev)
                html += `
                        <div style="width:${MAX_W}px;height:360px;background-image:url(${this.brand[prev].img});background-position: -${(0%w)*MAX_W}px 0px;"></div>

                    <div class="idid" style="width:${MAX_W}px;height:360px;position:absolute;top:0;left:0;transform-style:preserve-3d;transition:1s;transform-origin: right;">
                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:0;right:0;background-image:url(${this.brand[current].img});background-position: -${(0%w)*MAX_W}px 0px;"></div>
                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:0;left:0px;background-image:url(${this.brand[prev].img});background-position: -${(1%MAX_W)*MAX_W}px 0px; transform: rotateY(180deg);transform-origin:center;"></div>
                    </div>

                        <div style="width:${MAX_W}px;height:360px;z-index:-1;background-image:url(${this.brand[current].img});background-position: -${(1%w)*MAX_W}px 0px; transform: translateZ(0px);transform-origin:center;"></div>
                   `;

                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').animate({}).css('transform','rotateY(180deg)').on('transitionend',this.transitionend);
                },this._steep)
            },
            next3d_three(current,next){
                let w=1200/200;
                let h=360/90;
                let count=w*h;
                let html='';
                for(let i=0;i<count;i++){
                    html += `<div class="idid" style="width:200px;height:90px;position:relative;transform-style:preserve-3d;transition:1s;transition-delay: ${i*0.05}s;">
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px;transform: translateZ(0px);"></div>
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(0px) rotateY(180deg);transform-origin:center;"></div>
                    </div>`;
                }
                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').animate({}).css('transform','rotateY(180deg)').eq(count-1).on('transitionend',this.transitionend);
                },this._steep)
            },
            prev3d_three(current,prev){
                let w=1200/200;
                let h=360/90;
                let count=w*h;
                let html='';
                for(let i=0;i<count;i++){
                    html += `<div class="idid" style="width:200px;height:90px;position:relative;transform-style:preserve-3d;transition:1s;transition-delay: ${i*0.05}s;">
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px;transform: translateZ(0px);"></div>
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0px;background-image:url(${this.brand[prev].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(0px) rotateY(180deg);transform-origin:center;"></div>
                    </div>`;
                }
                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').animate({}).css('transform','rotateY(-180deg)').eq(count-1).on('transitionend',this.transitionend);
                },this._steep)
            },
            next3d_two(current,next){
                let MAX_W=100;
                let w=1200/MAX_W;
                let count=w;
                let html='';
                let z=0;
                let zIndex='';
                for(let i=0;i<count;i++){
                    if(i>(count/2)){
                        z--
                        zIndex='z-index:'+z;
                    }
                    html += `<div class="idid" style="width:${MAX_W}px;height:360px;position:relative;${zIndex};transform-style:preserve-3d;transition:1s;transition-delay: ${i*0.08}s;transform: translateZ(-180px)">

                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%w)*MAX_W}px 0px;transform: translateZ(180px);"></div>
                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%w)*MAX_W}px 0px;transform: translateZ(-180px);"></div>

                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:-360px;left:0px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*MAX_W}px 0px; transform: translateZ(180px) rotateX(90deg);transform-origin:bottom;"></div>
                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:360px;left:0px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*MAX_W}px 0px; transform: translateZ(180px) rotateX(-90deg);transform-origin:top;"></div>

                        <div style="width:360px;height:360px;position:absolute;top:0px;left:0px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*MAX_W}px 0px; transform: translateZ(180px) rotateY(90deg);transform-origin:left;"></div>
                         <div style="width:360px;height:360px;position:absolute;top:0px;left:${MAX_W}px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*MAX_W}px 0px; transform: translateZ(180px) rotateY(90deg);transform-origin:left;"></div>


                    </div>`;
                }
                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').animate({}).css('transform','rotateX(-90deg) translateY(180px)').eq(count-1).on('transitionend',this.transitionend);
                },this._steep)
            },
            prev3d_two(current,next){
                let MAX_W=100;
                let w=1200/MAX_W;
                let count=w;
                let html='';
                let z=0;
                let zIndex='';
                for(let i=0;i<count;i++){

                    if(i>(count/2)){
                        z--
                        zIndex='z-index:'+z;
                    }

                    html += `<div class="idid" style="width:${MAX_W}px;height:360px;position:relative;${zIndex};transform-style:preserve-3d;transition:1s;transition-delay: ${i*0.08}s;transform: translateZ(-180px)">

                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%w)*MAX_W}px 0px;transform: translateZ(180px);"></div>
                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%w)*MAX_W}px 0px;transform: translateZ(-180px);"></div>

                        <div style="width:${MAX_W}px;height:360px;position:absolute;top:360px;left:0px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*MAX_W}px 0px; transform: translateZ(180px) rotateX(-90deg);transform-origin:top;"></div>

                         <div style="width:${MAX_W}px;height:360px;position:absolute;top:-360px;left:0px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*MAX_W}px 0px; transform: translateZ(180px) rotateX(90deg);transform-origin:bottom;"></div>

                         <div style="width:360px;height:360px;position:absolute;top:0px;left:0px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*MAX_W}px 0px; transform: translateZ(180px) rotateY(90deg);transform-origin:left;"></div>

                         <div style="width:360px;height:360px;position:absolute;top:0px;left:${MAX_W}px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*MAX_W}px 0px; transform: translateZ(180px) rotateY(90deg);transform-origin:left;"></div>



                    </div>`;
                }
                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').animate({}).css('transform','rotateX(90deg) translateY(-180px)').eq(count-1).on('transitionend',this.transitionend);;
                },this._steep)
            },
            next3d_one(current,next){
                let w=1200/200;
                let h=360/90;
                let count=w*h;
                let html='';
                let zIndex='';
                let zIndex_1=[5,6];
                for(let i=0;i<count;i++){


                    zIndex='';
                    if(zIndex_1.includes(i+1))zIndex='z-index:'+(-i);
                    if(i==10)zIndex='z-index:'+(1);

                    if(i==9)zIndex='z-index:'+(2);

                    if(i==12)zIndex='z-index:'+(1);

                    if(i==13)zIndex='z-index:'+(2);

                    if(i==14)zIndex='z-index:'+(3);

                    if(i==15)zIndex='z-index:'+(7);

                    if(i==16)zIndex='z-index:'+(6);

                    if(i==17)zIndex='z-index:'+(5);

                    if(i==21)zIndex='z-index:'+(2);

                    if(i==22)zIndex='z-index:'+(1);

                    html += `<div class="idid" style="width:200px;height:90px;position:relative;${zIndex};transform-style:preserve-3d;transition:1s;transition-delay: ${i*0.05}s;transform: translateZ(-100px);">
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px;transform: translateZ(100px);"></div>
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px;transform: translateZ(-100px);"></div>

                        <div style="width:200px;height:90px;position:absolute;top:0;left:200px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(100px) rotateY(90deg);transform-origin:left;"></div>
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0px;background-image:url(${this.brand[next].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(100px) rotateY(90deg);transform-origin:left;"></div>

                        <div style="width:200px;height:200px;position:absolute;top:90px;left:0px;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(100px) rotateX(-90deg);transform-origin:top;"></div>

                        <div style="width:200px;height:200px;position:absolute;top:-200px;left:0px;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(100px) rotateX(90deg);transform-origin:bottom;"></div>
                    </div>`;
                }
                $('.brand a.brand_img').html(html);

                setTimeout(()=>{
                    $('.idid').animate({}).css('transform','rotateY(-90deg) translateX(-100px)').eq(count-1).on('transitionend',this.transitionend);;
                },this._steep)
            },
            prev3d_one(current,prev){

                let w=1200/200;
                let h=360/90;
                let count=w*h;
                let html='';

                let zIndex='';
                let zIndex_1=[5,6];

                for(let i=0;i<count;i++){
                    zIndex='';
                    if(zIndex_1.includes(i+1))zIndex='z-index:'+(-i);


                    if(i==10)zIndex='z-index:'+(1);

                    if(i==9)zIndex='z-index:'+(2);

                    if(i==12)zIndex='z-index:'+(1);

                    if(i==13)zIndex='z-index:'+(2);

                    if(i==14)zIndex='z-index:'+(3);

                    if(i==15)zIndex='z-index:'+(7);

                    if(i==16)zIndex='z-index:'+(6);

                    if(i==17)zIndex='z-index:'+(5);

                    if(i==21)zIndex='z-index:'+(2);

                    if(i==22)zIndex='z-index:'+(1);


                    html += `<div class="idid" style="width:200px;height:90px;position:relative;${zIndex};transform-style:preserve-3d;transition:1s;transition-delay: ${i*0.05}s;transform: rotateY(-90deg) translateX(-100px)">
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0;background-image:url(${this.brand[prev].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px;transform: translateZ(100px);"></div>
                        <div style="width:200px;height:90px;position:absolute;top:0;left:0;background-image:url(${this.brand[prev].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px;transform: translateZ(-100px);"></div>

                        <div style="width:200px;height:90px;position:absolute;top:0;left:200px;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(100px) rotateY(90deg);transform-origin:left;"></div>
                         <div style="width:200px;height:90px;position:absolute;top:0;left:0px;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(100px) rotateY(90deg);transform-origin:left;"></div>

                        <div style="width:200px;height:200px;position:absolute;top:90px;left:0px;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(100px) rotateX(-90deg);transform-origin:top;"></div>

                        <div style="width:200px;height:200px;position:absolute;top:-200px;left:0px;background-image:url(${this.brand[current].img});background-position: -${(i%w)*200}px -${Math.floor(i/(w))*90}px; transform: translateZ(100px) rotateX(90deg);transform-origin:bottom;"></div>

                    </div>`;
                }
                $('.brand a.brand_img').html(html);
                setTimeout(()=>{
                    $('.idid').animate({}).css('transform','rotateY(0deg) translateZ(-100px)').eq(count-1).on('transitionend',this.transitionend);;
                },this._steep)
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/css/basic.scss";
    .brand{
        margin-top:5px;
        width:100%;
        height:360px;
        background: #fff;
        position:relative;

    }
    .brand .operation .item{
        width:50px;
        height:50px;
        background:$background;
        /*background:linear-gradient(45deg, rgba(0, 0, 0, .2) 50%, rgba(0, 0, 0, .8) 50%);*/
        line-height:50px;
        text-align: center;
        font-size:20px;
        color:#fff;
        position:absolute;
        font-weight:bold;
        top:50%;
        transform: translateY(-50%);
        cursor:pointer;
        transition:0.5s;
        &:hover{
            background:$backgroundActive;
        }
    }
    .brand .operation .item.prev{
        left:5px;
    }
    .brand .operation .item.next{
        right:5px;
    }

    .brand a.brand_img{
        display: flex;
        width:100%;
        height:360px;
        flex-wrap: wrap;
        perspective:800px;
        background-size: cover;
    }
    .brand .ul{
        position:absolute;
        left:50%;
        bottom:20px;
        display: flex;
        transform: translateX(-50%);
        z-index: 9999;
    }
    .brand .ul li{
        width:12px;
        height:12px;
        border-radius: 50%;
        margin:0 5px;
        border:2px solid #fff;
        cursor:pointer;
        transition:0.5s;
    }
    .brand .ul li:hover{
        background:$background;
    }
    .brand .ul li.active{
        width:20px;
        border-radius: 10px;
        border:none;
        background:$background;
    }



</style>
