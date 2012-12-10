/*global module:false*/
module.exports = function(grunt) {

  // eventually have sound...?
  grunt.registerTask('compliment', function() {
    grunt.log.writeln('You are awesome!');
  });

  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'src/*.js']
    },
    /*
    jasmine_node: {
      specNameMatcher: "./spec", // load only specs containing specNameMatcher
      projectRoot: ".",
      requirejs: false,
      forceExit: true,
      jUnit: {
        report: false,
        savePath : "./build/reports/jasmine/",
        useDotNotation: true,
        consolidate: true
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },*/
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        _: true,
        Backbone: true,
        '$': true,
        require: true,
        define: true,
        requirejs: true,
        describe: true,
        expect: true,
        it: true
      }
    }
  });

  //grunt.loadNpmTasks('grunt-jasmine-node');

  // Default task.
  grunt.registerTask('default', 'lint jasmine_node');
};

