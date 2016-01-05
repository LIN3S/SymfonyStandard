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
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  scsslint = require('gulp-scss-lint');

var paths = {
  sass: './app/Resources/assets/scss',
  css: './web/css',
  js: './app/Resources/assets/js',
  buildJs: './web/js',
  vendor: './app/Resources/assets/vendor'
};

gulp.task('sass', ['scsslint'], function () {
  gulp.src(paths.sass + '/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.css));
});

gulp.task('scsslint', function () {
  gulp.src([
    paths.sass + '/**/*.scss',
    '!' + paths.sass + '/base/_reset.scss'
  ])
  .pipe(scsslint({
    'config': '.scss_lint.yml'
  }));
});

gulp.task('js:prod', function () {
  gulp.src([
    paths.vendor + '/jquery/dist/jquery.js',
    paths.vendor + '/foundation-sites/dist/foundation.js',
    paths.js + '/**/*.js'
  ])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.buildJs));
});

gulp.task('watch', function () {
  var onChange = function (event) {
    livereload.changed('');
  };
  livereload.listen();
  gulp.watch(paths.sass + '/**/*.scss', ['sass'])
    .on('change', onChange);
  gulp.watch(paths.js + '/**/*.js', ['js:prod'])
    .on('change', onChange);
});

gulp.task('prod', ['sass', 'js:prod']);
