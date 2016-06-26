var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var config = require('./config');

gulp.task('sass', function () {
	return gulp
	.src(config.client.sass)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(config.dist.css))
	.pipe(livereload());
});