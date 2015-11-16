//  @copyright 2015, Loft Digital, www.weareloft.com
//  Licensed under MIT (https://github.com/loftdigital/echo-base/blob/develop/LICENSE)

(function gulpTasks() {
    'use strict';

    // =========================================================================
    // Set vars
    // =========================================================================

    //  Require Gulp modules
    // =========================================================================

    var gulp = require('gulp'),
        mocha = require('gulp-mocha'),
        sass = require('gulp-sass'),
        sassLint = require('gulp-sass-lint'),
        autoprefixer = require('gulp-autoprefixer'),
        rename = require('gulp-rename'),
        minifyCSS = require('gulp-minify-css'),
        imagemin = require('gulp-imagemin'),
        pixrem = require('gulp-pixrem'),
        eslint = require('gulp-eslint'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        livereload = require('gulp-livereload'),
        notify = require('gulp-notify'),
        del = require('del'),
        plumber = require('gulp-plumber'),
        sequence = require('gulp-sequence'),

        //  Config vars
        // =====================================================================

        config = {
            app: './app',
            dist: './dist',
            tests: './app/tests'
        };

    // =========================================================================
    //  Tasks
    // =========================================================================

    //  Default
    // =========================================================================

    gulp.task('default', sequence('clean', ['styles', 'images', 'scripts'], 'watch')); // Options: 'tests'

    //  Watch
    // =========================================================================

    gulp.task('watch', function gulpTaskWatch() {
        // Do Sass related tasks
        gulp.watch(config.app + '/scss/**/*.scss', ['styles']);

        // Do JS related tasks
        gulp.watch(config.app + '/js/**/*.js', ['scripts']);

        // Watch image files
        gulp.watch(config.app + '/img/**/*', ['images']);

        // Start listening for changes
        livereload.listen();

        // Watch any files in dist/, reload on change
        gulp.watch([config.dist + '/**']).on('change', livereload.changed);
    });

    //  Clean
    // =========================================================================

    gulp.task('clean', function gulpTaskClean(cb) {
        return del([config.dist + '/css', config.dist + '/js', config.dist + '/img'], cb);
    });

    //  Test
    // =========================================================================

    gulp.task('tests', function gulpTaskTests() {
        return gulp.src(config.tests + '/scss/test.js', {read: false})
            // gulp-mocha needs filepaths so you can't have any plugins before it
            .pipe(mocha({reporter: 'spec'}));
    });

    // Styles - Sass, old-ie
    // =========================================================================

    gulp.task('styles', ['sass-lint', 'sass']);

    // Sass Lint
    // =========================================================================

    gulp.task('sass-lint', function gulpTaskSassLint() {
        gulp.src([config.app + '/scss/*.scss', config.app + '/scss/echo-base/**/*.scss'])
            .pipe(plumber({
                errorHandler: function plumberSassLint(err) {
                    notify.onError({
                        title: 'Sass-lint error',
                        message: '<%= error.message %>',
                        sound: 'Sosumi'
                    })(err);
                    this.emit('end');
                }
            }))
            .pipe(sassLint())
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError())
            .pipe(notify({
                message: 'Sass lint task complete'
            }));
    });

    //  Sass - Sass, autoprefixer, minify css
    // =========================================================================

    gulp.task('sass', function gulpTaskSass() {
        gulp.src(config.app + '/scss/*.scss')
            .pipe(plumber({
                errorHandler: function plumberSass(err) {
                    notify.onError({
                        title: 'Sass Compile Error',
                        message: '<%= error.message %>',
                        sound: 'Sosumi'
                    })(err);
                    this.emit('end');
                }
            }))
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
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(minifyCSS())
            .pipe(gulp.dest(config.dist + '/css/'))
            .pipe(notify({
                message: 'Styles task complete'
            }));
    });

    //  Old-IE - Sass, autoprefixer, minify css, pixrem
    // =========================================================================

    gulp.task('old-ie', function gulpTaskOldIE() {
        gulp.src(config.app + '/scss/*.scss')
            .pipe(plumber({
                errorHandler: function plumberOldIE(err) {
                    notify.onError({
                        title: 'IE Compile Error',
                        message: '<%= error.message %>',
                        sound: 'Sosumi'
                    })(err);
                    this.emit('end');
                }
            }))
            .pipe(sass({
                style: 'expanded',
                includePaths: ['./bower_components/susy/sass/'],
                sourceMap: true
            }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(minifyCSS())
            .pipe(pixrem('100%', { replace: true }))
            .pipe(rename({
                basename: 'ie',
                suffix: '.min'
            }))
            .pipe(gulp.dest(config.dist + '/css/'))
            .pipe(notify({
                message: 'Old IE task complete'
            }));
    });

    //  Scripts - ESLint, js
    // =========================================================================

    gulp.task('scripts', ['eslint', 'js']);

    //  Eslint
    // =========================================================================

    gulp.task('eslint', function gulpTaskESLint() {
        gulp.src(['./gulpfile.js', config.app + '/js/**/*.js'])
            .pipe(plumber({
                errorHandler: function plumberScripts(err) {
                    notify.onError({
                        title: 'ESLint Compile Error',
                        message: '<%= error.message %>',
                        sound: 'Sosumi'
                    })(err);
                    this.emit('end');
                }
            }))
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(notify({
                message: 'ESLint complete'
            }));
    });

    //  JS - Concat, minify etc
    // =========================================================================

    gulp.task('js', function gulpTaskJS() {
        gulp.src([config.app + '/js/**/*.js'])
            .pipe(plumber({
                errorHandler: function plumberScripts(err) {
                    notify.onError({
                        title: 'Script Compile Error',
                        message: '<%= error.message %>',
                        sound: 'Sosumi'
                    })(err);
                    this.emit('end');
                }
            }))
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(gulp.dest(config.dist + '/js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.dist + '/js'))
            .pipe(notify({
                message: 'Scripts task complete'
            }));
    });

    //  Images - Imagemin
    // =========================================================================

    gulp.task('images', function gulpTaskImages() {
        gulp.src(config.app + '/img/*')
            .pipe(plumber({
                errorHandler: function plumberImages(err) {
                    notify.onError({
                        title: 'Image Minification Error',
                        message: '<%= error.message %>',
                        sound: 'Sosumi'
                    })(err);
                    this.emit('end');
                }
            }))
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(config.dist + '/img/'))
            .pipe(notify({
                message: 'Images task complete'
            }));
    });
})();
