var gulp = require('gulp');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({lazy: true});
var exec = require('child_process').exec;
var fs = require('fs');
var config = require("./gulp/config");

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').forEach(function(filename){
	require('./gulp/' + filename);
});

gulp.task('sass', function () {
	return gulp
	.src(config.client.sass)
	.pipe($.sass().on('error', $.sass.logError))
	.pipe(gulp.dest(config.dist.css))
	.pipe($.livereload());
});

gulp.task('compress', function(){
	var lib = require('bower-files')();
	return gulp
	.src(lib.ext('js').files.concat(config.dist.jsOrder))
	.pipe($.concat('allenjoseph.min.js'))
	.pipe($.uglify())
	.pipe(gulp.dest(config.paths.dist));
});

gulp.task('watch', function () {
	$.livereload.listen();
	gulp.watch(config.client.sass, ['sass']);
	gulp.watch(config.client.html, ['html2js']);
	gulp.watch(config.client.js, ['jshint', 'copy:js']);
});

gulp.task('connect', function () {
	exec('node --debug server/server.js', function(error, stdout, stderr){
		console.log('stdout:', stdout);
		console.log('stderr:', stderr);
		if (error !== null) {
			console.log('exec error:', error);
		}
	});
});

gulp.task('build', function() {
	return runSequence(
		'clean',
		['copy', 'html2js'],
		'translations',
		'sass',
		'inject'
	);
});

gulp.task('release', function() {
	return runSequence(
		'clean',
		['copy', 'html2js'],
		'translations',
		'sass',
		'compress',
		'clean:release',
		'inject:release'
	);
});

gulp.task('dev', function(){
	return runSequence(
		'build',
		'watch'
	);
});

gulp.task('default', ['dev']);