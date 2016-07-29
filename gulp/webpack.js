var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('./config');
var webpackConfig = require('../config/webpack.config');

gulp.task('webpack', function() {
    
  return gulp
    .src('../client2/app/index.ts')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.paths.dist));
});