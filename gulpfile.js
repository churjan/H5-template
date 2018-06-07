let gulp         = require('gulp'),                             //基础库 
    pump         = require('pump'),                             //pump可以使我们更容易找到代码出错位置.
    htmlmin      = require('gulp-htmlmin'),                     //HTML压缩
    uglify       = require('gulp-uglify'),                      //js压缩
    babel        = require('gulp-babel')                        //把es6转成es5,js压缩对es6不支持
    sass         = require('gulp-sass'),                        //编译sass
    autoprefixer = require('gulp-autoprefixer'),                //给css加前缀
    rename       = require('gulp-rename'),                      //重命名
    clean        = require('gulp-clean'),                       //删除文件
    concat       = require('gulp-concat'),                      //文件合成
    gulpSequence = require('gulp-sequence'),                    //队列，类似于promise
    browserSync  = require('browser-sync').create()             //静态服务器

const path={
    input:{
        html:'src/*.html',
        css:'src/scss/main.scss',
        js:'src/js/*.js',
        images:'src/images/**/*',
        libs:'src/libs/**/*'
    },
    output:{
        root:'dist/',
        html:'dist/',
        css:'dist/css/',
        js:'dist/js/',
        images:'dist/images/',
        libs:'dist/libs/'
    }
}




gulp.task('html',function(cb){
    let options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    pump([
        gulp.src(path.input.html),
        htmlmin(options),
        gulp.dest(path.output.html),
        browserSync.reload({stream:true})
    ],cb)
})

gulp.task('js', function(cb) {
    pump([
        gulp.src(['src/js/util.js','src/js/main.js']),
        babel({presets: ['env']}),
        uglify(),
        concat('main.js'),
        rename({ suffix: '.min' }),
        gulp.dest(path.output.js),
        browserSync.reload({stream:true})
    ],cb)  
})
gulp.task('css', function(cb) {
    // 嵌套输出方式 nested
    // 展开输出方式 expanded 
    // 紧凑输出方式 compact 
    // 压缩输出方式 compressed
    pump([
        gulp.src(path.input.css),
        sass({outputStyle:'compressed'}),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        rename({ suffix: '.min' }),
        gulp.dest(path.output.css),
        browserSync.reload({stream:true})
    ],cb)  
})

gulp.task('clean', function(cb) {
    pump([
        gulp.src(path.output.root),
        clean()
    ],cb)  
})
gulp.task('build', function(cb) {
    gulpSequence('clean', ['html','js','css','libs','images'], cb);
})
//下面的task没有做处理，只是单纯导到dist文件夹里面
gulp.task('libs', function(cb) {
    pump([
        gulp.src(path.input.libs),
        gulp.dest(path.output.libs),
        browserSync.reload({stream:true})
    ],cb)  
})
gulp.task('images', function(cb) {
    pump([
        gulp.src(path.input.images),
        gulp.dest(path.output.images),
        browserSync.reload({stream:true})
    ],cb)  
})


// watch
// ====================================================================================================

gulp.task('serve',function(){
    browserSync.init({
        file:[path.input],
        server: {
            baseDir: ['dist'], // 设置服务器的根目录
            index:'index.html' // 指定默认打开的文件
        },
        port: 666
    })
});

// 监听任务 运行语句 gulp watch
gulp.task('watch', ['serve','build'], function() {
    // 监听html
    gulp.watch(path.input.html, ['html']);

    // 监听js
    gulp.watch(path.input.js, ['js']);

    // 监听css
    gulp.watch(path.input.css, ['css']);

     // 监听插件
     gulp.watch(path.input.libs, ['libs']);

    // 监听images
    gulp.watch(path.input.images, ['images']);


});

gulp.task('default',['watch']);