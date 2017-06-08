var gulp = require('gulp'); // 调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理。 
var browserSync = require('browser-sync').create(); // 这里reload不加括号，只引用不调用 // 
var reload = browserSync.reload; 
var nodemon = require('gulp-nodemon'); 
gulp.task('server', function() { 
    nodemon({ script: 'app.js', // 忽略部分对程序运行无影响的文件的改动，nodemon只监视js文件，可用ext项来扩展别的文件类型 
    ignore: ["gulpfile.js", "node_modules/", "public/**/*.*"], 
    env: { 'NODE_ENV': 'development' } }).on('start', 
    function() { browserSync.init({ 
        proxy: 'localhost:3000', 
        files: ["public/**/*.*", "views/**", "routes/**"], port:8001 }, 
        function() { console.log("browser refreshed."); 
        }); 
    }); 
});