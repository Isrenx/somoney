/**
 * Created by zhiqingan on 2017/1/9.
 */
// import lake from './lake';
import {$$,getRect,createEle} from './func';
var langImg = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAACgAA/+EDKGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFN0E0MUZBNEQ3RTMxMUU2QThEQTkwNDlDOTgwMDk2RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFN0E0MUZBNUQ3RTMxMUU2QThEQTkwNDlDOTgwMDk2RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU3QTQxRkEyRDdFMzExRTZBOERBOTA0OUM5ODAwOTZGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU3QTQxRkEzRDdFMzExRTZBOERBOTA0OUM5ODAwOTZGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAFBAQGRIZJxcXJzImHyYyLiYmJiYuPjU1NTU1PkRBQUFBQUFERERERERERERERERERERERERERERERERERERERAEVGRkgHCAmGBgmNiYgJjZENisrNkREREI1QkRERERERERERERERERERERERERERERERERERERERERERERERERE/8AAEQgBJQKAAwEiAAIRAQMRAf/EAIcAAQEBAQEBAQAAAAAAAAAAAAABAgQDBQYBAQEBAQEAAAAAAAAAAAAAAAABAgMEEAACAQEFBQYDBgYCAwEAAAAAAQIRMUFREgMhYZETBHGBoUJSFCIyBfCx8WKSFdHhcoKiI8FDM1NzwhEBAQEBAQACAgMAAAAAAAAAABEBEiFhAkGBMVFx/9oADAMBAAIRAxEAPwDp9uycjtPfnQLzYYnqmuNxzcknJOnnRxGetjQ9Ljm5I5O461V4MUfpBXJydw5O46qS9LFJYFK5uUsByonTt3ijx8Alc3KiXknSot+bwNcqWJFrlWmXlHTypbuAyNYcAVz8pbhykdKhuLlWAK5cixHLWJ1USuYrFXMFcuRFyredVY4DNHBkWubIt5eWt50VW8V+1AV4LTHLOjaKvAi1z8vtLyzooxSQK5+UOUzpoxle4Fc3KZeVuOijBFrm5I5R0mgVy8oco6WVUYq1y8pDlLE6qIbBSublLEclYnTVYE+HB8B6dOfkoclHRmgvwGaBPTrHPyUOQdFYCsB6dOb26Ht950/CXYPTpy8hYjkI6aImVA6cz0EOSkdLisEMqwRTpzcpDlVuOmm5CwFc3K3DknQTbgDp4ckco96slWPTp48snKPfNS1EzLAQ6eHKRHpRVp01WBAnTm5cd5MkTob3eBNmDLDp4OEd4yROiiwYosBE6c/LiTJE6skWOUsGDpyuESZInVytxHobkE6c2RYDIsDpWg8C8l4FK5ciwGRYHVypK4nLkErmyIctHRy5Yl5eJUrm5ZOUdi06/gMlLgOLlkyUO7K8EMtdioKjgyDl9p2yjJekw21bQo5uS95eQ950Ob3cRzWrqj0uOjlw9PgR6ekrV4HyHPUdko13MsZdRdJeBrn5Zr6jj0+7gyOHTvA4Iy6nGL7z0T1ourjs/KOfkrpejp+VR8RkirKHLLV1HtWZGVranrfehNSu1P7VK5O6VO1nI9Zq+vcFq1vXehyV1PWcbWtn5hzXJVTRzfFKzKycpvyoTC69+a1eg9aV21nPydxOTuLMLr35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';
import {createDetails} from './details';
export function load() {
    $$("#musicBtn").ontouchend = function(){
        if(this.classList.contains('active')){
            this.classList.remove('active')
            $$("#bgm").play()
        }else {
            this.classList.add('active');
            $$("#bgm").pause()
        }
    }
    $$(".details .body").style.height = document.documentElement.clientHeight - 114*scale-170*scale +'px';
    // var laker = new lake(null,$$("#lang"),langImg);
    $$(".allW .body .content .tick").style.height = getRect($$(".allW .body .content")).height+'px';
    $$("#goNext").ontouchend = function () {
        $$("#clickM").play();
        $$(".allW .cover").classList.add('goNext');
        $$(".allW .body").classList.add('goNext');
        setTimeout(function () {
            $$("#clickM").pause()
            $$("#bgm").play()
            $$("#musicBtn").classList.remove('none')
            // anmList()
            /*setTimeout(function () {
                $baseanm[0].classList.add('ddanm')
                $baseanm[1].classList.add('ddanm')
                $baseanm[2].classList.add('ddanm')
                $baseanm[3].classList.add('ddanm')
            },500)*/
        },600)
    }
    var divw = document.createDocumentFragment();
    for(let i=0,n=data.length;i<n;i++){
        var li = createEle("div");
        li.className = 'li';

        li.style.marginTop = data[i].top*scale+'px';

        var title = createEle("img");
        title.className = 'title pr baseanm';
        title.src = data[i].titlePic;
        li.appendChild(title)
;
        var text = createEle("img");
        text.className = 'text pr baseanm';
        text.src = data[i].textPic;
        li.appendChild(text);

        var tag = createEle("div");
        tag.className = 'tag pr baseanm';
        var tagImg = createEle("img");
        tagImg.src = data[i].tag;
        tag.appendChild(tagImg);
        li.appendChild(tag)

        var itemW = createEle("div");
        itemW.className = 'itemW';
        itemW.style.height = data[i].h*scale+'px';
        let listData = data[i].list;
        for(let j =0,m=listData.length;j<m;j++){
            var item = createEle("div");
            item.className = 'item pr baseanm';
            item.onclick = function () {
                if(isClick){
                    isClick = false;
                    this.querySelectorAll('.head')[0].classList.toggle('active');
                    createDetails(listData[j])
                    setTimeout(function () {
                        $$(".details").classList.remove('none');
                    },500)
                }

            }

            var head = createEle("div");
            head.className = 'pr head';
            var headImg = createEle("img");
            headImg.src = listData[j].headImg;
            headImg.className = 'center';
            head.appendChild(headImg);

            var intro = createEle("div");
            intro.className = 'intro';
            var name = createEle("p");
            name.className = 'name';
            name.innerHTML = listData[j].name;
            intro.appendChild(name);

            var address = createEle("p");
            address.className = 'address';
            address.innerHTML = '<span>栖息地带：</span>'+'<span>'+listData[j]['栖息地带']+'</span>';
            intro.appendChild(address);

            var area = createEle("p");
            area.className = 'area';
            area.innerHTML = '<span>活跃领域：</span>'+'<span>'+listData[j]['活跃领域']+'</span>';
            intro.appendChild(area);

            var job = createEle("p");
            job.className = 'job';
            job.innerHTML = '<span>已获装备：</span>'+'<span>'+listData[j]['已获装备']+'</span>';
            intro.appendChild(job);

            item.appendChild(head);
            item.appendChild(intro);
            itemW.appendChild(item);

        }
        
        li.appendChild(itemW);
        divw.appendChild(li);

    }
    $$(".depth").appendChild(divw)
    var mingxie = createEle('img');
    mingxie.className = 'mingxie pr baseanm';
    mingxie.src = xingming;
    $$(".depth").appendChild(mingxie);

    var shareDiv = createEle('div');
    shareDiv.className = 'pr sharebox';
    var code = createEle('div');
    code.className = 'code';

    var codeImg = createEle('img');
    codeImg.src = '//news.sohu.com/upload/depth/images/code.png';
    code.appendChild(codeImg);
    var textP = createEle('p');
    textP.innerHTML = '长按查看更多内容';
    code.appendChild(textP);
    code.onclick = function () {
        location.href = clickkan;
    }
    shareDiv.appendChild(code);

    var shareFr = createEle('div');
    shareFr.id = 'shareFr';
    shareDiv.appendChild(shareFr);
    shareFr.ontouchend = () => {
        $$('.share-layer').classList.remove('none');
        $$('.share-layer').ontouchend = (e) => {
            e.target.classList.add('none');
        }
    }
    var info = createEle('img');
    info .src = '//i1.itc.cn/20170117/366b_9c43fd1a_4435_2677_9b95_373156c5b57c_1.png'
    info.className = 'info clearfix';
    shareDiv.appendChild(info);
    /*var liuyan = createEle('a');
    liuyan.href = liuyanHref;
    liuyan.className = 'liuyan clearfix';
    shareDiv.appendChild(liuyan);*/

    /*var chText = createEle('p');
    chText.innerHTML = '- 策划 -';
    chText.className = 'cehuatext';
    shareDiv.appendChild(chText);*/

    var logo = createEle('img');
    logo.className = 'logo';
    logo.src = '//news.sohu.com/upload/depth/images/logo.png';
    shareDiv.appendChild(logo);

    $$(".depth").appendChild(shareDiv)
    isLoad = true;
    var $baseanm = $$(".depth").querySelectorAll('.baseanm');
    // $$(".allW .body").addEventListener('scroll',function () {
    //     anmList()
    // })
    var winHeight = document.documentElement.clientHeight;
    var $dddn = $baseanm.length;
    var dddArr = function () {
        var dd = [];
        var a = parseInt($dddn/10) + ($dddn%10==0?0:1)
        for(let i =0;i< a;i++){
            var d = [];
            for(let j=i*10;j<$dddn;j++){
                if(j%10==0&&j !=i*10){
                    break;
                }
                d.push(j)
            }
            dd.push(d)
        }
        return dd;
    }()
    var num = 0;
    function anmList() {
        // alert(1)
        if($baseanm[$baseanm.length-1].classList.contains('ddanm')){
            return
        }
        for(var i = 0,n=dddArr[num].length;i<n;i++){

            if(getRect($baseanm[dddArr[num][i]]).top<winHeight-20&&getRect($baseanm[dddArr[num][i]]).top>0){
                $baseanm[dddArr[num][i]].classList.add('ddanm');
                if(i==n-1){
                    num++;
                }
                if(num==10){
                    num=0
                }

            }
        }
        window.requestAnimFrame(anmList)
    }
}