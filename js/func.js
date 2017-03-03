/**
 * Created by zhiqingan on 2016/12/5.
 */
export function  $$(els){
        var dom = document.querySelectorAll(els);
        if(dom.length==1){
            return dom[0]
        }else {
            return dom;
        }
    }
export function  getRect (element) {
        var rect = element.getBoundingClientRect();
        var top = document.documentElement.clientTop;
        var left= document.documentElement.clientLeft;
        return{
            top    :   rect.top - top,
            bottom :   rect.bottom - top,
            left   :   rect.left - left,
            right  :   rect.right - left,
            width  :   rect.width,
            height :   (rect.bottom - rect.top)
        }
    }

export function  createEle(ele) {
        var dom = document.createElement(ele);
        return dom;
    }



window.requestAnimFrame = window.requestAnimationFrame||window.webkitRequestAnimationFrame ||window.mozRequestAnimationFrame;
