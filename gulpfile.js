/*
 * This file is part of the Symfony Standard project.
 *
 * Copyright (c) 2015 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Jon Torrado <jontorrado@gmail.com>
 * @author Beñat Espiña <benatespina@gmail.com>
 */

'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  cssnext = require('postcss-cssnext'),
  cssnano = require('gulp-cssnano'),
  livereload = require('gulp-livereload'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  scsslint = require('gulp-scss-lint'),
  svgSprite = require('gulp-svg-sprite'),
  uglify = require('gulp-uglify');

var paths = {
  sass: './app/Resources/assets/scss',
  css: './web/css',
  js: './app/Resources/assets/js',
  buildJs: './web/js',
  svg: './app/Resources/assets/svg',
  buildSvg: './web/svg',
  vendor: './app/Resources/assets/vendor',
};

// Plumber error function
function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('sass', ['scsslint'], function () {
  gulp.src(paths.sass + '/app.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss([cssnext]))
    .pipe(gulp.dest(paths.css))
    .pipe(livereload())
  ;
});

gulp.task('sass:prod', function () {
  gulp.src(paths.sass + '/app.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(postcss([cssnext]))
    .pipe(cssnano({
      keepSpecialComments: 1,
      rebase: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.css))
  ;
});

gulp.task('scsslint', function () {
  gulp.src([
      paths.sass + '/**/*.scss',
      '!' + paths.sass + '/base/_reset.scss'
    ])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(scsslint({
      'config': '.scss_lint.yml'
    }))
  ;
});

gulp.task('sprites', function () {
  return gulp.src(paths.svg + '/*.svg')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '',
          sprite: 'symbols',
          example: {dest: 'symbols'}
        }
      }
    }))
    .pipe(gulp.dest(paths.buildSvg));
});

gulp.task('js:prod', function () {
  gulp.src([
      paths.vendor + '/jquery/dist/jquery.js',
      paths.vendor + '/foundation-sites/dist/foundation.js',
      paths.js + '/**/*.js'
    ])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.buildJs))
  ;
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.js + '/**/*.js', ['js:prod']);
});

gulp.task('default', ['sass', 'js', 'watch']);

gulp.task('prod', ['sass:prod', 'js:prod']);
