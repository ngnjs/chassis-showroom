// Build "NGN Chassis Showroom"
'use strict'

// Dependencies ----------------------------------------------------------------
var gulp = require('gulp')
var sass = require('gulp-sass')
var del = require('del')
var path = require('path')
var fs = require('fs')
// var pkg = require('./package.json')
// var header = require('gulp-header')
// var headerComment = '/**\n  * v' + pkg.version + ' generated on: ' + (new Date()) + '\n  * Copyright (c) 2014-' + (new Date()).getFullYear() + ', Ecor Ventures LLC. All Rights Reserved.\n  */\n'

// Sass Paths ------------------------------------------------------------------

var SHOWROOM = path.resolve('./sass/**/*.s*ss')
var CHASSIS = {
  SASS: require('chassis-detailer').includePaths,
  DETAILER: require('chassis-sass').includePaths
}

var DEST = './'

// Sass ------------------------------------------------------------------------
gulp.task('sasscompile', function () {
  return gulp.src([SHOWROOM])
    .pipe(
      sass({
        // outputStyle: 'compressed',
        includePaths: [
          CHASSIS.DETAILER,
          CHASSIS.SASS,
          SHOWROOM
        ]
      })
    ).on('error', sass.logError)
    .pipe(gulp.dest(DEST + '/stylesheets'))
})

// Cleanup ---------------------------------------------------------------------
gulp.task('clean', function (next) {
  fs.exists(DEST + '/stylesheets', function (exists) {
    exists && del.sync(DEST + '/stylesheets')
    next()
  })
})

// Build -----------------------------------------------------------------------
gulp.task('build', ['clean', 'sasscompile'])

// Watch -----------------------------------------------------------------------
gulp.task('watch', function () {
  gulp.watch([SHOWROOM, CHASSIS.SASS, CHASSIS.DETAILER], ['clean', 'sasscompile'])
})

// Dev -------------------------------------------------------------------------
gulp.task('dev', ['build', 'watch'])
