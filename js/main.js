/*
* @Author: renxiangge
* @Date:   2017-02-28 09:39:52
* @Last Modified by:   renxiangge
* @Last Modified time: 2017-03-02 18:20:48
*/

    //第四页横向进度条拖拽
    var oScroll=document.getElementById('scroll');
    var oSlideBtn=document.getElementById('slide_btn');
    var oSlideBar=document.getElementById('slide_bar');
    var changeNum=parseInt($('.select_number .change_number .change_num_ini .num').text());
    var numberPos=$('.select_number .change_number').position().left;
    
    var slideBarLeft=0;
    var flag=false;
    var leftVal=0;
    var baseNum = 0;
    
    oSlideBtn.addEventListener('touchstart',function(event){
        flag=true;
        var event = event || window.event;
        leftVal = event.changedTouches[0].clientX - oSlideBtn.offsetLeft;

        //解决当鼠标拖动过快时，弹起鼠标，slideBar也会跟随移动；
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    },false);

    oSlideBtn.addEventListener('touchmove',function(event){
        var minItial=parseInt($('.page4 .min_initial').text());
        var maxItial=parseInt($('.page4 .max_initial').text());

        if(!flag){return;}
        var event = event || window.event;
        slideBarLeft = event.changedTouches[0].clientX - leftVal;
        if ( slideBarLeft < 0 ) {
            slideBarLeft = 0;
        }
        else if ( slideBarLeft > oScroll.offsetWidth - oSlideBtn.offsetWidth ) {
            slideBarLeft = oScroll.offsetWidth - oSlideBtn.offsetWidth;
        }
        //横向滚动条跟随滚动
        var slideBarWidth = 0;
        if ( $('#slide_btn').position().left == 0 ) {
            slideBarWidth = 0;
        }else{
            //滑动按钮一半的宽度
            slideBarWidth = parseInt( parseFloat( document.body.clientWidth ) * 0.035 );
        }
        oSlideBar.style.width = slideBarLeft + slideBarWidth + 'px';
        oSlideBtn.style.left = slideBarLeft + 'px';
        //用户滑动选择的值跟随移动
        $('.select_number .change_number').css('left',numberPos+slideBarLeft+'px');
        baseNum = parseInt( ( ( maxItial - minItial ) / ( oScroll.offsetWidth - oSlideBtn.offsetWidth ) ) * slideBarLeft + minItial ) + '元';
        $('.select_number .change_number .change_num_ini .num').text(baseNum);
         
    },false);
    oSlideBtn.addEventListener('touchend',function(event){
        flag=false;
    },false);  
    

    
    //禁止滑动滑块时页面上下滑动
    // document.ontouchstart=function(){
    //     return false;
    // }
    // document.ontouchend=function(){
    //     document.onmousemove=null;//弹起鼠标不做任何操作
    // }

