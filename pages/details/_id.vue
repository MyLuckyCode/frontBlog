<template>
    <div>
        <div class="details" ref="details" >
            <div class="Exhibition" @click="exhibition" title="阅读模式"><i class="icon-18 iconfont" v-if="exbition">&#xe622;</i><i class="icon-18 iconfont" v-else>&#xe60d;</i></div>
            <div class="title">{{item.title}}</div>
            <div class="info">
                <span><i class="icon-10 iconfont">&#xe7d5;</i>{{item.date}}</span>
                <span><i class="icon-10 iconfont">&#xe7d2;</i>{{item.readCount}}</span>
                <span><i class="icon-10 iconfont">&#xe619;</i> {{item.commentCount}} 条评论</span>
                <span><i class="icon-10 iconfont">&#xe60c;</i>{{item.fabulous}} 喜欢</span>
                <span>{{item.source==1 ? '原创' : '转载'}} <strong>·</strong>{{item.author}}</span>
            </div>
            <div class="content" ref="content" @selectstart.stop v-html="detailContent.replace(/https?:\/\/(\w+\.)+\w+:\d+/g, '')"></div>
            <div class="call">
                <div class="bottom">
                    两年博客，如果觉得我的文章对你有用，请打call
                </div>
                <button class="call_num" @click="add_call" :title="[call.disabled ? '你已经点过赞了' : '听说点赞都成大牛了']" :disabled="call.disabled" :style="{cursor:call.disabled ? 'not-allowed' : 'pointer'}">
                    <i class="icon-14 iconfont">&#xe60c;</i>( <span>{{item.fabulous}}</span> )
                </button>
            </div>
            <div class="label">
                <span><i class="icon-14 iconfont">&#xe794;</i>标签：</span>
                <span class="label-item" v-for="(label,index) in item.label" :key="index">{{label.name}}</span>
            </div>
            <div class="link">
                <div class="prev">
                    <p>上一篇：
                        <nuxt-link v-if="prev.id" :to="{name:'details-id',params:{id:prev.id}}">{{prev.title}}</nuxt-link>
                        <span v-else>{{prev}}</span>
                    </p>
                </div>
                <div class="next">
                    <p>下一篇：
                        <nuxt-link v-if="next.id" :to="{name:'details-id',params:{id:next.id}}">{{next.title}}</nuxt-link>
                        <span v-else>{{next}}</span>
                    </p>
                </div>
            </div>
            <div class="comment">
                <h3>共有<span> {{item.commentCount}} </span>评论</h3>
                <form action="" @submit.prevent="addComment($event)" v-if="item.flagComment==1" >
                    <!--<p id="q">贴  图： <a href="javascripg:;">Q图系列[1]</a><a href="javascripg:;">Q图系列[2]</a><a href="javascripg:;">Q图系列[3]</a></p>-->
                    <p class="reply" v-if="comment.setComment">回复给<span>{{commentPost.name}}</span> <a href="javascript:;" style="color:red;" @click="cancel">点击取消回复</a></p>
                    <textarea name="" required id="" ref="textarea" v-model="form.content" rows="5" maxlength="100"></textarea>
                    <input type="text" class="text" autocomplete="on" required v-model="form.name" maxlength="8" placeholder="昵称[必填]">
                    <input type="email" class="text" autocomplete="on" required v-model="form.email" maxlength="20" placeholder="邮箱[必填]">
                    <input type="url" class="text" autocomplete="on" v-model="form.url" maxlength="100" placeholder="网址(可不填)">
                    <button type="submit" :disabled="form.disabled" :style="{cursor:form.disabled ? 'not-allowed' : 'pointer'}" :class="{loading:form.disabled}" >发表评论</button>
                </form>
                <div v-else style="text-align: center;color:#ccc;font-size:12;">该文章已关闭评论</div>
            </div>
            <div class="commentList">
                <CommentItem v-for="(item,index) in commentList" :item="item" :index="index" @setComment="setComment"></CommentItem>
                <div class="off" v-if="commentList.length==0 && !comment.commentLoading">
                    暂无评论
                </div>
                <div class="loadingMask" v-if="comment.commentLoading">
                    <div class="wrapper clear">
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                        <div class="obj"></div>
                    </div>
                </div>
                <button type="button" v-if="!comment.commentLoading && commentList.length!=0" class="getCommentMore" :disabled="comment.disabled" @click="getCommentMore" :style="{cursor:comment.disabled ? 'not-allowed' : 'pointer'}" :class="{loading:comment.buttonLoading}" >{{comment.html}}</button>
            </div>
        </div>
        <transition name="bg" @after-enter="bgEnter" @before-leave="bgLeave">
            <div class="bg" @click="exhibition" v-show="bg_flag"></div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import Cookie from '~/common/cookie.js';

