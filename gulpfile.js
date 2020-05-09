const { src, dest, series, parallel, watch   } = require('gulp');


// 压缩html插件
var htmlClean = require('gulp-htmlclean');

// 压缩image插件
var imageMin = require('gulp-imagemin');

// 压缩js插件
var uglify = require('gulp-uglify');

//  去掉js中的调试语句
var debug = require('gulp-strip-debug');

// less插件
var less = require('gulp-less');

// 压缩css
cleanCss = require('gulp-clean-css');

// postcss autoprefixer
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// 开启服务器代理
var connect = require('gulp-connect');

var devMOd = process.env.NODE_ENV == 'development';
var folder = {
    src:'src/',
    dist:'dist/'
}

function htmlTask(cb) {
    // place code for your default task here
    return src(folder.src+'html/*')
        .pipe(connect.reload())
        .pipe(dest(folder.dist + 'html/'))
}

function imageTask(cb) {
    // place code for your default task here
    src(folder.src+'images/*')
        .pipe(imageMin())
        .pipe(dest(folder.dist + 'images/'))
    cb();
}

function cssTask(cb) {
    // place code for your default task here
    src(folder.src+'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(dest(folder.dist + 'css/'))
    cb();
}

function jsTask(cb) {
    // place code for your default task here
    return src(folder.src+'js/*')
        .pipe(connect.reload())
        // .pipe(dest(folder.dist + 'js/'))s
}

function server(){
    connect.server({
        port:'8888',
        livereload:true
    });
}

function watcher(){
    watch(folder.src + 'html/*',htmlTask);
    watch(folder.src + 'css/*',cssTask);
    watch(folder.src + 'js/*',jsTask);
    // file.on('change',function(){
    //     console.log(999)
    // })
}


function defaultTask(cb) {
    // place code for your default task here
    console.log(123)
    cb();
}

if (process.env.NODE_ENV === 'production') {
    function htmlmin(cb) {
        // place code for your default task here
        src(folder.src+'html/*')
            .pipe(htmlClean())
            .pipe(dest(folder.dist + 'html/'))
        cb();
    }

    function jsmin(cb){
        src(folder.src+'js/*')
            .pipe(debug())
            .pipe(uglify())
            .pipe(dest(folder.dist + 'js/'))
        cb();
    }
    exports.default = series(defaultTask,series(htmlTask,htmlmin),cssTask,series(jsTask,jsmin),imageTask,parallel(watcher,server));

  } else {
   
      console.log(process.env.NODE_ENV+'ppppp')
    exports.default = series(defaultTask,htmlTask,cssTask,jsTask,imageTask,parallel(watcher,server));

  }
//   exports.default = series(defaultTask,htmlTask,cssTask,jsTask,imageTask,parallel(watcher,server));
  