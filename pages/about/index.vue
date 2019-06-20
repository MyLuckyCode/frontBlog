<template>
    <div class="container">
        <div class="about">
            <div class="head-wrapper">
                <div class="head-content">

                </div>
                <div class="head-data"></div>
            </div>
            <h4 class="h4">站长简介</h4>
            <ul class="introduction">
                <li>
                    <span>网名：Lucky</span>
                    <span>民族：汉</span>
                </li>
                <li>
                    <span>星座：双鱼座</span>
                    <span>学历：大专</span>
                </li>
                <li>
                    <span>籍贯：广东揭阳</span>
                    <span>专业：剁猪脚</span>
                </li>
                <li>
                    <span>职业：Web前端开发者</span>
                    <span>坐标：广州-越秀区</span>
                </li>
                <li>
                    <span style="font-size:16px;margin-top:10px;">自我说明：</span>
                </li>
                <li class="index">
                    我是个比较贪玩对技术也很热爱的人，性格比较开朗，2015年6月初中毕业之后很迷茫，9月在广州选了一家技校学习技能，我记得那时候报的的计算机应用基础，进去之后第一学期学ps，word文档，没事经常去自学网看视频教程学，还算不错，但是我掌握ps基本工具之后就发现我不适合，因为我除了去p同学恶搞之外对其他根本就提不起兴趣，而且设计好像还需要灵感，我知道我根本就不行，慢慢得我把ps当成是一种技能但不是主攻的技能。
                </li>
                <li class="index">
                    因为我们除了计算机课之外还有其他课，比如语文和英语或者在教室上的技能课，我对这些不是很感兴趣，所以除了去机房上课我就跑到别的班去上机房课，反正基本都是在机房上，我去听了别的老师的讲课，我记得是12月开始去学习DW这个软件，网页制作，在别的班学的，因为我喜欢上机房课，如果是在教室上的课我都没去直接跑去别的班上机房课，这个软件还比较有趣，也是没事在宿舍上我要自学网看视频课程，慢慢就喜欢上了。
                </li>
                <li class="index">
                    在自学网的视频中我知道了php这门语言，我找了一套php视频课程，从那刻起开始入坑，没有用DW这个软件做，但代码还是在这个软件里面打的，因为我还不懂网页界面怎么用代码去打，比如表格代码，我不会，只能用DW去帮我做，然后打上php代码，就这样一点一点去学，后来渐渐发现不能再用DW了，想要做出更好看的网站只有学习前端代码，单靠DW这种图形界面做出来的网站功能有限也不符合自己的理想。
                </li>
                <li class="index">
                    还是百度，搜了一些html+css的视频课程，学到后面能自己用代码去写一些简单的界面，之后就自己在百度找项目教程，找不到比较好的或是完整的，那个时候还不会JavaScript，又去自学的JavaScript，学完JavaScript之后又感觉很迷茫，因为我不太确定到底会不会，有没有学会，经常有一种想要做一个大项目但想想这个功能不会那个功能不会就放弃了。
                </li>
                <li class="index">
                    后来改变一种思路去学，先从小功能去做，比如做一个轮播图，或者360首页那个点击切换的功能，一点一点的去积累，做完之后大项目还是不会，又迷茫跑去学php，php学了一整子又想学这个有用吗之类的想法，不过庆幸的是我还是坚持看完第一季，因为我学的php教程分为四个季度，第一季学到后面有一个项目，这个项目应该说对于现在的我来讲还是大型的博客。
                </li>
                <li class="index">
                    在学js和php的时候，跟着视频的老师敲，我的html+css也得到了很大的提升，开始尝试去做一个完整的项目，以前就是想想也不敢去做，现在知道有一些不会但还是敢去做的，因为学了php和js以及在做博客的过程中慢慢明白了很多东西并不是一开始就会的，可能现在没有思路但做着做着就有了。
                </li>
                <li class="index">
                    从学校出来之后做了之后不是特别忙，微信小程序又刚好比较热门，当时还没有视频教程，我是自己去官网看文档的，那时自己有比较中等的js能力了，小程序都能看的懂，然后我第一个小程序就搞定了，想上线，小程序是个人的，涉及到资质的问题没法上线。自己也慢慢的在工作中陆续学会了Node、Vue、React，也做过很多项目包括小程序。
                </li>
            </ul>
            <h4 class="h4">喜欢的话</h4>
            <ul class="introduction">
                <li>
                    <span>时代的狡黠性：总在毫无预警时到来~</span>
                </li>
                <li>
                    <span>所有的伟大，源于一个勇敢的开始~</span>
                </li>
                <li>
                    <span>要有居安思危的忧患，也要有居危思安的自信~</span>
                </li>
                <li>
                    <span>灵感并不是在逻辑思考的延长线产生的，而是在破除逻辑或常识的地方才有灵感~</span>
                </li>
                <li>
                    <span>众人寻他千百度，蓦然回首，却在灯火阑珊处~</span>
                </li>
            </ul>
            <h4 class="h4">博客介绍</h4>
            <ul class="introduction">
                <li class="index">
                    网站前端模块基本为自己开发，界面和功能参考的其他博客，少许组件使用element-ui。网站后台采用php语言，2018年底做了第一版，采用MVC模式，自己写了一个类似smarty模版的解析引擎，当然我自己写的功能有限但可以满足我后台使用，界面非常丑功能也少，文章的编辑器就用百度的富文本编辑器。大约在2019年4月对后台做了第二版，在百度找了一个看起来不错的界面，加了些许功能就有了现在的后台。
                </li>
                <li class="index">
                    博客取名幸运码没其他意思，我喜欢小幸运这首歌，某一天我在github改名的时候就用了lucky||luckyCode，无奈已被占用就改为myLuckyCode，意为我的幸运码，没有bug的代码~ ~ ~幸运码主要是记录web开发过程中的坑、笔记、案例的地方，偶尔也是抒发自己情感的地方。我发四，活到老学到老，坚持每周至少更新一篇，也希望文章能让你们少走弯路，互联网让我们走到了一起，我们共同探讨技术、工作、学习、生活。
                </li>
                <li class="index">
                    也许做博客跟读书一样没什么用，但这世界的一切，并不都以“有用”与否去衡量的~
                </li>
            </ul>
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
    .container{
        padding-top:10px;
    }
    .about{
        width:1000px;
        border-radius: 4px;
        background:#fff;
        margin:0 auto;
        padding:15px;
        border:1px solid #e6e6e6;
    }
    .head-wrapper{
        height:300px;
        background:url(~/assets/img/aboutHeader.jpg);
        background-size:cover ;
        background-position:50%;
        border-bottom: 5px solid #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,.46);
    }
    .h4{
        font-size:16px;
        font-weight:700;
        margin:10px -15px;
        padding-left:10px;
        border-left:5px solid rgb(106,230,120);
        border-bottom:1px solid rgb(106,230,120);
        height:32px;
        line-height:32px;
        border-radius:1px;
        color:rgb(120,120,120);
        background:rgb(251,251,251);
    }
    .introduction{
        font-size:14px;
        color:#666;
    }
    .introduction li{
        padding:0 20px;
        line-height:36px;
        display: flex;
        justify-content:space-between;
    }
    .introduction li > span{
        flex:1;
        line-height: 36px;
    }
    .introduction li.index{
        text-indent:2em;
        margin-bottom: 10px;
    }
    .introduction li.blogView{
        flex-direction: column;
    }
    .introduction li.blogView > img{
        object-fit: contain;
        width:100%;
    }

</style>
