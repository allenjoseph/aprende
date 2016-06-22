var root = './';

var paths = {
	dist: root + 'dist/',
	client: root + 'client2/',
	vendor: root + 'bower_components/'
};

exports.paths = paths;

exports.dist = {
	index: paths.dist + 'index.html',
	js: paths.dist + 'js/',
	css: paths.dist + 'css/',
	fonts: paths.dist + 'css/fonts/',
	assets: paths.dist + 'assets/',
	translations: paths.dist + 'js/translations/',
	min: paths.dist + 'min/',
	jsOrder: [
		paths.dist + 'js/**/*.module.js',
		paths.dist + 'js/app.js',
		paths.dist + 'js/app.*.js',
		paths.dist + 'js/**/*.js'
	]
};

exports.client = {
	index: paths.client + 'index.html',
	i18n: paths.client + 'i18n/',
	js: paths.client + 'app/**/*.js',
	sass: paths.client + 'sass/**/*.scss',
	html: paths.client + 'app/**/*.html',
	assets: paths.client + 'assets/**/*.*'
};

exports.exts = {
	alljs: '**/*.js',
	allcss: '**/*.css',
	js: '*.js',
	css: '*.css',
	pot: '*.po',
	allts: '**/*.ts',
	fonts: '**/*.{eot,svg,ttf,woff,woff2}'
};