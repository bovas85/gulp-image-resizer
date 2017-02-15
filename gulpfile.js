var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var parallel = require("concurrent-transform");
var os = require("os");
var imageResize = require('gulp-image-resize');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('imageResize', function () {
  gulp.src('images/src/**/*')
    .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
    }))
    .pipe(parallel(imageResize({
      width : 1920,
      height : 768,
      crop : true,
      upscale : false
    }),
    os.cpus().length))
    .pipe(cache(imageMin({
            progressive: true
    })))
    .pipe(gulp.dest('images/dist'));
});

gulp.task('css',function(){
    gulp.src(['css/src/**/*.css'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(gulp.dest('css/dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('css/dist'))
});
gulp.task('js',function(){
    gulp.src(['js/src/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('js/dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/dist'))
});
gulp.task('html',function(){
    gulp.src(['html/**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./'))
});
gulp.task('image',function(){
    gulp.src(['images/src/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cache(imageMin({
            progressive: true
        })))
        .pipe(gulp.dest('images/dist'))
});
gulp.task('default',function(){
    gulp.watch('js/src/**/*.js',['js']);
    gulp.watch('css/src/**/*.css',['css']);
    gulp.watch('html/**/*.html',['html']);
    gulp.watch('images/src/**/*',['image']);
});
