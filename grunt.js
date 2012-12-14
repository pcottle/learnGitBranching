/*global module:false*/
module.exports = function(grunt) {
  // eventually have sound...?
  grunt.registerTask('compliment', 'Stay motivated!', function() {
    var defaults = ['Awesome!!'];

    var compliments = grunt.config('compliment.compliments') || defaults;
    var index = Math.floor(Math.random() * compliments.length);

    grunt.log.writeln(compliments[index]);
  });

  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'src/*.js', 'src/**/*.js']
    },
    compliment: {
      compliments: [
        "Wow peter great work!",
        "Such a professional dev environment",
        "Can't stop the TRAIN",
        "git raging"
      ]
    },
    jasmine_node: {
      specNameMatcher: 'spec', // load only specs containing specNameMatcher
      projectRoot: '.',
      forceExit: true,
      verbose: true
      /*
      requirejs: false,
      jUnit: {
        report: false,
        savePath : './build/reports/jasmine/',
        useDotNotation: true,
        consolidate: true
      }*/
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        // sometimes triple equality is just redundant and unnecessary
        eqeqeq: false,
        regexp: false,
        immed: true,
        latedef: false,
        nonew: false,
        newcap: true,
        noarg: true,
        bitwise: true,
        sub: true,
        undef: true,
        unused: false,
        trailing: true,
        devel: true,
        jquery: true,
        nonstandard: true,
        boss: true,
        eqnull: true,
        browser: true,
        debug: true
      },
      globals: {
        _: true,
        Backbone: true,
        '$': true,
        Raphael: true,
        require: true,
        console: true,
        describe: true,
        expect: true,
        it: true,
        exports: true
      }
    },
    browserify: {
      'build/bundle.js': {
        requires: ['traverse'],
        // aliases: ['jquery:jquery-browserify'],
        entries: ['src/*.js'],
        //prepend: ['<banner:meta.banner>'],
        append: []
        /*hook: function (bundle) {
          // Do something with bundle
        }*/
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Default task.
  grunt.registerTask('default', 'lint browserify compliment');
  grunt.registerTask('test', 'jasmine_node');
};

