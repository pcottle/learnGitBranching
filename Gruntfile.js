var _ = require('underscore');
var fs = require('fs');

// Haha, this is so tricky. so we have a template for index.html to stick
// in the hashed JS and style files -- that template also contains
// templates used in the app. in order to avoid evaluating those
// templates, we change the regexes so we can effectively nest templates
_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
_.templateSettings.escape = /\{\{\{(.*?)\}\}\}/g;
_.templateSettings.evaluate = /\{\{-(.*?)\}\}/g;

// precompile for speed
var indexFile = fs.readFileSync('src/template.index.html').toString();
var indexTemplate = _.template(indexFile);

/**
 * This is SUPER jank but I can't get the underscore templating to evaluate
 * correctly with custom regexes, so I'm just going to use interpolate
 * and define the strings here.
 */

var prodDependencies = [
  '<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.1/es5-shim.min.js"></script>',
  '<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>',
  '<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>'
];

var devDependencies = [
  '<script src="lib/jquery-1.8.0.min.js"></script>',
  '<script src="lib/raphael-min.js"></script>',
  '<script src="lib/es5-shim.min.js"></script>'
];

/*global module:false*/
module.exports = function(grunt) {
  // eventually have sound...?
  grunt.registerTask('compliment', 'Stay motivated!', function() {
    var compliments = grunt.config('compliment.compliments');
    var index = Math.floor(Math.random() * compliments.length);

    grunt.log.writeln(compliments[index]);
  });

  grunt.registerTask('lintStrings', 'Find if an INTL string doesn\'t exist', function() {
    var child_process = require('child_process');
    child_process.exec('node src/js/intl/checkStrings', function(err, output) {
      grunt.log.writeln(output);
    });
  });

  var buildIndex = function(config) {
    grunt.log.writeln('Building index...');

    // first find the one in here that we want
    var buildFiles = fs.readdirSync('build');

    var hashedMinFile;
    if (buildFiles.length == 2) {
      grunt.log.writeln('Assuming debug mode wanted');
      hashedMinFile = 'bundle.js';
    }
    var jsRegex = /bundle\.min\.\w+\.js/;
    buildFiles.forEach(function(jsFile) {
      if (jsRegex.test(jsFile)) {
        if (hashedMinFile) {
          throw new Error('more than one hashed file: ' + jsFile + hashedMinFile);
        }
        hashedMinFile = jsFile;
      }
    });
    if (!hashedMinFile) { throw new Error('no hashed min file found!'); }

    grunt.log.writeln('Found hashed js file: ' + hashedMinFile);

    var styleRegex = /main\.\w+\.css/;
    var hashedStyleFile;
    buildFiles.forEach(function(styleFile) {
      if (styleRegex.test(styleFile)) {
        if (hashedStyleFile) {
          throw new Error('more than one hashed style: ' + styleFile + hashedStyleFile);
        }
        hashedStyleFile = styleFile;
      }
    });
    if (!hashedStyleFile) { throw new Error('no style found'); }

    grunt.log.writeln('Found hashed style file: ' + hashedStyleFile);

    // output these filenames to our index template
    var outputIndex = indexTemplate({
      jsFile: hashedMinFile,
      styleFile: hashedStyleFile,
      jsDependencies: config.isProd ?
        prodDependencies.join("\n") :
        devDependencies.join("\n")
    });
    fs.writeFileSync('index.html', outputIndex);
  };

  grunt.registerTask('buildIndex', 'stick in hashed resources', buildIndex.bind(null, {isProd: true}));
  grunt.registerTask('buildIndexDev', 'stick in hashed resources', buildIndex.bind(null, {isProd: false}));

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        '__tests__/*.spec.js',
        'src/js/**/*.js',
        'src/js/**/**/*.js',
        'src/levels/**/*.js'
      ],
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
        // use this in mocks
        forin: false,
        // This gets annoying
        globalstrict: false,
        // for use strict warnings
        node: true,
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
        debug: true,
        reporterOutput: '',
        globals: {
          casper: true,
          Raphael: true,
          require: true,
          console: true,
          describe: true,
          expect: true,
          it: true,
          runs: true,
          waitsFor: true,
          exports: true,
          module: true,
          prompt: true,
          process: true
        }
      },
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
      options: {
        mapping: ''
      },
      js: {
        src: 'build/bundle.min.js',
        dest: 'build/'
      },
      css: {
        src: 'src/style/main.css',
        dest: 'build/'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'watching'
    },
    uglify: {
      build: {
        src: ['build/bundle.js'],
        dest: 'build/bundle.min.js'
      }
    },
    clean: ['build/*'],
    shell: {
      gitAdd: {
        command: 'git add build/'
      }
    },
    jasmine_node: {
      projectRoot: './__tests__/',
      forceExit: true,
      verbose: true,
      requirejs: false
    },
    env: {
      prod: {
        NODE_ENV: 'production',
      },
    },
    browserify: {
      options: {
        transform: [require('grunt-react').browserify]
      },
      dist: {
        files: {
          'build/bundle.js': [
            'src/**/*.js',
            'src/**/*.jsx'
          ]
        }
      }
    }
  });

  // all my npm helpers
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('build',
    ['clean', 'env', 'browserify', 'uglify', 'hash', 'buildIndex', 'shell:gitAdd', 'jasmine_node', 'jshint', 'lintStrings', 'compliment']
  );
  grunt.registerTask('lint', ['jshint', 'compliment']);
  grunt.registerTask('fastBuild', ['clean', 'browserify', 'hash', 'buildIndexDev', 'jshint']);
  grunt.registerTask('watching', ['fastBuild', 'jasmine_node', 'jshint', 'lintStrings']);

  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', ['jasmine_node']);
  grunt.registerTask('casperTest', ['shell:casperTest']);
};
