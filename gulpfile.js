/**
 * Created by sbunke on 7/14/2015.
 */
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');

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

gulp.task('styles', ['clean-styles'], function() {

    log('compiling less => css' + config.less);

    return gulp.src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        //.on('error', errorLogger)
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));

    /*
    return
        gulp.src(config.less)
            .pipe($.less())
            .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
            .pipe(gulp.dest(config.temp));
    */
});

gulp.task('clean-styles', function(done) {
    var files = config.temp + '**/*.css';
    clean(files, done);
});

gulp.task('less-watcher', function() {
   gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function(){

    var options = config.getWiredepDefaultOptions();

    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pip(gulp.dest(config.client));

});

function log(msg) {
    console.log(msg);
}

function clean(path, done) {
    log('Cleaning: ' + path);
    del(path, done);
}

/*
function errorLogger(error) {
    log('*****  Start of Error ******');
    log(error);
    log('*****  Start of Error ******');
    this.emit('end');
}
*/
