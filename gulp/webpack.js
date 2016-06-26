var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('./config');

gulp.task('webpack', function() {
    
  return gulp
    .src(config.paths.temp + config.exts.allts)
    .pipe(webpack( require('../webpack.config.js') ))
    .pipe(gulp.dest(config.paths.dist));
});