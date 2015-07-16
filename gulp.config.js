/**
 * Created by sbunke on 7/14/2015.
 */
module.exports = function() {

    var client = './src/client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var server = './src/server/';

    var config = {

        //all js to vet
        alljs: [
            './src/**/*.js',
            './*.js',
        ],

        less: client + 'styles/styles.less',
        index: client + 'index.html',
        css: temp + 'styles.css',
        js: [
            clientApp + '**/*.module.js', //get all module files first
            clientApp + '**/*.js', //all of the other JS files
            '!' + clientApp + '**/*.spec.js', //exclude all spec files
        ],

        client: client,
        server: server,
        temp: temp,

        bower: {
            json: require('./bower.json'), //where to look up stuff
            directory: './bower_components', //where the components are
            ignorePath: '../..' //strip these off
        },

        //node settings
        defaultPort: 7203,
        nodeServer: './src/server/app.js'



    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    }

    return config;
};
