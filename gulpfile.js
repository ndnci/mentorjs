const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// OPTIONS
var autoprefixerOptions = {
    // overrideBrowserslist: ['last 10 versions'] // already written in package.json
};

// style files compiler
function style() {
    // 1. where is my scss file
    return gulp.src('./assets/scss/**/*.scss')
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through sass compiler
        .pipe(sass())
    // 2.1.1 autoprefixer filter
        .pipe(autoprefixer(autoprefixerOptions))
    // 2.2 concat files with custom name
        .pipe(concat('mentor.css'))
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 3. where do i save the compiled CSS ?
        .pipe(gulp.dest('./dist/css'))
    // 4. stream changes to all browser
        .pipe(browserSync.stream());
}

// javascript files compiler
function javascript() {
    // 1. where is my js file
    return gulp.src('./assets/js/**/*.js')
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through babel compiler
        .pipe(babel({
            presets: ['@babel/env']
        }))
    // 2.2 concat files with custom name
        .pipe(concat('mentor.js'))
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 3. where do i save the compiled JS ?
        .pipe(gulp.dest('./dist/js'))
    // 4. stream changes to all browser
        .pipe(browserSync.stream());
}

// gulp watcher
function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    // listening all scss files in assets/scss directory
    gulp.watch('./assets/scss/**/*.scss', style);
    // listening all js files in assets/js directory
    gulp.watch('./assets/js/**/*.js', javascript);
    // listening all html files in root directory
    gulp.watch('./**/*.html').on('change', browserSync.reload);
}

// default gulp function for using only "gulp" on terminal
gulp.task('default', () =>
    watch()
);

exports.style = style;
exports.javascript = javascript;
exports.watch = watch;