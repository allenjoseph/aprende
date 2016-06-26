var gulp = require('gulp');
var del = require('del');
var config = require('./config');

gulp.task('clean', function(done) {
	del(config.paths.temp);
	return del(config.paths.dist, done);
});

gulp.task('clean:release', function(done) {
	return del([
		config.paths.vendor,
		config.dist.js
	], done);
});
