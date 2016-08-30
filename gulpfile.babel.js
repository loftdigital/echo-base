//  @copyright 2015, Loft Digital, www.weareloft.com
//  Licensed under MIT (https://github.com/loftdigital/echo-base/blob/develop/LICENSE)

//  Require Gulp modules
// =========================================================================

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';
import imagemin from 'gulp-imagemin';
import pixrem from 'gulp-pixrem';
import eslint from 'gulp-eslint';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import livereload from 'gulp-livereload';
import notify from 'gulp-notify';
import del from 'del';
import plumber from 'gulp-plumber';
import sequence from 'gulp-sequence';

(() => {
  // =========================================================================
  // Set vars
  // =========================================================================


  //  Config vars
  // =====================================================================

  const config = {
    app: './app',
    dist: './dist',
    tests: './app/tests',
  };

  // =========================================================================
  //  Tasks
  // =========================================================================

  //  Default
  // =========================================================================

  gulp.task(
    'default',
    sequence('clean', ['styles', 'images', 'scripts'], 'watch')
  ); // Options: 'tests'

  //  Watch
  // =========================================================================

  gulp.task('watch', () => {
    // Do Sass related tasks
    gulp.watch(`${config.app}/scss/**/*.scss`, ['styles']);

    // Do JS related tasks
    gulp.watch(`${config.app}/js/**/*.js`, ['scripts']);

    // Watch image files
    gulp.watch(`${config.app}/img/**/*`, ['images']);

    // Start listening for changes
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch([`${config.dist}/**`]).on('change', livereload.changed);
  });

  //  Clean
  // =========================================================================

  gulp.task('clean', (cb) => (
     del([`${config.dist}/css`, `${config.dist}/js`, `${config.dist}/img`], cb)
  ));

  //  Test
  // =========================================================================

  gulp.task('tests', () => (
    gulp.src(`${config.tests}/scss/test.js`, {
      read: false,
    })
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({
        reporter: 'spec',
      }))
  ));

  // Styles - Sass, old-ie
  // =========================================================================

  gulp.task('styles', ['sass-lint', 'sass']);

  // Sass Lint
  // =========================================================================

  gulp.task('sass-lint', () => {
    gulp.src([`${config.app}/scss/*.scss`, `${config.app}/scss/echo-base/**/*.scss`])
      .pipe(plumber({
        errorHandler: function plumberSassLint(err) {
          notify.onError({
            title: 'Sass-lint error',
            message: '<%= error.message %>',
            sound: 'Sosumi',
          })(err);
          this.emit('end');
        },
      }))
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
      .pipe(notify({
        message: 'Sass lint task complete',
      }));
  });

  //  Sass - Sass, autoprefixer, minify css
  // =========================================================================

  gulp.task('sass', () => {
    gulp.src(`${config.app}/scss/*.scss`)
      .pipe(plumber({
        errorHandler: function plumberSass(err) {
          notify.onError({
            title: 'Sass Compile Error',
            message: '<%= error.message %>',
            sound: 'Sosumi',
          })(err);
          this.emit('end');
        },
      }))
      .pipe(sourcemaps.init())
      .pipe(sass({
        style: 'expanded',
        includePaths: ['./bower_components/susy/sass/'],
        sourceMap: true,
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }))
      .pipe(gulp.dest(`${config.dist}/css/`))
      .pipe(rename({
        suffix: '.min',
      }))
      .pipe(minifyCSS())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(`${config.dist}/css/`))
      .pipe(notify({
        message: 'Styles task complete',
      }));
  });

  //  Old-IE - Sass, autoprefixer, minify css, pixrem
  // =========================================================================

  gulp.task('old-ie', () => {
    gulp.src(`${config.app}/scss/*.scss`)
      .pipe(plumber({
        errorHandler: function plumberOldIE(err) {
          notify.onError({
            title: 'IE Compile Error',
            message: '<%= error.message %>',
            sound: 'Sosumi',
          })(err);
          this.emit('end');
        },
      }))
      .pipe(sass({
        style: 'expanded',
        includePaths: ['./bower_components/susy/sass/'],
        sourceMap: true,
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }))
      .pipe(minifyCSS())
      .pipe(pixrem('100%', {
        replace: true,
      }))
      .pipe(rename({
        basename: 'ie',
        suffix: '.min',
      }))
      .pipe(gulp.dest(`${config.dist}/css/`))
      .pipe(notify({
        message: 'Old IE task complete',
      }));
  });

  //  Scripts - ESLint, js
  // =========================================================================

  gulp.task('scripts', ['eslint', 'js']);

  //  Eslint
  // =========================================================================

  gulp.task('eslint', () => {
    gulp.src(['./gulpfile.js', `${config.app}/js/**/*.js`])
      .pipe(plumber({
        errorHandler: function plumberScripts(err) {
          notify.onError({
            title: 'ESLint Compile Error',
            message: '<%= error.message %>',
            sound: 'Sosumi',
          })(err);
          this.emit('end');
        },
      }))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(notify({
        message: 'ESLint complete',
      }));
  });

  //  JS - Concat, minify etc
  // =========================================================================

  gulp.task('js', () => {
    gulp.src([`${config.app}/js/**/*.js`])
      .pipe(plumber({
        errorHandler: function plumberScripts(err) {
          notify.onError({
            title: 'Script Compile Error',
            message: '<%= error.message %>',
            sound: 'Sosumi',
          })(err);
          this.emit('end');
        },
      }))
      .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(gulp.dest(`${config.dist}/js`))
      .pipe(rename({
        suffix: '.min',
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(`${config.dist}/js`))
      .pipe(notify({
        message: 'Scripts task complete',
      }));
  });

  //  Images - Imagemin
  // =========================================================================

  gulp.task('images', () => {
    gulp.src(`${config.app}/img/*`)
      .pipe(plumber({
        errorHandler: function plumberImages(err) {
          notify.onError({
            title: 'Image Minification Error',
            message: '<%= error.message %>',
            sound: 'Sosumi',
          })(err);
          this.emit('end');
        },
      }))
      .pipe(imagemin({
        progressive: true,
      }))
      .pipe(gulp.dest(`${config.dist}/img/`))
      .pipe(notify({
        message: 'Images task complete',
      }));
  });
})();
