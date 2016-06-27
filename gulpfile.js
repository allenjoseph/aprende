var gulp = require('gulp');
var fs = require('fs');

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').forEach(function(filename){
	require('./gulp/' + filename);
});

gulp.task('default', ['dev']);