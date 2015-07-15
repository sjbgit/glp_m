/**
 * Created by sbunke on 7/14/2015.
 */
module.exports = function() {

    var client = './src/client/';

    var config = {

        temp: './.tmp/',

        //all js to vet
        alljs: [
            './src/**/*.js',
            './*.js',
        ],

        less: client + 'styles/styles.less'
    };

    return config;
};
