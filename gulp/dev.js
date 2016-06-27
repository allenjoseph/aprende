var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', function(){
	return runSequence(
		'build',
		'watch'
	);
});

gulp.task('dev:ts', function(){
	return runSequence(
		'clean',
		'copy:vendor-client2',
		'copy:index-client2',
		'embedTemplates',
		'webpack'
	);
});