var gulp = require('gulp');
var livereload = require('gulp-livereload');
var config = require("./config");

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(config.client.sass, ['sass']);
	gulp.watch(config.client.html, ['html2js']);
	gulp.watch(config.client.js, ['jshint', 'copy:js']);
});