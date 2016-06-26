var gulp = require('gulp');
var fs = require('fs');
var runSequence = require('run-sequence');

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').forEach(function(filename){
	require('./gulp/' + filename);
});

/**
 *  Build Task
 */
gulp.task('build', function() {
	return runSequence(
		'clean',
		['copy', 'html2js'],
		'translations',
		'sass',
		'inject'
	);
});

/**
 *  Release Task
 */
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

/**
 *  Dev Task
 */
gulp.task('dev', function(){
	return runSequence(
		'build',
		'watch'
	);
});

gulp.task('client2', function(){
	return runSequence(
		'clean',
		'copy:vendor-client2',
		'copy:index-client2',
		'embedTemplates',
		'webpack'
	);	
});

gulp.task('default', ['dev']);