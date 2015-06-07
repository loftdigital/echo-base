(function() {

    'use strict';

    //==========================================================================
    // Require modules
    //==========================================================================

    var gulp = require('gulp'),
        mocha = require('gulp-mocha'),
        sass = require('gulp-sass'),
        scsslint = require('gulp-scss-lint'),
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
        size = require('gulp-size'),
        del = require('del'),
        plumber = require('gulp-plumber');




    //==========================================================================
    // Config vars
    //==========================================================================

    var config = {
            app: './app',
            dist: './dist',
            tests: './app/tests'
        };




    //==========================================================================
    // Tasks
    //==========================================================================

    // Default
    //==========================================================================

    gulp.task('default', ['clean'], function() {
        gulp.start('styles', 'images', 'scripts', 'tests', 'watch');
    });



    // Watch
    //==========================================================================

    gulp.task('watch', function() {
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



    // Clean
    //==========================================================================

    gulp.task('clean', function(cb) {
        del([config.dist + '/css', config.dist + '/js', config.dist + '/img'], cb)
    });



    // Test
    //==========================================================================

    gulp.task('tests', function () {
        return gulp.src(config.tests + '/scss/test.js', {read: false})
            // gulp-mocha needs filepaths so you can't have any plugins before it
            .pipe(mocha({reporter: 'spec'}));
    });



    // Styles - Sass, old-ie
    //==========================================================================

    gulp.task('styles', ['scss-lint', 'sass', 'old-ie']);



    // SCSS Lint
    //==========================================================================

    gulp.task('scss-lint', function() {
        gulp.src(config.app + '/scss/echo-base/**/*.scss')
            .pipe(plumber())
            .pipe(scsslint())
            .pipe(notify({
                message: 'Scss lint task complete'
            }));
    });


    // Sass - Sass, autoprefixer, minify css
    //==========================================================================

    gulp.task('sass', function() {
        gulp.src(config.app + '/scss/*.scss')
            .pipe(plumber({
                errorHandler: function(err) {
                    notify.onError({
                        title:    "Sass Compile Error",
                        message:  "<%= error.message %>",
                        sound:    "Sosumi"
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
            //.pipe(size())
            .pipe(gulp.dest(config.dist + '/css/'))
            .pipe(notify({
                message: 'Styles task complete'
            }));
    });



    // Old-IE - Sass, autoprefixer, minify css, pixrem
    //==========================================================================

    gulp.task('old-ie', function() {
        gulp.src(config.app + '/scss/*.scss')
            .pipe(plumber({
                errorHandler: function(err) {
                    notify.onError({
                        title:    "IE Compile Error",
                        message:  "<%= error.message %>",
                        sound:    "Sosumi"
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



    // Scripts - ESLint, concat, uglify
    //==========================================================================

    gulp.task('scripts', function() {
        gulp.src(config.app + '/js/**/*.js')
            .pipe(plumber({
                errorHandler: function(err) {
                    notify.onError({
                        title:    "Script Compile Error",
                        message:  "<%= error.message %>",
                        sound:    "Sosumi"
                    })(err);
                    this.emit('end');
                }
            }))
            .pipe(eslint({
                useEslintrc: true
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(gulp.dest(config.dist + '/js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            //.pipe(size())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.dist + '/js'))
            .pipe(notify({
                message: 'Scripts task complete'
            }));
    });



    // Images - Imagemin
    //==========================================================================

    gulp.task('images', function() {
        gulp.src(config.app + '/img/*')
            .pipe(plumber({
                errorHandler: function(err) {
                    notify.onError({
                        title:    "Image Minification Error",
                        message:  "<%= error.message %>",
                        sound:    "Sosumi"
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
