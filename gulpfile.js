const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
    // 1. where is my scss file
    return gulp.src('./assets/scss/**/*.scss')
    // 2 init sourcemaps
        .pipe(sourcemaps.init())
    // 2.1 pass that file through sass compiler
        .pipe(sass())
    // 2.2 concat files with custom name
        .pipe(concat('mentor.css'))
    // 2.3 write sourcemaps file
        .pipe(sourcemaps.write())
    // 3. where do i save the compiled CSS ?
        .pipe(gulp.dest('./dist/css'))
    // 4. stream changes to all browser
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    // listening all scss files in assets/scss directory
    gulp.watch('./assets/scss/**/*.scss', style);
    // listening all js files in assets/js directory
    gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
    // listening all html files in root directory
    gulp.watch('./**/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;