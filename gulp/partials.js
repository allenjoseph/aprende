var gulp = require('gulp');
var ngHtml2js = require('gulp-ng-html2js');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var config = require('./config');

gulp.task('html2js', function(){
	return gulp
	.src(config.client.html)
	.pipe(ngHtml2js({moduleName: 'partials.module'}))
	.pipe(concat('partials.module.js'))
	.pipe(gulp.dest(config.dist.js))
	.pipe(livereload());
});