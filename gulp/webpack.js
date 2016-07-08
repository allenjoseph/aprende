var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('./config');
var named = require('vinyl-named');

gulp.task('webpack', function() {
  
  var entries = [
    './client2/app/app.polyfills.ts',
    './client2/app/app.vendor.ts',
    './client2/app/app.main.ts'
  ];
    
  return gulp
    .src(entries)
    .pipe(named())
    .pipe(webpack( require('../webpack.config.js') ))
    .pipe(gulp.dest(config.paths.dist));
});