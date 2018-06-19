var gulp = require('gulp');
var bro = require('gulp-bro'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require("gulp-minify-html"),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    cache = require('gulp-cache'),
    pngquant = require('imagemin-pngquant'),

    include = require('gulp-file-include'),
    imageminify = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    es2015 = require('babel-preset-es2015'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    minify = require('gulp-minify'),
    reload = browserSync.reload;
var babel = require('gulp-babel');
var config = require('./config');//引入config路径
var rev = require('gulp-rev');
var revCollector = require("gulp-rev-collector");
var gulpsync = require('gulp-sync')(gulp);

/*copy resource下的所有资源*/
gulp.task('copy', function () {
    return gulp.src(config.copy.src)
        .pipe(plumber())
        .pipe(gulp.dest(config.copy.dest))
        .pipe(reload({stream: true}));
});

/*html公共类部件复用及打包*/
gulp.task('html', function () {
    gulp.src(config.html.src)
        .pipe(plumber())
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest(config.html.dest));
});

gulp.task('htmlRev', function () {
    gulp.src(config.html.src)
        .pipe(plumber())
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(minifyHtml()) //压缩
        .pipe(rev())  //set hash key
        .pipe(gulp.dest(config.html.dest))
        .pipe(rev.manifest()) //set hash key json
        .pipe(gulp.dest(config.html.rev)) //dest hash key json
});

/*less编译*/
gulp.task('less', function () {
    return gulp.src(config.less.src)
        .pipe(plumber())
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest(config.less.dest))
        .pipe(reload({stream: true}));
});

/*build less编译*/
gulp.task('lessRev', function () {
    return gulp.src(config.less.src)
        .pipe(plumber())
        .pipe(less())
        .pipe(minifyCss())
        .pipe(rev())  //set hash key
        .pipe(gulp.dest(config.less.dest))
        .pipe(rev.manifest()) //set hash key json
        .pipe(gulp.dest(config.less.rev)) //dest hash key json
        .pipe(reload({stream: true}));
});

/*打包js下的js文件*/
gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(plumber())
        .pipe(gulp.dest(config.js.dest))
        .pipe(reload({stream: true}))
});

/*build打包js下的js文件*/
gulp.task('jsRev', function () {
    return gulp.src(config.js.src)
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rev())  //set hash key
        .pipe(gulp.dest(config.js.dest))
        .pipe(rev.manifest()) //set hash key json
        .pipe(gulp.dest(config.js.rev)) //dest hash key json
        .pipe(reload({stream: true}))
});

/*图片压缩*/
gulp.task('images', function () {
    gulp.src(config.images.src)  //所有文件夹下的所有文件
        .pipe(plumber())
        .pipe(cache(imageminify({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true,//类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest(config.images.dest))
        .pipe(reload({stream: true}));
});
// 精灵图
gulp.task('sprite', function () {
    var spriteData = gulp.src(config.sprite.src).pipe(spritesmith({
        imgName: config.sprite.imgName,
        cssName: config.sprite.cssName
    }));
    return spriteData.pipe(gulp.dest(config.sprite.dest));
});


/*打包首页*/
gulp.task('htmlIndex', function () {
    gulp.src(config.htmlIndex.src)
        .pipe(plumber())
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(minifyHtml()) //压缩
        .pipe(gulp.dest(config.htmlIndex.dest))
        .pipe(reload({stream: true}));
});

/*rev替换js&css路径*/
gulp.task('rev', function () {
    return gulp.src([config.rev.revJson, config.rev.src])
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(gulp.dest(config.rev.dest));
});


/*浏览器实时刷新*/
gulp.task('server', ['html', 'less', 'js'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        port: 8080
    });

    gulp.watch(config.html.src, ['html']).on('change', function (e) {
        console.log(e);
    });
    gulp.watch(config.less.src, ['less']);
    gulp.watch(config.js.src, ['js']);

});

gulp.task('text', function () {
    browserSync({
        server: {
            baseDir: 'dist',
        },
        port: 8080
    });
});
/*清除文件夹*/
gulp.task('clean', function () {
    return gulp.src(config.clean.src).pipe(clean());
});

gulp.task('default', gulpsync.sync(['clean', ['copy', 'html', 'less', 'js', 'images', 'htmlIndex'], 'server']));

gulp.task('build', gulpsync.sync(['clean', ['copy', 'htmlRev', 'lessRev', 'jsRev', 'images', 'htmlIndex'], 'rev']));