import CommentItem from '~/components/comment-item.vue';
import {setStorage,getStorage,isStorage} from '~/common/localStorage.js';
import {getOsInfo,getBrowerInfo} from '~/common/system.js';
import {Notification,Message} from 'element-ui'
    let COMMENT_COUNT = 1 ;
    export default{
        async asyncData(content){
            let list = await axios.get(content.store.state.url.getArticleOne,{
                params:{
                    id: content.params.id
                }
            });
            if(list.data.content.info!=undefined){
                if(list.data.content.info=='no'){
                     content.redirect('/error');
                }
            }
            return {item:list.data.content,prev:list.data.prev,next:list.data.next};
        },
        data(){
            return {
                call:{
                    disabled:false
                },
                bg_flag:false,
                exbition:false,
                form:{
                    content:'',
                    name:'',
                    email:'',
                    url:''
                },
                comment:{
                    setComment:false,
                    commentLoading:false,
                    disabled:false,
                    buttonLoading:false,
                    html:'加载更多'
                },
                commentPost:{},
                commentList:[]
            }
        },
        components:{
            CommentItem
        },
        methods:{
            setContentATarget(){    //设置 文章中的 链接 采用 nuxt方式跳转
                let arr = this.$refs.content.querySelectorAll('a[target=nuxt]') ;
                let that =this;
                for(let i=0;i<arr.length;i++){
                    arr[i].onclick=function(e){
                        e.preventDefault();
                        that.$router.push({path:this.getAttribute('url')})
                    }
                }
            },
            add_call(){
                let name='details_call_'+this.$route.params.id
                if(!isStorage(name)){
                    //return;
                    this.call.disabled=true;
                    axios.get(this.$store.state.url.setFabulous,{
                            params:{
                                id:this.$route.params.id
                            }
                        }).then((res)=>{
                        console.log( res.data );
                        if(res.data==1){
                                setStorage(name,true);
                                this.item.fabulous++;
                            }else {
                                this.call.disabled=false;
                            }
                        });
                }
            },
            exhibition(){
                this.bg_flag=!(this.bg_flag);
            },
            _getComment(start,end,fn){
                console.log( this.item );
                axios.get(this.$store.state.url.getComment,{
                    params:{
                        content_id:this.item.id,start,end
                    }
                }).then(fn);
            },
            getCommentMore(){
                this.$set(this.comment,'disabled',true);
                this.$set(this.comment,'buttonLoading',true);
                this._getComment(this.commentList.length,COMMENT_COUNT,(res)=>{
                    this.commentList=this.commentList.concat(res.data);

                    this.$set(this.comment,'buttonLoading',false);

                    if(res.data.length==0 || res.data.length<COMMENT_COUNT ) {
                        this.$set(this.comment,'html','到底了~');
                        return;
                    }
                    this.$set(this.comment,'disabled',false);
                    console.timeEnd('test');
                });
            },
            bgEnter(){
                this.$refs.details.style.width=1200+'px';
                this.exbition=true;
            },
            bgLeave(){
                this.$refs.details.style.width='100%';
                this.exbition=false;
            },
            async addComment(){
                this.$set(this.comment,'commentLoading',true)
                this.$set(this.form,'disabled',true)
                let formData=new FormData();
                for(let i in this.form){
                    formData.append(i,this.form[i]);
                }

                let sys={};
                let osInfo = getOsInfo();
                let browserInfo = getBrowerInfo();
                sys['osVersion'] = osInfo.version;
                sys['browser'] = browserInfo.client.type+' '+browserInfo.client.version;


                formData.append('content_id',this.item.id);
                formData.append('browser',JSON.stringify(sys));

                if(this.commentPost.pid){
                    formData.append('pid',this.commentPost.pid);
                }

                if(this.commentPost.p_name){
                    formData.append('p_name',this.commentPost.p_name);
                }

                let res = await axios.post(this.$store.state.url.addComment,formData,{
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                });
                if(res.data!=0){
                    this.item.commentCount++;
                    this.form={};

                    if(this.commentPost.pid == undefined){
                        Notification({
                            title: '评论成功',
                            message: '你的评论已经成功提交，但你可能需要加载更多或刷新页面才能看到',
                            type: 'success',
                            position: 'bottom-right',
                            duration: 0
                        });
                        this.$set(this.comment,'commentLoading',false)
                        this.commentPost={};
                        return;
                    }

                    this._getComment(0,this.commentList.length,(res)=>{

                        this.commentList=res.data;
                        this.$set(this.comment,'commentLoading',false)
                        this.commentPost={};
                        this.comment.setComment=false;
                        Message({
                            message: '评论成功',
                            type: 'success',
                            duration:5000
                        });
                    });
                }
                console.log(res);
            },
            setComment(obj){
                this.commentPost={};
                this.comment.setComment=true;
                this.$refs.textarea.focus();
                this.commentPost.pid=obj.pid;
                console.log(obj)
               if(!obj.p_name){
                   this.commentPost.name=obj.name;
               }else {
                   this.commentPost.name=obj.p_name;
                   this.commentPost.p_name=obj.p_name;
               }
            },
            cancel(){
                this.commentPost={};
                this.comment.setComment=false;
            }
        },
        mounted(){
            this.call.disabled=isStorage('details_call_'+this.$route.params.id);
            if(!Cookie.is( 'details_count_'+this.$route.params.id )){
                axios.get(this.$store.state.url.setReadCount,{
                    params:{
                        id:this.$route.params.id
                    }
                }).then((res)=>{
                    if(res.data==1){
                        this.item.readCount++;
                        Cookie.set('details_count_'+this.$route.params.id,true,'current');
                    }
                });
            }

            this.setContentATarget();

            try{
                process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
            }catch(e){}

        },
        async created(){

            this.$set(this.comment,'commentLoading',true)
            this._getComment(0,COMMENT_COUNT,(res)=>{
                this.commentList=res.data;
                console.log(res)
                this.$set(this.comment,'commentLoading',false)

                if(res.data.length==0 || res.data.length < COMMENT_COUNT ) {
                    this.$set(this.comment,'html','到底了~');
                    this.$set(this.comment,'disabled',true);
                }

            });
        },
        computed:{
            detailContent(){
                console.log('内容发送变化了');
                let content=this.item.content;

                // 匹配跳到站内的链接
                let content1= content.replace(/\{\{\[a\s*href=(.+?)\s*\](.+?)\[\/a\]\}\}/g,'<a url="$1" target="nuxt" class>$2</a>');

                //匹配站内的  编程代码
                let exp=new RegExp('<pre class="brush:(.+?);toolbar:false\">([\\s\\S]+?)</pre>','g');
                let content2 = content1.replace(exp,'<pre class="line-numbers"><code class="language-$1">$2</code></pre>');
                //匹配站内的图片
                let content3=content2.replace(/<img src=\"([^https|http].+?)\"/g,'<img src="'+this.$store.state.url.blogUrl+'$1"');

                //匹配站内的文件链接
                let content4 =content3.replace(/<a href=\"([^https|http].+?)\"/g,'<a href="'+this.$store.state.url.blogUrl+'$1" download="demo"');
                let content5 =content4.replace(/<a (.*) href=\"([^https|http].+?)\"/g,'<a $1 href="'+this.$store.state.url.blogUrl+'$2" download="demo"');
                return content5;
            }
        },
        head(){
            return {
                title:this.item.title,
                link:[
                    { hid: 'prism', rel: 'stylesheet', href: this.$store.state.url.blogUrl+'frontStatic/css/prism.css' }
                ],
                meta:[
                    { hid: 'keywords', name: 'keywords', content:this.item.keyword},
                    { hid: 'description', name: 'description', content: this.item.info }
                ],
                script: [
                    { src: this.$store.state.url.blogUrl+'frontStatic/js/prism.js' }
                ]
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import "@/assets/css/basic.scss";
    .details{
        background:#fff;
        border-radius:4px;
        padding:15px;
        position:relative;
        transition:1s;
        width:100%;
        z-index: 4;
    }
    .details .Exhibition{
        position: absolute;
        top:25px;
        right:-2px;
        width:35px;
        height:30px;
        color:#fff;
        text-align:center;
        line-height:30px;
        font-weight: bold;
        font-size:20px;
        background:rgb(106,230,120);
        cursor:pointer;
    }
    .details .title{
        text-align: center;
        font-size:20px;
        height:60px;
        line-height:60px;
        color:rgb(90,90,90);
    }
    .details .info {
        text-align:center;
        border-bottom:1px dashed #ccc;
        padding-bottom:20px;
    }
    .details .info span{
        font-size:12px;
        display:inline-block;
        margin-right:25px;
        vertical-align: bottom;
        color:rgb(90,90,90);
    }
    ::selection{
        background:rgb(106,230,120);
        color:#fff;
    }
    .details .call{
        margin-top:30px;
    }
    .details .call .bottom{
        height:30px;
        text-align:center;
        line-height:30px;
        color:#fff;
        font-size:15px;
        border-radius:5px;
        background:rgb(206,238,210);
    }
    .details .call .call_num {
        display:block;
        background:red;
        height:40px;
        width:90px;
        text-align:center;
        line-height:40px;
        background:$background;
        color:#fff;
        letter-spacing: 0px;
        font-size:14px;
        margin:20px auto;
        transition:0.3s;
        border:none;
        outline: none;
        cursor:pointer;
        &:hover{
            background:$backgroundActive;
        }
    }

    .details .call .call_num span{
        vertical-align:-1px;
        font-size:15px;
        line-height:20px;
    }
    .details .label{
        font-size:14px;
    }
    .details .label .label-item{
        display:inline-block;
        padding:2px 5px;
        font-size:12px;
        color:#fff;
        margin-left:5px;
        border-radius:2px;
        cursor:pointer;
        background:$background;
        transition:1s;
        &:hover{
            background:$backgroundActive;
        }
    }
    .details .link{
        margin-top:20px;
    }
    .details .link p{
        height:30px;
        line-height:30px;
        font-size:14px;
        color:rgb(80,80,80);
    }
    .details .link p a{
        text-decoration:none;
        color:rgb(80,80,80);
        &:hover{
            color:$colorActive;
             text-decoration:underline ;
        }
    }
    .details .comment{
        margin-top:20px;
    }
    .details .comment h3{
        height:30px;
        line-height:30px;
        color:#666;
        border-bottom:1px solid #f1f1f1;
        font-weight:normal;
        font-size:16px;
        position:relative;
    }
    .details .comment h3 span{
        color:rgb(106,230,120);
    }
    .details .comment h3:after{
        content:'';
        position:absolute;
        top:29px;
        left:0;
        width:130px;
        height:1px;
        background:rgb(106,230,120);
    }
    .details .comment form{
        margin-top:20px;
        display: flex;
        flex-wrap: wrap;
    }
    .details .comment form .reply{
        padding:3px 0;
        font-size:16px;
        margin-top:-10px;
        margin-bottom: 5px;
        padding-left:5px;
        text-align:left;
        flex:1;
    }
    .details .comment form .reply span{
        color:rgb(106,230,120);
    }
    .details .comment form .reply a{
        margin-left:10px;
        font-size:15px;
    }
    .details .comment form .reply a:hover{
        text-decoration: underline;
        color:rgb(106,230,120);
    }
    .details .comment form textarea{
        background:rgb(245,245,245);
        width:100%;
        height:90px;
        resize:none;
        border:none;
        outline: none;
        padding:10px;
        border-radius:5px;
        font-size:16px;
        transition:0.2s;
        margin-bottom:15px;
        color:rgb(80,80,80);
    }
    .details .comment form textarea:focus{
        background:rgb(233,233,233);
    }
    .details .comment form input:not([type=submit]),.details .comment form input[class=text]{
        width:220px;
        height:35px;
        background:rgb(245,245,245);
        margin-right:15px;
        border:none;
        padding-left:10px;
        border-radius:3px;
        color:rgb(80,80,80);
        outline: none;
        transition:0.2s;
        flex:3;
    }
    .details .comment form input[class=text]{   /*兼容IE8*/
        width:220px;
        height:35px;
        background:rgb(245,245,245);
        margin-right:15px;
        border:none;
        padding-left:10px;
        border-radius:3px;
        color:rgb(80,80,80);
        outline: none;
        transition:0.2s;
        flex:3;
    }
    .details .comment form input:not([type=submit]):focus{
        background:rgb(233,233,233);
    }
    .details .comment form button[type=submit]{
        width:165px;
        height:35px;
        border:none;
        background:$background;
        color:#fff;
        font-size:15px;
        cursor:pointer;
        transition:1s;
        flex:2.5;
        &:hover{
            background:$backgroundActive;
        }
    }
    .details .comment form button[type=submit].loading::before{
        content:'\e600';
        font-size:16px;
        font-family: iconfont;
        color: #fff;
        display:  inline-block;
        margin-right:5px;
        animation: addButton 2s linear infinite;
    }
    .details .commentList{
        margin-top:20px;
        position:relative;
        min-height:70px;
        width:100%;
    }
    .details .commentList .off{
        text-align:center;
        color:rgb(155,155,155);
    }
    .details .commentList .loadingMask{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        background: rgba(255,255,255,0.8);
    }
    .details .commentList .loadingMask .wrapper{
        display: flex;
        justify-content: center;
    }
    .details .commentList .loadingMask .wrapper .obj{
        width:8px;
        height:50px;
        margin-right:5px;
        background: rgb(106,230,120);
        animation:animate 1s infinite;

    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(2){
        animation-delay: 0.2s;
    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(3){
        animation-delay: 0.3s;
    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(4){
        animation-delay: 0.4s;
    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(5){
        animation-delay: 0.5s;
    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(6){
        animation-delay: 0.6s;
    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(7){
        animation-delay: 0.7s;
    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(8){
        animation-delay: 0.8s;
    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(9){
        animation-delay: 0.9s;
    }
    .details .commentList .loadingMask .wrapper .obj:nth-child(10){
        animation-delay: 1s;
    }
    .details .commentList .getCommentMore{
        display: block;
        width:165px;
        height:35px;
        color:#fff;
        background:$background;
        border:none;
        cursor:pointer;
        transition:0.5s;
        font-size:15px;
        margin:0 auto;
        margin-top:15px;
        &:hover{
            background:$backgroundActive;
        }
    }
    .details .commentList .getCommentMore.loading::before{
        content:'\e600';
        font-size:16px;
        font-family: iconfont;
        color: #fff;
        display:  inline-block;
        margin-right:5px;
        animation: addButton 2s linear infinite;
    }
    #q{
        padding:3px 0;
        font-size:12px;
        margin-bottom: 5px;
        padding-left:5px;
    }
    #q a{
        padding:0 5px;
    }


    .bg{
        position:fixed;
        left:0;
        right:0;
        bottom:0;
        top:0;
        background:#000;
        z-index: 3;
        opacity: 0.5;
    }


    .bg-enter-active,.bg-leave-active{
        opacity: 0.5;
        transition:1s;
    }
    .bg-enter,.bg-leave-to{
        opacity: 0;
    }


@keyframes animate{
    from{
        transform:scaleY(100%);
    }
    50%{
        transform:scaleY(0);
    }
    to{
        transform:scaleY(100%);
    }
}

@keyframes addButton{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}

</style>
