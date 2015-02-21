(function() {

    'use strict';

    var config = {
            app: './app',
            dist: './dist'
        },

        gulp = require('gulp'),
        sass = require('gulp-sass'),
        scsslint = require('gulp-scss-lint'),
        autoprefixer = require('gulp-autoprefixer'),
        rename = require('gulp-rename'),
        minifyCSS = require('gulp-minify-css'),
        imagemin = require('gulp-imagemin'),
        pixrem = require('gulp-pixrem'),
        jshint = require('gulp-jshint'),
        //sourcemaps = require('gulp-sourcemaps'),
        notify = require('gulp-notify');

    gulp.task('default', function() {
      // place code for your default task here
    });

    gulp.task('watch', function() {

        // Do Sass related tasks
        gulp.watch(config.app + '/scss/**/*.scss', ['styles']);

    });

    gulp.task('styles', function() {
        gulp.src(config.app + '/scss/*.scss')
            .pipe(scsslint())
            //.pipe(sourcemaps.init())
            .pipe(sass({
                style: 'expanded',
                includePaths: ['./bower_components/susy/sass/'],
                sourceMap: true
            }))

            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest(config.dist + '/css/'))
            ///.pipe(sourcemaps.write())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(minifyCSS())
            .pipe(gulp.dest(config.dist + '/css/'))
            .pipe(pixrem({
                rootvalue: '100%',
                replace: true
            }))
            .pipe(rename({
                prefix: 'ie-'
            }))
            .pipe(gulp.dest(config.dist + '/css/'))
            .pipe(notify({
                message: 'Styles task complete'
            }));
    });

    gulp.task('scripts', function() {
        gulp.src(config.app + '/js/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
    });

    gulp.task('images', function() {
        gulp.src(config.app + '/img/*')
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(config.dist + '/img/'))
            .pipe(notify({
                message: 'Images task complete'
            }));
    });

})();
