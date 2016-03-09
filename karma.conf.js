// Karma configuration

module.exports = function(config) {
    'use strict';
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'node_modules/angular/angular.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        './vendor/angular-mocks/angular-mocks.js',
        'vendor/jquery-ui/jquery-ui.js',
        'app.js',
        './app/**/*.js'
    ],

    // list of files to exclude
    exclude: [

    ],

    // web server port
    port: 9876,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
