var { execSync } = require('child_process');
var { writeFileSync, readdirSync, readFileSync } = require('fs');

var glob = require('glob');
var _ = require('underscore');

var { src, dest, series, watch } = require('gulp');
var log = require('fancy-log');
var gHash = require('gulp-hash');
var gClean = require('gulp-clean');
var gTerser = require('gulp-terser');
var gJasmine = require('gulp-jasmine');
var { SpecReporter } = require('jasmine-spec-reporter');
var gJshint = require('gulp-jshint');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');

_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
_.templateSettings.escape = /\{\{\{(.*?)\}\}\}/g;
_.templateSettings.evaluate = /\{\{-(.*?)\}\}/g;

var prodDependencies = [
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.1/es5-shim.min.js"></script>',
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>',
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>'
];

var devDependencies = [
  '<script src="lib/jquery-1.8.0.min.js"></script>',
  '<script src="lib/raphael-min.js"></script>',
  '<script src="lib/es5-shim.min.js"></script>'
];

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

var buildIndex = function(config) {
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
    jsDependencies: config.isProd ?
      prodDependencies.join('\n') :
      devDependencies.join('\n')
  });
  writeFileSync('index.html', outputIndex);
};

var buildIndexProd = function(done) {
  buildIndex({ isProd: true });
  done();
};
var buildIndexDev = function(done) {
  buildIndex({ isProd: false });
  done();
};

var getBundle = function(isProd) {
  var chain = browserify({
    entries: [...glob.sync('src/**/*.js'), ...glob.sync('src/**/*.jsx')],
    debug: true,
  });
  if (isProd) {
    chain = chain.plugin('tinyify');
  }

  chain = chain.transform(babelify, { presets: ['@babel/preset-react'] })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gHash());
  if (isProd) {
    chain = chain.pipe(gTerser());
  }
  return chain.pipe(dest(destDir));
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
  return getBundle();
};

var miniBuild = function() {
  return getBundle(true);
};

var style = function() {
  return src('src/style/main.css')
    .pipe(gHash())
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
  execSync('git commit -am "rebuild for prod" && ' +
    'git push origin gh-pages && ' +
    'git branch -f trunk gh-pages && ' +
    'git checkout master'
  );
  done();
};

var fastBuild = series(clean, ifyBuild, style, buildIndexDev, jshint);

var build = series(
  clean,
  miniBuild, style, buildIndexProd,
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
