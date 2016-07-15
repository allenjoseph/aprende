var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('./config');

gulp.task('webpack', function() {
    
  return gulp
    .src('../client2/app/index.ts')
    .pipe(webpack( require('../webpack.config.js') ))
    .pipe(gulp.dest(config.paths.dist));
});