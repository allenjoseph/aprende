var gulp = require('gulp');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var jscs = require('gulp-jscs');
var config = require('./config');

gulp.task('jshint', function() {
	return gulp
	.src(config.client.js)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
	.pipe(jshint.reporter('fail'))
	.pipe(livereload());
});

gulp.task('jscs', function() {
    return gulp
	.src(config.client.js)
	.pipe(jscs());
});
