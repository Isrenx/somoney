/**
 * Created by zhiqingan on 2017/1/9.
 */
import Preload from './Preload';
import {$$} from './func';
const resources = [
    '//news.sohu.com/upload/depth/images/Literature_t1.png',
    


]

let loader = new Preload (
    {
        resources: resources,
        onStart: function(total) {
            console.log("加载资源……")
        },
        onProgress: function(current, total) {},
        onComplete: function(total) {
            var a = 0;
            function progress(){
                a++;
                $$(".pace-progress").innerHTML = a+"%";
                if(a>=100||isLoad){
                    a=100;
                    $$(".pace-progress").innerHTML = "100%";
                    setTimeout(function () {
                        $$(".loading").classList.add('none');
                        $$(".cover .top .title").classList.remove('opacity0');
                        setTimeout(function () {
                            $$(".cover .top .huan .right_bottom").classList.remove('opacity0','scale0')
                            $$(".cover .top .huan ").classList.add('active')
                        },200)
                    },200)
                    return;
                }
                requestAnimFrame(progress);
            }
            progress();
            console.log("加载完成")
        }
    }
)

document.addEventListener('DOMContentLoaded', function () {
    loader.start()
}, false)
import {load} from './onload';
window.onload = load;
