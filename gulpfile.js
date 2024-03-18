const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass-embedded'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const cleanCss = require('gulp-clean-css');

const cssFolderPath = 'build/css';
const scssFolderPath = 'src/scss';

const htmlFilesPath = 'src/**/*.html';
const htmlOutputFolder = 'build';

const imgFilesPath = 'src/img/**/*';
const imgOutputFolder = 'build/img';

const jsFilesPath = 'src/js/**/*';
const jsOutputFolder = 'build/js';


function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('buildJs', function () {
    return gulp.src([jsFilesPath])
        .pipe(gulp.dest(jsOutputFolder));
});

gulp.task('buildImages', function () {
    return gulp.src([imgFilesPath])
        .pipe(gulp.dest(imgOutputFolder));
});

gulp.task('buildCss', function () {
    return gulp.src(['src/scss/style.scss'])
        .pipe(compileCss('style'));
});

gulp.task('browserSync', gulp.series(function (done) {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
        notify: false
    })
    done();
}));

function compileCss(file) {
    return gulp.src(scssFolderPath + '/' + file + '.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCss())
        .pipe(gulp.dest(cssFolderPath))
        .pipe(browserSync.reload({
            stream: true
        }));
}

gulp.task('fileinclude', function () {
    return gulp.src(htmlFilesPath)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(htmlOutputFolder))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('watch', gulp.series(['buildImages', 'buildJs', 'fileinclude', 'browserSync', 'buildCss'], function () {
    gulp.watch('src/*.html', gulp.series(['fileinclude', reload]));
    gulp.watch('src/img/*', gulp.series(['buildImages', reload]));
    gulp.watch('src/js/*', gulp.series(['buildJs', reload]));
    gulp.watch('src/scss/*.scss').on('change', function (file) {
        compileCss('style');
    });
}));

gulp.task('build', gulp.series(['buildImages', 'buildJs', 'fileinclude', 'buildCss']));
