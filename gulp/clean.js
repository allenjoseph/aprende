var gulp = require('gulp');
var del = require('del');
var config = require('./config');

gulp.task('clean', function(done) {
	return del(config.dist.root, done);
});

gulp.task('clean:release', function(done) {
	return del([
		config.paths.vendor,
		config.dist.js
	], done);
});