//jQuery
$(function(){

    //loading页面
    var timerLoading=timerCompeted=null;
    document.onreadystatechange = function (){
        var paceProgress = parseInt( $('.pace_progress span').text() );
        if ( document.readyState == "complete" ) {
            console.log('success');
            clearInterval(timerLoading);
            clearInterval(timerCompeted);
            timerCompeted=setInterval(function(){
                if ( paceProgress < 100 ) {
                    paceProgress+=1;
                    $('.pace_progress span').text(paceProgress);
                    if ( paceProgress > 95 ) {
                       $('.pace .small_left').addClass('active'); 
                    } 
                    $('.money_icon').addClass('move'); 
                }else{
                   clearInterval(timerCompeted);
                   $('.loading').animate({
                     opacity:'0'
                   },1000).delay(1500).hide(); 
                }
            },20);
        }else{
            timerLoading=setInterval(function(){

                if ( paceProgress < 95 ) {
                  paceProgress+=1;
                  $('.pace_progress span').text(paceProgress); 
                  $('.money_icon').addClass('move'); 
                }
                
            },20); 
        }


    }
    

    //swiper
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        loop: true,
        hashnav:true,
        hashnavWatchState:true,
        onSlideChangeEnd: function(swiper){

            //进入第一页
            if ( swiper.activeIndex == 1 ) {
                $('.start .page1_top').addClass('active1');
                $('.start .content').addClass('active2');
                $('.start .start_icon').addClass('active3');
                $('.start .page1_bottom').addClass('active4'); 
            }
            //进入第二页
            if ( swiper.activeIndex == 2 ) {
                enterPage2();
            }
            else if ( swiper.activeIndex == 3 ) {
                enterPage3();
            }
        }
    })

    //返回第三页
    $('.comeback').click(function(){
        mySwiper.slideTo(2, 1000, false);
    });


    //点击菱形按钮退出动画
    $('.start_icon').click(function(){
        $('.start .page1_top').addClass('back1').removeClass('active1');
        $('.start .content').addClass('back2').removeClass('active2');
        $('.start .start_icon').addClass('back3').removeClass('active3').delay(1000).hide(0,function(){
            $('.start').hide();
            mySwiper.slideTo(1, 1000, false);
            enterPage2();
        });
        $('.start .page1_bottom').addClass('back4').removeClass('active4');
        
        
    });
   
    //开始答题
    $('.start_answer').click(function(){
        $('.page2 .triangle_bg .triangle_top').addClass('active1').addClass('back1');
        $('.page2 .triangle_bg .triangle_right').addClass('active2').addClass('back2');
        $('.page2 .triangle_bg .triangle_bottom').addClass('active3').addClass('back3');
        $('.page2 .triangle_bg .triangle_left').addClass('active4').addClass('back4');
        $('.page2 .content,.start_answer').delay(1000).hide(0,function(){
            mySwiper.slideTo(2, 1000, false);
            enterPage3();
        });       
    });


    var problemIndex = 0;
    //总分数
    var scoreAll = 0;
    //每题所得分
    var rightScore = 0;

    //第三页(问题汇总)-点击按钮到相应的问题
    $('.page3 .topic').on('click','div',function(){
        $(this).children('span').addClass('active');
        problemIndex = $(this).index();
        changeProblem();
        mySwiper.slideTo(3, 1000, false);
    });

    //第四页-问答
    $('.button_group a').click(function(){
        
        //确定选择的价格后到结果页
        if ( $('.button_group .checkout').length > 0 ) {
            $('.button_group .checkout').removeClass('checkout').addClass('next');
            $('.select_number').hide();
            $('.result_number').show();
            //正确答案
            $('.page4 .result_number .changeList_right .num').text( problemAll[problemIndex].rightAnswer );
            //其他用户答案
            $('.page4 .result_number .changeList_other .num').text( problemAll[problemIndex].otherAnswer );
        

            //判断结果
            //正确答案显示的长度
            var selectRate1 = parseInt( ( ( parseInt( problemAll[problemIndex].rightAnswer ) - parseInt( problemAll[problemIndex].minAnswer ) ) / ( parseInt( problemAll[problemIndex].maxAnswer ) - parseInt( problemAll[problemIndex].minAnswer ) ) ) * 100 );
            $('.result_number .scroll .slide_bar_right').css('width',selectRate1+'%');

            //你的答案显示的长度
            var selectRate2 = parseInt( ( ( parseInt( baseNum ) - parseInt( problemAll[problemIndex].minAnswer ) ) / ( parseInt( problemAll[problemIndex].maxAnswer ) - parseInt( problemAll[problemIndex].minAnswer ) ) ) * 100 );
            $('.result_number .scroll .slide_bar_user').css('width',selectRate2+'%');

            //其他用户答案显示的长度
            var selectRate3 = parseInt( ( ( parseInt( problemAll[problemIndex].otherAnswer ) - parseInt( problemAll[problemIndex].minAnswer ) ) / ( parseInt( problemAll[problemIndex].maxAnswer ) - parseInt( problemAll[problemIndex].minAnswer ) ) ) * 100 );
            $('.result_number .scroll .slide_bar_other').css('width',selectRate3+'%');

            //判断层级大小
            var rightWidth = $('.result_number .slide_bar_right');
            var userWidth = $('.result_number .slide_bar_user');
            var otherWidth = $('.result_number .slide_bar_other');

            var slideSort = get([rightWidth,userWidth,otherWidth]);
            
            slideSort[0].css('z-index','9');
            slideSort[1].css('z-index','8');
            slideSort[2].css('z-index','7');

            //答完一道题，问题汇总页改变相应题目的样式
            $( $('.page3 .topic div')[problemIndex] ).children('span').addClass('active');


        }
        //下一个问题
        else if ( $('.button_group .next').length > 0 ) {
            $('#slide_btn').css('left','0');
            $('#slide_bar').css('width','0');
            $('.select_number .change_number').css('left','17%');
            
            $('.button_group .next').removeClass('next').addClass('checkout');
            $('.result_number').hide();
            $('.select_number').show();

            if ( problemIndex < 9 ) {
               problemIndex++; 
            }else{
               mySwiper.slideTo(4, 1000, false); 
            }
            
            //问题切换
            changeProblem();

            //计算得分
            userScore();
            $('.page5 .result .left_fraction h4').text(scoreAll);
            console.log(scoreAll);
            

        }
        //确定价格后传值
        $('.result_number .changeList_user .num').text( parseInt($('.select_number .change_num_ini .num').text()) );



    });
    




    //分享弹层
    $('.share').click(function(){
        $('.share_wechat').css('display','block');  
    });
    $('.share_wechat').click(function(){
        $(this).css('display','none'); 
    });


    //问题切换
    function changeProblem(){
        //问题
        $('.page4 .content').text( problemAll[problemIndex].problem );
        //用户可选择的最小值
        $('.initial .min_initial,.select_number .change_num_ini .num').text( problemAll[problemIndex].minAnswer );
        //用户可选择的最大值
        $('.initial .max_initial').text( problemAll[problemIndex].maxAnswer ); 
    }

    function enterPage2(){
      //第二页四个菱形进入
        $('.page2 .triangle_bg .triangle_top').addClass('active1');
        $('.page2 .triangle_bg .triangle_right').addClass('active2');
        $('.page2 .triangle_bg .triangle_bottom').addClass('active3');
        $('.page2 .triangle_bg .triangle_left').addClass('active4');
        //第二页文字进入
        $('.page2 .content,.start_answer').addClass('active');  
    }

    function enterPage3(){
        $('.page3 .triangle_bg .triangle_top').addClass('active1');
        $('.page3 .triangle_bg .triangle_right1,.triangle_right2').addClass('active2');
        $('.page3 .triangle_bg .triangle_bottom').addClass('active3');
        $('.page3 .triangle_bg .triangle_left1,.triangle_left2').addClass('active4');
        $('.page3 .topic').addClass('topic_active');
        //话题选择
        // $('.page3 .topic div').each(function(){
        //     $(this).click(function(){
        //         $('.page3 .topic div').each(function(){
        //             $(this).children('span').removeClass('active');
        //         });
        //         $(this).children('span').addClass('active');
        //     });
        // }); 
    }

    /*冒泡排序*/
    function get(arr,event) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j].width() > arr[j+1].width() ) {        //相邻元素两两对比
                    var temp = arr[j+1];        //元素交换
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }

    //计算用户答案所得分数
    function userScore(){

        
        
        //正确答案和用户答案之间的差值比例： ( 正确答案 - 你的答案 ) / 正确答案 * 100 
        var diffScore = parseInt( Math.abs( ( parseFloat( $('.result_number .changeList_right .num').text() ) - parseFloat( $('.result_number .changeList_user .num').text() ) ) / parseFloat( $('.result_number .changeList_right .num').text() ) ) * 100 );
        console.log('diffScore:'+diffScore);
        

        if ( diffScore <= 5 ) {
            rightScore = 10;
        }else if ( diffScore > 5 && diffScore <= 10 ) {
            rightScore = 9;
        }else if ( diffScore > 10 && diffScore <= 20 ) {
            rightScore = 8;
        }else if ( diffScore > 20 && diffScore <= 30 ) {
            rightScore = 7;
        }else if ( diffScore > 30 && diffScore <= 40 ) {
            rightScore = 6;
        }else if ( diffScore > 40 && diffScore <= 50 ) {
            rightScore = 5;
        }else if ( diffScore > 50 && diffScore <= 60 ) {
            rightScore = 4;
        }else if ( diffScore > 60 && diffScore <= 70 ) {
            rightScore = 3;
        }else if ( diffScore > 70 && diffScore <= 80 ) {
            rightScore = 2;
        }else if ( diffScore > 80 && diffScore <= 90 ) {
            rightScore = 1;
        }else if ( diffScore > 90 ) {
            rightScore = 0;
        }
        
        scoreAll+=rightScore;
        console.log('rightScore:'+rightScore);

        if ( scoreAll > 80 && scoreAll <= 100 ) {
            $('.page5 .result .right_score img').attr('src','images/result_01.png');
        }else if( scoreAll > 60 && scoreAll <= 80 ){
            $('.page5 .result .right_score img').attr('src','images/result_02.png');
        }else if( scoreAll > 40 && scoreAll <= 60 ){
            $('.page5 .result .right_score img').attr('src','images/result_03.png');
        }else if( scoreAll > 20 && scoreAll <= 40 ){
            $('.page5 .result .right_score img').attr('src','images/result_04.png');
        }else if( scoreAll > 0 && scoreAll <= 20 ){
            $('.page5 .result .right_score img').attr('src','images/result_05.png');
        }
    
    }

});




