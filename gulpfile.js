const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
    // 1. where is my scss file
    return gulp.src('./assets/scss/**/*.scss')
    // 2. pass that file through sass compiler
        .pipe(sass())
    // 2.1 concat files
        .pipe(concat('mentor.css'))
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
    gulp.watch('./assets/scss/**/*.scss', style);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./assets/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;