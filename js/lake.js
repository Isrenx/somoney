/**
 * Created by zhiqingan on 2017/1/9.
 */
export default class{
    constructor(options,dom,imgData){
        this.settings = {
            'speed':    0.3,
            'scale':    0.5,
            'waves':    3,
            'image':    true
        }
        this.settings = options || this.settings;
        this.waves = this.settings['waves'];
        this.speed = this.settings['speed']/4;
        this.scale = this.settings['scale']/2;
        this.ca = dom;
        this.c = this.ca.getContext('2d');
        this.img = document.createElement('img');
        this.img.src = imgData;
        this.img.width = document.documentElement.clientWidth;
        this.img.height = 293*scale;
        this.img_loaded = false;
        this.imLoad();
    }
    imLoad() {
        var w = document.documentElement.clientWidth , h=295, dw, dh;
        var offset = 0;
        var frame = 0;
        var max_frames = 0;
        var frames = [];
        var _this = this;
        var end = false;
        this.img.onload = function() {
            _this.c.save();
            var _t = this
            _this.c.canvas.width = w * 1.5;
            _this.c.canvas.height = h * scale;
            _this.c.drawImage(this, 0, 0);

            _this.c.scale(1, 1);
            _this.c.drawImage(this, 0, -_this.c.canvas.height * (1 - scale) / 0.8);

            _this.img_loaded = true;

            _this.c.restore();

            w = _this.c.canvas.width;
            h = _this.c.canvas.height;
            dw = w;
            dh = h;
            var id = _this.c.getImageData(0, 0, w, h).data;


            // precalc frames
            // image displacement
            _this.c.save();
                ccc()
       function ccc() {
                if(!end){
                    window.requestAnimFrame(ccc);
                }else {
                    return
                }
            // var odd = c.createImageData(dw, dh);
            var odd = _this.c.getImageData(0, 0, w, h);
            var od = odd.data;
            // var pixel = (w*4) * 5;
            var pixel = 0;
            for (var y = 0; y < dh; y++) {
                for (var x = 0; x < dw; x++) {
                    // var displacement = (scale * dd[pixel]) | 0;
                    var displacement = ( _this.scale * 10 * (Math.sin((dh / (y / _this.waves)) + (-offset)))) | 0;
                    var j = ((displacement + y) * w + x + displacement) * 4;

                    // horizon flickering fix
                    if (j < 0) {
                        pixel += 4;
                        continue;
                    }
                    // edge wrapping fix
                    var m = j % (w * 4);
                    var n = _this.scale * 10 * (y / _this.waves);
                    if (m < n || m > (w * 4) - n) {
                        var sign = y < w / 2 ? 1 : -1;
                        od[pixel] = od[pixel + 4 * sign];
                        od[++pixel] = od[pixel + 4 * sign];
                        od[++pixel] = od[pixel + 4 * sign];
                        od[++pixel] = od[pixel + 4 * sign];
                        ++pixel;
                        continue;
                    }

                    if (id[j + 3] != 0) {
                        od[pixel] = id[j];
                        od[++pixel] = id[++j];
                        od[++pixel] = id[++j];
                        od[++pixel] = id[++j];
                        ++pixel;
                    } else {
                        od[pixel] = od[pixel - w * 4];
                        od[++pixel] = od[pixel - w * 4];
                        od[++pixel] = od[pixel - w * 4];
                        od[++pixel] = od[pixel - w * 4];
                        ++pixel;
                        // pixel += 4;
                    }
                }
            }

            if (offset > _this.speed * (6 / _this.speed)) {
                offset = 0;
                max_frames = frame - 1;
                // frames.pop();
                frame = 0;
                end = true;
            } else {
                offset += _this.speed;
                frame++;
            }
            frames.push(odd);
        }
            _this.c.restore();
        }
        ddd()
            function ddd() {

                window.requestAnimFrame(ddd)
                if (_this.img_loaded&&end) {
                    if (!_this.settings.image) {

                        _this.c.putImageData(frames[frame], 0, 0);
                    } else {
                        // console.log(frames)

                        _this.c.putImageData(frames[frame], 0, 0);
                       /* if(frame==79){
                            console.log(_this.c.canvas.toDataURL())
                        }*/
                    }
                    // c.putImageData(frames[frame], 0, h/2);
                    if (frame < max_frames) {
                        frame++;
                    } else {
                        frame = 0;
                    }
                }

            }

    }

}