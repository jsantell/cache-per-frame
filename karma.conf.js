module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [{
      pattern: 'dist/cache-per-frame.js'
    }, {
      pattern: 'test/**/*.js'
    }],
    reporters: ['progress'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: true,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity
  });
}
