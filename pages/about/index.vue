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
                    我是个比较贪玩对技术也很热爱的人，性格比较开朗，2015年6月初中毕业之后很迷茫，9月在广州选了一家技校学习技能，我记得那时候报的的计算机应用基础，第一学期我只记得ps和word文档，其他专业忘了，我自学能力比较强，那时候对ps很惊讶，平时没事在宿舍经常上我要自学网看视频教程，学了一阵子也经常拿同学的照片来Ps。就是后来掌握基本工具之后发现我对设计这块没有什么灵感，好像就只会做一些基本的，要我去设计我发现我根本就不行。我记得是12月开始去学习DW这个软件，网页制作，在别的班学的，因为我喜欢上机房课，如果是在教室上的课我都没去直接跑去别的班上机房课，这个软件还比较有趣，也是没事在宿舍上我要自学网看视频课程，慢慢就喜欢上了。
                </li>
                <li class="index">
                    2016年6月我找了一套php视频课程，从那刻起开始入坑，虽然过程断断续续有过放弃的想法，但庆幸的是还是坚持了下来，后面学JavaScript也是坚持下来。
                </li>
            </ul>
            <h4 class="h4">喜欢的话</h4>
            <ul class="introduction">
                <li>
                    <span>读书没有什么用，但这世界的一切，并不都以“有用”与否去衡量的~</span>
                </li>
                <li>
                    <span>时代的狡黠性：总在毫无预警时到来~</span>
                </li>
                <li>
                    <span>去年今日此门中，人面桃花相映红。人面不知何处去，桃花依旧笑春风。</span>
                </li>
                <li>
                    <span>如果你还不知道你喜欢什么，你就真的迷失了~</span>
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
                    网站前端模块基本为自己开发，界面和功能参考的其他博客，少许组件使用element-ui。网站后台采用php语言，2018年底做了第一版，采用MVC模式，没有用任何框架，自己写了一个类似smarty模版的解析引擎，当然我自己写的功能有限但可以满足我后台使用，界面非常丑功能也少，文章的编辑器就用百度的富文本编辑器。大约在2019年4月对后台做了第二版，看了其他博客后台都是用wordPress或Wordpress Rest Api去做，可能是能力不足并不是看的很懂，在百度找了一个看起来不错的界面，加了些许功能就有了现在的后台。
                </li>
                <li class="index">
                    博客取名幸运码没其他意思，我喜欢小幸运这首歌，某一天我在github改名的时候就用了lucky，无奈已被占用，想想github都是代码就改为luckyCode，意为幸运码，没有bug的代码~ ~ ~
                    幸运码主要是记录web开发过程中的坑、笔记、案例的地方，偶尔也是抒发自己情感的地方。我发四，活到老学到老，坚持每周至少更新一篇，也希望文章能让你们少走弯路，互联网让我们走到了一起，我们共同探讨技术、工作、学习、生活。
                </li>
                <li class="index">
                    做博客跟读书一样没有什么用，但这世界的一切，并不都以“有用”与否去衡量的~
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
