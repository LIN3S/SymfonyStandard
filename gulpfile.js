/*
 * This file is part of the Symfony Standard project.
 *
 * Copyright (c) 2016 LIN3S <info@lin3s.com>
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
  modernizr = require('gulp-modernizr'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  scsslint = require('gulp-scss-lint'),
  svgSprite = require('gulp-svg-sprite'),
  uglify = require('gulp-uglify');

var paths = {
  npm: './node_modules',
  sass: './app/Resources/assets/scss',
  js: './app/Resources/assets/js',
  svg: './app/Resources/assets/svg',
  buildCss: './web/css',
  buildJs: './web/js',
  buildSvg: './web/svg'
};

// Plumber error function
function onError(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('sass', ['scss-lint'], function () {
  gulp.src(paths.sass + '/app.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss([cssnext]))
    .pipe(gulp.dest(paths.buildCss))
    .pipe(livereload());
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
    .pipe(gulp.dest(paths.buildCss));
});

gulp.task('scss-lint', function () {
  gulp.src([
      paths.sass + '/**/*.scss',
      '!' + paths.sass + '/base/_reset.scss'
    ])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(scsslint({
      'config': '.scss_lint.yml'
    }));
});

gulp.task('modernizr', function () {
  return gulp.src([paths.js + '/**/*.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(modernizr({
      'options': [
        'setClasses', 'addTest', 'html5printshiv', 'testProp', 'fnBind'
      ],
      'tests': ['objectfit', 'flexbox']
    }))
    .pipe(gulp.dest(paths.buildJs))
});

var jsFiles = [
  paths.npm + '/fastclick/lib/fastclick.js',
  paths.npm + '/svg4everybody/dist/svg4everybody.min.js',
  paths.npm + '/picturefill/dist/picturefill.min.js',
  paths.npm + '/jquery/dist/jquery.js',
  //paths.npm + '/foundation-sites/dist/foundation.js',
  paths.js + '/**/*.js'
];

gulp.task('js', ['modernizr'], function () {
  gulp.src(jsFiles)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest(paths.buildJs));
});

gulp.task('js:prod', ['modernizr'], function () {
  gulp.src(jsFiles)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.buildJs));
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

gulp.task('watch', ['sass', 'js:prod'], function () {
  livereload.listen();
  gulp.watch(paths.sass + '/**/*.scss', ['sass']);
  gulp.watch(paths.js + '/**/*.js', ['js:prod']);
  gulp.watch(paths.svg + '/**/*.js', ['sprites']);
});

gulp.task('default', ['sass', 'modernizr', 'js', 'sprites', 'watch']);

gulp.task('prod', ['sass:prod', 'modernizr', 'js:prod', 'sprites']);
