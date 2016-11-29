var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var pump = require('pump');
var minifyCSS = require('gulp-minify-css');

gulp.task('default', ['clean','htmlMinify','copyImages', 'minifyJs', 'minifyCss', 'copyFonts']);

gulp.task('clean', function() {
    return gulp.src('dist', {read: false}).pipe(clean());
});

gulp.task('copyImages', ['clean'], function() {
    return gulp.src(['img/**/*']).pipe(gulp.dest('dist/img'));
});

gulp.task('copyJs', ['clean'], function() {
    return gulp.src(['js/**/*']).pipe(gulp.dest('dist/js'));
});

gulp.task('copyCss', ['clean'], function() {
    return gulp.src(['css/**/*']).pipe(gulp.dest('dist/css'));
});

gulp.task('copyFonts', ['clean'], function() {
    return gulp.src(['fonts/**/*']).pipe(gulp.dest('dist/fonts'));
});

gulp.task('htmlMinify', ['clean'], function() {
    return gulp.src('*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifyJs', ['clean'], function() {
    return pump([
            gulp.src(['js/**/*']),
            uglify(),
            gulp.dest('dist/js')
        ]
    )
});

gulp.task('minifyCss', ['clean'], function () {
    return gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});
