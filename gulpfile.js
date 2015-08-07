/*
 * This file is part of the Symfony Standard project.
 *
 * Copyright (c) 2015 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 * 
 * @author Jon Torrado <jontorrado@gmail.com>
 */

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    scsslint = require('gulp-scss-lint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    
var paths = {
  sass: './app/Resources/assets/scss',
  css: './web/css',
  js: './app/Resources/assets/js',
  buildJs: './web/js',
  vendor: './app/Resources/assets/vendor'
};

gulp.task('sass', ['scsslint'], function () {
  gulp.src(paths.sass  + '/app.scss')
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
  gulp.src(paths.sass + '/**/*.scss')
    .pipe(scsslint());
});

gulp.task('js:prod', function () {
  gulp.src([
      paths.vendor + '/foundation/js/vendor/jquery.js',
      paths.vendor + '/foundation/js/foundation.js',
      paths.js + '/**/*.js'
  ])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.buildJs));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.js + '/**/*.js', ['js:prod']);
});

gulp.task('prod', ['sass', 'js:prod']);