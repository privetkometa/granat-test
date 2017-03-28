"use strict";

var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    mainBowerFiles = require('gulp-main-bower-files'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpFilter = require('gulp-filter'),
    path = require('path');


//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});


//js connect
gulp.task('bower', function () {
  var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
      .pipe(mainBowerFiles({
          overrides: {
              bootstrap: {
                  main: [
                      './dist/js/bootstrap.js'
                  ]
              }
          }
      }))
      .pipe(filterJS)
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(filterJS.restore)
      .pipe(gulp.dest('src/js'))
      .pipe(notify("JS!"));
});


//css
gulp.task('css', function () {
  return gulp.src('build/less/main.less')
    .pipe(less())
    .pipe(prefix({
            browsers: ['last 4 versions','> 1%', 'ie 9'],
            cascade: false
        }))
    //.pipe(cleanCSS())
    //.pipe(rename('bundle.min.css'))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(connect.reload())
    .pipe(notify("Done!"));
});


//html
gulp.task('html', function () {
  gulp.src('src/index.html')
  .pipe(connect.reload());
});


//watch
gulp.task('watch', function(){
  //gulp.watch('src/css/*.css', ['css','html'])
  gulp.watch('build/less/*.less', ['css'])
  gulp.watch('src/*.html', ['html'])
});


//default
gulp.task('default', ['connect', 'html', 'css', 'watch']);