/**
 * Created by zhiqingan on 2017/1/9.
 */

export default class{
    constructor(config){
        this.option = {
            resourceType: 'image', //资源类型，默认为图片
            baseUrl: './', //基准url
            resources: [], //资源路径数组
            onStart: null, //加载开始回调函数，传入参数total
            onProgress: null, //正在加载回调函数，传入参数currentIndex, total
            onComplete: null //加载完毕回调函数，传入参数total
        }
        if (config) {
            for (let i in config) {
                this.option[i] = config[i];
            }
        } else {
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引
    }
    isFunc (f){
        return typeof f === 'function';
    }
    start(){
        this.status = 1;
        var _this = this;
        var baseUrl = this.option.baseUrl;
        for (var i = 0, l = this.option.resources.length; i < l; i++) {
            var r = this.option.resources[i],
                url = r;
            /*if (r.indexOf('http://') === 0 || r.indexOf('https://') === 0) {
                url = r;
            } else {
                url = baseUrl + r;
            }*/

            let image = new Image();
            image.onload = function() {
                _this.loaded();
            };
            image.onerror = function() {
                _this.loaded();
            };
            image.src = url;
        }
        if (this.isFunc(this.option.onStart)) {
            this.option.onStart(this.total);
        }
    }
    loaded(){
        if (this.isFunc(this.option.onProgress)) {
            this.option.onProgress(++this.currentIndex, this.total);
        }
        //加载完毕
        if (this.currentIndex === this.total) {
            if (this.isFunc(this.option.onComplete)) {
                this.option.onComplete(this.total);
            }
        }
    }
}