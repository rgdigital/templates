/*
 * Gulp dependancies
 */
var gulp        = require('gulp');
var fs          = require("fs");
var path        = require('path');
var browserSync = require('browser-sync').create();
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var prettyError = require('gulp-prettyerror');
var template    = require('gulp-html-compile');
var sass        = require('gulp-sass');
var del         = require("del");
var addsrc      = require('gulp-add-src');
var ignore      = require('gulp-ignore');

/*
 * Serve
 * Watch-task
 */
gulp.task('watch', [], function () {
  // gulp.watch(path.sass + '**.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch("src/index.html", ['html']);
  gulp.watch(['src/views/*.html', 'src/app.js'], ['app']);
  gulp.watch("src/public/sass/style.scss", ['sass']);
});

/*
 * Copy Main Adtech HTML File
 */
gulp.task('html', function() {
  return gulp.src([
      'src/index.html'
    ])
    .pipe(gulp.dest('dist/'))
});

/*
 * Scss
 * Compile sass into CSS & auto-inject into browsers
 */
gulp.task('sass', function() {
  return gulp.src("src/public/sass/style.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream({once: true}));
});

/*
 * Copy JS
 */
gulp.task('js', function() {
  return gulp.src([
      'src/public/js/*.js',
    ])
    .pipe(gulp.dest('dist/'))
});

/*
 * Copy images
 */
gulp.task('img', function() {
  return gulp.src([
      'src/public/img/*.{gif,jpg,png,svg}'
    ])
    .pipe(gulp.dest('dist/'))
});

/*
 * Copy videos
 */
gulp.task('videos', function() {
  return gulp.src([
      'src/public/video/*.{mp4,webm,ogg,ogv}'
    ])
    .pipe(gulp.dest('dist/'))
});

/*
 * Views
 */
gulp.task('app', function() {
  gulp
    .src('src/views/*.html')
    .pipe(template({
      name: function(file) {
        return file.relative.split( '.' )[ 0 ];
      },
      namespace: 'views'
    }))
    .pipe(concat('views.js'))
    .pipe(gulp.dest('temp/'))
    .pipe(ignore.exclude(true))
    .pipe(addsrc.append('temp/views.js'))
    .pipe(addsrc.append('src/app.js'))
    .pipe(prettyError())
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});

/*
 * Default
 * Run `gulp` to serve locally
 */
gulp.task('default', ['watch']);