/**
 * Created by sbunke on 7/14/2015.
 */
module.exports = function() {

    var client = './src/client/';
    var clientApp = client + 'app/';

    var config = {

        temp: './.tmp/',

        //all js to vet
        alljs: [
            './src/**/*.js',
            './*.js',
        ],

        less: client + 'styles/styles.less',

        index: client + 'index.html',

        js: [
            clientApp + '**/*.module.js', //get all module files first
            clientApp + '**/*.js', //all of the other JS files
            '!' + clientApp + '**/*.spec.js', //exclude all spec files
        ],

        client: client,

        bower: {
            json: require('./bower.json'), //where to look up stuff
            directory: './bower_components', //where the components are
            ignorePath: '../..' //strip these off
        }
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
