var gulp = require('gulp');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var runSequence = require('run-sequence');
var config = require('./config');

gulp.task('inject:vendor', function(){
	return gulp
	.src(config.dist.index)
	.pipe(inject(gulp.src(bowerFiles(), { read: false }),{ name: 'vendor' }))
	.pipe(gulp.dest(config.paths.dist));
});

gulp.task('inject:js', function(){
	return gulp
	.src(config.dist.index)
	.pipe(inject(gulp.src(config.dist.jsOrder), {relative: true}))
	.pipe(gulp.dest(config.paths.dist));
});

gulp.task('inject:css', function(){
	return gulp
	.src(config.dist.index)
	.pipe(inject(gulp.src(config.dist.css + config.exts.allcss), {relative: true}))
	.pipe(gulp.dest(config.paths.dist));
});

gulp.task('inject', function() {
	return runSequence(
		'inject:vendor',
		'inject:js',
		'inject:css'
	);
});

gulp.task('inject:release', function() {
	return gulp
	.src(config.dist.index)
	.pipe(inject(gulp.src(config.paths.dist + config.exts.alljs), {relative: true}))
	.pipe(inject(gulp.src(config.paths.dist + config.exts.allcss), {relative: true}))
	.pipe(gulp.dest(config.paths.dist));
});
