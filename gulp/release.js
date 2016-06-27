var gulp = require('gulp');
var runSequence = require('run-sequence');

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