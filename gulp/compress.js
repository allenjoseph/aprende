var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bowerFiles = require('bower-files');
var config = require('./config');

gulp.task('compress', function(){
	return gulp
	.src(bowerFiles().ext('js').files.concat(config.dist.jsOrder))
	.pipe(concat('allenjoseph.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(config.paths.dist));
});