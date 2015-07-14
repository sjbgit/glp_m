/**
 * Created by sbunke on 7/14/2015.
 */
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();

console.log(config);

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function() {
    log('running vet - analyzer with jshint and jscs');
    //console.log(config);
    return gulp.src(
        config.alljs
    )
        .pipe($.if(args.verbose, $.print()))//if pass in verbose flag to gulp command, then will log all files
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

function log(msg) {
    console.log(msg);
}
