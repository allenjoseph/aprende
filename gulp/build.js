var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function() {
	return runSequence(
		'clean',
		['copy', 'html2js'],
		'translations',
		'sass',
		'inject'
	);
});