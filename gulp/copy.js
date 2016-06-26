var gulp = require('gulp');
var rename = require("gulp-rename");
var bowerFiles = require('main-bower-files');
var config = require('./config');


gulp.task('copy:assets', function(){
	return gulp
	.src(config.client.assets)
	.pipe(gulp.dest(config.dist.assets));
});

gulp.task('copy:vendor', function(){
	return gulp
	.src(bowerFiles(), { base: config.paths.vendor })
	.pipe(gulp.dest(config.paths.vendor));
});

gulp.task('copy:fonts', function(){
	return gulp
	.src(config.paths.vendor + config.exts.fonts)
	.pipe(rename({dirname: ''}))
	.pipe(gulp.dest(config.dist.fonts));
});

gulp.task('copy:js', function(){
	return gulp
	.src(config.client.js)
	.pipe(gulp.dest(config.dist.js));
});

gulp.task('copy', ['copy:vendor', 'copy:fonts', 'copy:js', 'copy:assets'], function(){
	return gulp
	.src(config.client.index)
	.pipe(gulp.dest(config.paths.dist));
});

gulp.task('copy:vendor-client2', function(){
	return gulp
	.src([
		'node_modules/core-js/client/shim.min.js',
		'node_modules/zone.js/dist/zone.js',
		'node_modules/reflect-metadata/Reflect.js'
	])
	.pipe(gulp.dest(config.paths.dist + 'lib'));
});

gulp.task('copy:index-client2', function(){
	return gulp
	.src([
		'client2/index.html'
	], { base : './client2' })
	.pipe(gulp.dest(config.paths.dist));
});