var problemAll = [
    {problem:'2015年，“被平均”后我们每人为国家创造了多少GDP？（话题国力）',minAnswer:'20000元',maxAnswer:'80000元',rightAnswer:'49992',otherAnswer:'41111'},
    {problem:'2015年，扣完税费保险，被平均后，我们每人能到手多少钱？',minAnswer:'10000元',maxAnswer:'50000元',rightAnswer:'21996.2',otherAnswer:'32134'},
    {problem:'每天收入在多少钱以下就是国家定义为“贫困”的穷人了？',minAnswer:'1元',maxAnswer:'100元',rightAnswer:'8.2',otherAnswer:'5'},
    {problem:'你最近去过菜市场吗？去超市要花上多少钱才能买到两斤羊肉？',minAnswer:'30元',maxAnswer:'100元',rightAnswer:'59',otherAnswer:'80'},
    {problem:'2016年北京郊区南5.5环（坐地铁去趟天安门要花2个小时）的房价每平米是多少钱？',minAnswer:'10000元',maxAnswer:'100000元',rightAnswer:'40000',otherAnswer:'65000'},
    {problem:'现在给爱车加满1箱汽油花费325元（6.5元/升），这352里税费占多少？',minAnswer:'20元',maxAnswer:'200元',rightAnswer:'146',otherAnswer:'110'},
    {problem:'中央和国家机关的普通公务员出差最贵可以住多少钱的一晚的宾馆？',minAnswer:'200元',maxAnswer:'2000元',rightAnswer:'500',otherAnswer:'1200'},
    {problem:'想在某著名直播平台在线送给女主播一艘“假”快艇，需要支付多少“真”人民币？',minAnswer:'199元',maxAnswer:'3000元',rightAnswer:'1314',otherAnswer:'520'},
    {problem:'2016年那些月薪过万的“高收入”，每个月公司要默默为他们交多少五险一金？',minAnswer:'1000元',maxAnswer:'5000元',rightAnswer:'4410',otherAnswer:'3380'},
    {problem:'在北京三甲医院门诊看病花费3000元，自费部分400元，能报销回多少钱？',minAnswer:'200元',maxAnswer:'2000元',rightAnswer:'560',otherAnswer:'1202'}
];


















