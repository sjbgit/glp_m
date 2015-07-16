/**
 * Created by sbunke on 7/14/2015.
 */
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');

console.log(config);

var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

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

    log('wire up the bower css, js and our app js into the html');
    var options = config.getWiredepDefaultOptions();

    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index) //get html file
        .pipe(wiredep(options)) //wiredep will see dependencies
        .pipe($.inject(gulp.src(config.js))) //get all local js files
        .pipe(gulp.dest(config.client));

});

gulp.task('inject', ['wiredep', 'styles'], function(){

    log('wire up the app css into the html, and call wiredep');

    return gulp
        .src(config.index) //get html file
        .pipe($.inject(gulp.src(config.css))) //get all local js files
        .pipe(gulp.dest(config.client));

});

gulp.task('serve-dev', ['inject'], function() {
    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer, //app.js
        delayTime: 1, //how long to wait before it re-runs
        env: {
            'PORT': port, //port to serve on (app.js)
            'NODE_ENV': isDev ? 'dev' : 'build'//see (app.js)
        },
        watch: [config.server] //restart on changes to these files
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) { //TODO: TRY TO GET VET WORKING
            log('*** nodemon restarted');
            log('files changed on restart: \n' + ev);
        })
        .on('start', function(ev) {
            log('*** nodemon started');
        })
        .on('crash', function(ev) {
            log('*** nodemon crashed');
        })
        .on('exit', function(ev) {
            log('*** nodemon clean exit');
        });
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
