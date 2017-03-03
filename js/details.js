/**
 * Created by zhiqingan on 2017/1/11.
 */
import {$$,getRect,createEle} from './func'
export function createDetails(obj) {
    $$(".details").addEventListener('touchstart',function (e) {
        e.preventDefault();
    },false)
    $$(".details .body").addEventListener('touchstart',function (e) {
        e.stopPropagation();
    },false)
    $$(".details .bottom").addEventListener('touchstart',function (e) {
        e.stopPropagation();
    },false)
    $$("#return").addEventListener('touchstart',function (e) {
        e.stopPropagation();
    },false)
    isCheck = true;
    $$("#return").onclick = function () {
        isClick = true;
        isCheck =false;
        $$(".details").classList.add('none');
        $$(".details .bottom .now ").classList.add('none');
        $$(".details .bottom .question ").classList.remove('active');
        $$(".details .bottom #send ").classList.remove('active');
    }
    $$(".details .top .head img").src = obj.headImg;

    $$(".details .body").innerHTML = ''
    var info = createEle('div');
    info.className = 'info';

    var name = createEle('h2');
    name.innerHTML = obj.name;
    info.appendChild(name)

    var p1 = createEle('p');
    p1.innerHTML = '栖息地带：'+ obj['栖息地带'];
    info.appendChild(p1)
    var p2 = createEle('p');
    p2.innerHTML = '活跃领域：'+ obj['活跃领域'];
    info.appendChild(p2)
    var p3 = createEle('p');
    p3.innerHTML = '已获装备：'+ obj['已获装备'];
    info.appendChild(p3)

    $$(".details .body").appendChild(info);

    $$(".details .body").appendChild(createHua(1,'您的问题是...（请从下面选择）'))


    $$(".details .bottom .question").innerHTML = '<div class="title"><span class="pr icon"></span><span class="h1">请选择需要解答的问题</span></div>';
    let da = obj.question;
    for(let i = 0,n=da.length;i<n;i++){
        var q = createEle('div');
        q.className = 'q';
        q.setAttribute('data-id',i);
        q.ontouchend = function () {
            $$(".details .bottom .question").classList.toggle('active')
            var text = this.querySelectorAll('.h1')[0].innerHTML;
            $$(".details .bottom .now .h1").innerHTML = text;
            $$(".details .bottom .now ").classList.remove('none');

            $$(".details .bottom .question").removeChild(this);
            $$("#send").classList.add("active");
            $$("#send").ontouchend = function () {
                if($$("#send").classList.contains('active')){
                    $$("#send").classList.remove("active");
                    $$(".details .bottom .now ").classList.add('none');
                    $$(".details .bottom .now .h1").innerHTML = '';
                    $$(".details .body").appendChild(createHua(0,text));
                    setTimeout(function () {
                        $$(".details .body").appendChild(createHua(1,obj.answer[i]));
                        $$(".details .body").scrollTop = $$(".details .body").scrollHeight - getRect($$(".details .body")).height
                    },300)
                }

            }

        }
        var icon = createEle('span');
        icon.className = 'icon';

        var h1 = createEle('span');
        h1.className = 'h1';
        h1.innerHTML = da[i];

        q.appendChild(icon);
        q.appendChild(h1);
        $$(".details .bottom .question").appendChild(q);
    }
    $$(".details .bottom .question").onclick = function () {
        this.classList.toggle("active");

    }
    listenTop()
    function listenTop() {

        var top = $$(".details .body").scrollTop;
        var start = 260*scale;
        var end = 160*scale;
        var limit = 100*scale;
        var d = top>limit?limit:(start - top);
        var s = (d*11/13)/(220*scale);
        var ops = top>limit?0:(limit - top)/limit;
        if(ops<0.6) {
            $$("#return").classList.add('active')
        }else {
            $$("#return").classList.remove('active')
        }
        $$(".details .top .top-img").style.opacity = ops;
        s = s<0.6?0.6:s;

        $$(".details .top .head").style.transform = 'scale('+s+')';
        $$(".details .top .head").style.webkitTransform = 'scale('+s+')';
        var ds = (d*2/13);
        $$(".details .top .head").style.top = ds +'px';
        if(isCheck){
            window.requestAnimFrame(listenTop);
        }
    }
    function createHua(isL,text) {
        var div = createEle('div');
        div.innerHTML = text;
        div.className = isL?'left':'right';
        div.classList.add('opacity0');
        setTimeout(function () {
            div.classList.remove('opacity0')
        },300)
        return div;

    }
}