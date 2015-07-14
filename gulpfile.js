/**
 * Created by sbunke on 7/14/2015.
 */
var gulp = require('gulp');

var args = require('yargs').argv;

gulp.task('vet', function() {
    log('running vet - analyzer with jshint and jscs');
    return gulp.src([
        './src/**/*.js',
        './*.js',
    ])
        .pipe(gulpif(args.verbose, gulpprint()))//if pass in verbose flag to gulp command, then will log all files
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});

function log(msg) {
    console.log(msg);
}
