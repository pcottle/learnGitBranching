var { execSync } = require('child_process');
var { writeFileSync, readdirSync, readFileSync } = require('fs');

var glob = require('glob');
var _ = require('underscore');

var { src, dest, series, watch } = require('gulp');
var log = require('fancy-log');
var gHash = require('gulp-hash');
var gClean = require('gulp-clean');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var gTerser = require('gulp-terser');
var gJasmine = require('gulp-jasmine');
var { minify } = require('html-minifier');
var { SpecReporter } = require('jasmine-spec-reporter');
var gJshint = require('gulp-jshint');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');

_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
_.templateSettings.escape = /\{\{\{(.*?)\}\}\}/g;
_.templateSettings.evaluate = /\{\{-(.*?)\}\}/g;

// precompile for speed
var indexFile = readFileSync('src/template.index.html').toString();
var indexTemplate = _.template(indexFile);

var compliments = [
  'Thanks to Hongarc for the modern and amazing gulp workflow!',
  'I hope you all have a great day :)'
];
var compliment = (done) => {
  var index = Math.floor(Math.random() * compliments.length);

  log(compliments[index]);
  done();
};

const lintStrings = (done) => {
  execSync('node src/js/intl/checkStrings');
  done();
};


var destDir = './build/';

var buildIndex = function(done) {
  log('Building index...');

  // first find the one in here that we want
  var buildFiles = readdirSync(destDir);

  var jsRegex = /bundle-[\.\w]+\.js/;
  var jsFile = buildFiles.find(function(name) {
    return jsRegex.exec(name);
  });
  if (!jsFile) {
    throw new Error('no hashed min file found!');
  }
  log('Found hashed js file: ' + jsFile);

  var styleRegex = /main-[\.\w]+\.css/;
  var styleFile = buildFiles.find(function(name) {
    return styleRegex.exec(name);
  });
  if (!styleFile) {
    throw new Error('no hashed css file found!');
  }
  log('Found hashed style file: ' + styleFile);

  // output these filenames to our index template
  var outputIndex = indexTemplate({
    jsFile,
    styleFile,
  });

  if (process.env.NODE_ENV === 'production') {
    outputIndex = minify(outputIndex, {
      minifyJS: true,
      collapseWhitespace: true,
      processScripts: ['text/html'],
      removeComments: true,
    });
  }
  writeFileSync('index.html', outputIndex);
  done();
};

var getBundle = function() {
  return browserify({
    entries: [...glob.sync('src/**/*.js'), ...glob.sync('src/**/*.jsx')],
    debug: true,
  })
  .transform(babelify, { presets: ['@babel/preset-react'] })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gHash());
};

var clean = function () {
  return src(destDir, { read: false, allowEmpty: true })
    .pipe(gClean());
};

var jshint = function() {
  return src([
    'gulpfile.js',
    '__tests__/',
    'src/'
  ])
  .pipe(gJshint())
  .pipe(gJshint.reporter('default'));
};

var ifyBuild = function() {
  return getBundle()
    .pipe(dest(destDir));
};

var miniBuild = function() {
  process.env.NODE_ENV = 'production';
  return getBundle()
    .pipe(gTerser())
    .pipe(dest(destDir));
};

var style = function() {
  var chain = src('src/style/*.css')
    .pipe(concat('main.css'));

  if (process.env.NODE_ENV === 'production') {
    chain = chain.pipe(cleanCSS());
  }

  return chain.pipe(gHash())
    .pipe(dest(destDir));
};

var jasmine = function() {
  return src('__tests__/*.spec.js')
    .pipe(gJasmine({
      config: {
        verbose: true,
        random: false,
      },
      reporter: new SpecReporter(),
  }));
};

var gitAdd = function(done) {
  execSync('git add build/');
  done();
};

var gitDeployMergeMaster = function(done) {
  execSync('git checkout gh-pages && git merge master -m "merge master"');
  done();
};

var gitDeployPushOrigin = function(done) {
  execSync('git commit -am "rebuild for prod"; ' +
    'git push origin gh-pages && ' +
    'git branch -f trunk gh-pages && ' +
    'git checkout master'
  );
  done();
};

var fastBuild = series(clean, ifyBuild, style, buildIndex, jshint);

var build = series(
  clean,
  miniBuild, style, buildIndex,
  gitAdd, jasmine, jshint,
  lintStrings, compliment
);

var deploy = series(
  clean,
  jasmine,
  jshint,
  gitDeployMergeMaster,
  build,
  gitDeployPushOrigin,
  compliment
);

var lint = series(jshint, compliment);

var watching = function() {
  return watch([
    'gulpfile.js',
    '__tests__/git.spec.js',
    'src/js/**/*.js',
    'src/js/**/**/*.js',
    'src/levels/**/*.js'
  ], series([fastBuild , jasmine, jshint, lintStrings]));
};

module.exports = {
  default: build,
  lint,
  fastBuild,
  watching,
  build,
  test: jasmine,
  deploy,
};
