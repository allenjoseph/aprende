var gulp = require('gulp');
var angularGettext = require('gulp-angular-gettext');
var config = require('./config');

gulp.task('pot', function () {
	return gulp
	.src([config.client.html, config.client.js])
	.pipe(angularGettext.extract('template.pot', {}))
	.pipe(gulp.dest(config.client.i18n));
});

gulp.task('translations', function () {
	return gulp
	.src(config.client.i18n + config.exts.pot)
	.pipe(angularGettext.compile())
	.pipe(gulp.dest(config.dist.translations));
});