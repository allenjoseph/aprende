var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')({lazy: true});
var removeDirectories = require('remove-empty-directories');
var exec = require('child_process').exec;

var ext = {
	alljs: '**/*.js',
	allcss: '**/*.css',
	js: '*.js',
	css: '*.css',
	pot: '*.po'
}

var config = {
	dist: {
		root: './dist/',
		index: './dist/index.html',
		js: './dist/js/',
		css: './dist/css/',
		fonts: './dist/css/fonts/',
		assets: './dist/assets/',
		translations: './dist/js/translations/',
		vendor: './dist/bower_components/',
		min: './dist/min/',
		jsOrder: [
			'./dist/js/**/*.module.js',
			'./dist/js/app.js',
			'./dist/js/app.*.js',
			'./dist/js/**/*.js'
		]
	},
	client: {
		index: './client/index.html',
		i18n: './client/i18n/',
		js: './client/app/**/*.js',
		sass: './client/sass/**/*.scss',
		html: './client/app/**/*.html',
		assets: './client/assets/**/*.*'
	},
	vendor: './bower_components/'
};

gulp.task('jshint', function() {
	return gulp
	.src(config.client.js)
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
	.pipe($.jshint.reporter('fail'))
	.pipe($.livereload());
});

gulp.task('jscs', function() {
    return gulp
	.src(config.client.js)
	.pipe($.jscs());
});

gulp.task('clean', function(done) {
	return del(config.dist.root, done);
});

gulp.task('clean:release', function(done) {
	return del([
		config.dist.vendor,
		config.dist.js
	], done);
});

gulp.task('copy:assets', function(){
	return gulp
	.src(config.client.assets)
	.pipe(gulp.dest(config.dist.assets));
});

gulp.task('copy:vendor', function(){
	return gulp
	.src(bowerFiles(), { base: './bower_components' })
	.pipe(gulp.dest(config.dist.vendor));
});

gulp.task('copy:fonts', function(){
	return gulp
	.src(config.vendor + '**/*.{eot,svg,ttf,woff,woff2}')
	.pipe($.rename({dirname: ''}))
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
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('html2js', function(){
	return gulp
	.src(config.client.html)
	.pipe($.ngHtml2js({moduleName: 'partials.module'}))
	.pipe($.concat('partials.module.js'))
	.pipe(gulp.dest(config.dist.js))
	.pipe($.livereload());
});

gulp.task('inject:vendor', function(){
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(bowerFiles(), { read: false }),{ name: 'vendor' }))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('inject:js', function(){
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(config.dist.jsOrder), {relative: true}))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('inject:css', function(){
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(config.dist.css + ext.allcss), {relative: true}))
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('inject', function() {
	return runSequence(
		'inject:vendor',
		'inject:js',
		'inject:css'
	);
});

gulp.task('inject:release', function() {
	return gulp
	.src(config.dist.index)
	.pipe($.inject(gulp.src(config.dist.root + ext.alljs), {relative: true}))
	.pipe($.inject(gulp.src(config.dist.root + ext.allcss), {relative: true}))
	.pipe(gulp.dest(config.dist.root));
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
	.pipe(gulp.dest(config.dist.root));
});

gulp.task('pot', function () {
	return gulp
	.src([config.client.html, config.client.js])
	.pipe($.angularGettext.extract('template.pot', {}))
	.pipe(gulp.dest(config.client.i18n));
});

gulp.task('translations', function () {
	return gulp
	.src(config.client.i18n + ext.pot)
	.pipe($.angularGettext.compile())
	.pipe(gulp.dest(config.dist.translations));
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
	/*$.connect.server({
		root: ['dist'],
		port: 8000,
		livereload: true
	});*/
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
		'connect',
		'watch'
	);
});

gulp.task('default', ['dev']);
