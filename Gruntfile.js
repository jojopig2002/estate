module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js'],
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'build/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js', '*.js'],
      options: {
        // options here to override JSHint defaults
        force: true,
        globals: {
          jQuery: true,
          $: true,
          alert: true,
          window: true,
          stop: true,
          angular: true,
          google: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>', 'app/**/*.html', '*.html', '*.less'],
        tasks: ['jshint', 'less'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/*.less'],
        options: {
          livereload: 1337
        }
      }
    },
    less: {
      // production config is also available
      development: {
        options: {
          // Specifies directories to scan for @import directives when parsing. 
          // Default value is the directory of the source, which is probably what you want.
          paths: ["./"],
        },
        files: {
          // compilation.css  :  source.less
          "app.css": "*.less"
        }
      },
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    protractor: {
      options: {
        configFile: "node_modules/protractor/example/conf.js", // Default config file 
        keepAlive: true, // If false, the grunt process stops when the test fails. 
        noColor: false, // If true, protractor will not use colors in its output. 
        args: {
          // Arguments passed to the command 
        }
      },
      your_target: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too. 
        options: {
          configFile: "test/e2e/conf.js", // Target-specific config file 
          args: {} // Target-specific arguments 
        }
      },
    },
    protractor_webdriver: {
      options: {
        // Task-specific options go here. 
        command: 'webdriver-manager start',
        path: ' /usr/local/lib/node_modules/protractor/selenium/chromedriver',
        keepAlive: true
      },
      your_target: {
        options: {
          // path: '',
          // command: 'webdriver-manager start'
        }
      }
    }
  });

  // grunt.loadNpmTasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('unittest', ['karma']);
  grunt.registerTask('minify', ['concat', 'uglify']);
  grunt.registerTask('e2etest', ['protractor']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};