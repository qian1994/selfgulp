/**
 * Created by 九次方前端研发部-杜万福<dwf@jusfoun.com> on 2018/3/6.
 */
/* gulp命令会由gulpfile.js运行，所以src和build文件夹路径如下（根目录下） */
var src = './src';
var dest = './dist';  //'./build'

module.exports = {
    html: {
        src: src + "/html/*/*.html",
        dest: dest + "/html",
        rev: dest + "/rev/html",
    },
    htmlIndex:{
        src: src + "/index.html",
        dest: dest + "/"
    },
    less: {
        all: src + "/css/*/*.less",   //所有less
        src: src + "/css/*/*.less",   //需要编译的less
        dest: dest + "/css",          //输出目录
        rev: dest + "/rev/css",
        settings: {                      //编译less过程需要的配置，可以为空

        }
    },
    images: {
        src: [src + "/img/*.*", src + "/img/*/*.*"],
        dest: dest + "/img"
    },
    sprite: {
        src: src + "/sprite/*.png",
        dest: dest + "/sprite",
        imgName: "img/sprite/sprite.png",
        cssName: "css/sprite/sprite.css",
    },
    js: {
        src: src + "/js/*/*.js",
        dest: dest + "/js",
        rev: dest + "/rev/js"
    },
    copy: {
        src: src + "/resource/**/*",
        dest: dest + "/resource"
    },
    clean: {
        src: dest
    },
    rev:{//use rev to reset html resource url
        revJson: dest + "/rev/**/*.json",
        src: dest+"/html/*/*.html",//root index.html
        dest: dest+"/html"
    }
};