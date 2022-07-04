'use strict';

var babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    image = require('gulp-image'),
    prefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    strip = require('gulp-strip-comments'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

function swallowError (error) {

    // If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

var folders = {
    src: 'src/',
    dst: './'
}

var path = {
    build: {
        js: folders.dst + 'js/',
        css: folders.dst + 'css/',
    },
    src: {
        js: folders.src + 'js/*.js',
        css: folders.src + 'styles/app.scss',
    },
    watch: {
        js: folders.src + 'js/**/*.js',
        css: folders.src + 'styles/**/*.scss'
    },
    clean: ['js', 'css'],
    node: 'node_modules'
};

gulp.task('browser-sync', ['styles:build', 'js:build'], function() {

    var files = [
        folders.dst + '*.*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: folders.dst
        }
    });
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(rigger())
        .pipe(strip())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('styles:build', function () {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [path.src.css],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .on('error', swallowError)
        .pipe(prefixer())
        .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clean', function (cb) {
    for (var i = 0; i < path.clean.length; i++) {
        rimraf(path.clean[i], cb);
    }
});

gulp.task('build', [
    'js:build',
    'styles:build'
]);

gulp.task('default', ['build', 'browser-sync'], function () {
    gulp.watch(path.watch.css, ['styles:build']);
    gulp.watch(path.watch.js, ['js:build']);
});
