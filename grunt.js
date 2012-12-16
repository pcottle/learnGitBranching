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
      files: ['grunt.js', 'src/**/*.js', 'spec/*.js']
    },
    compliment: {
      compliments: [
        "Wow peter great work!",
        "Such a professional dev environment",
        "Can't stop the TRAIN",
        "git raging"
      ]
    },
    hash: {
      src: ['build/bundle.min.js'],
      dest: 'build/'
    },
    jasmine_node: {
      specNameMatcher: 'spec', // load only specs containing specNameMatcher
      projectRoot: '.',
      forceExit: true,
      verbose: true
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'watching'
    },
    min: {
      dist: {
        src: ['build/bundle.js'],
        dest: 'build/bundle.min.js'
      }
    },
    rm: {
      build: 'build/*min*js'
    },
    jshint: {
      options: {
        curly: true,
        // sometimes triple equality is just redundant and unnecessary
        eqeqeq: false,
        // i know my regular expressions
        regexp: false,
        // i think it's super weird to not use new on a constructor
        nonew: false,
        // these latedefs are just annoying -- no pollution of global scope
        latedef: false,
        ///////////////////////////////
        // All others are true
        //////////////////////////////
        immed: true,
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
        entries: ['src/**/*.js', 'src/js/**/*.js']
        //prepend: ['<banner:meta.banner>'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-rm');

  //grunt.registerTask('default', 'lint jasmine_node browserify rm min hash compliment');
  grunt.registerTask('default', 'lint jasmine_node browserify compliment');

  grunt.registerTask('watching', 'browserify lint');
  grunt.registerTask('brow', 'browserify');
  grunt.registerTask('export', 'browserify min');
  grunt.registerTask('test', 'jasmine_node');
};

