var { execSync } = require('child_process');
var {
  writeFileSync, readdirSync, readFileSync,
  existsSync, statSync, mkdirSync, copyFileSync,
} = require('fs');
var path = require('path');

var { marked } = require('marked');
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
  'Thanks to Hong4rc for the modern and amazing gulp workflow!',
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

var copyRecursiveSync = (src, dest) => {
  var exists = existsSync(src);
  var stats = exists && statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    mkdirSync(dest);
    readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  } else {
    copyFileSync(src, dest);
  }
};

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

  var buildDir = process.env.CI ? '.' : 'build';

  // output these filenames to our index template
  var outputIndex = indexTemplate({
    buildDir,
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

  if (process.env.CI) {
    writeFileSync('build/index.html', outputIndex);
    copyRecursiveSync('assets', 'build/assets');
  } else {
    writeFileSync('index.html', outputIndex);
  }
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

var convertMarkdownStringsToHTML = function(markdowns) {
  return marked(markdowns.join('\n'));
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

var gitDeployMergeMain = function(done) {
  execSync('git checkout gh-pages && git merge main -m "merge main"');
  done();
};

var gitDeployPushOrigin = function(done) {
  execSync('git commit -am "rebuild for prod"; ' +
    'git push origin gh-pages --force && ' +
    'git branch -f trunk gh-pages && ' +
    'git checkout main'
  );
  done();
};

var generateLevelDocs = function(done) {
  log('Generating level documentation...');
  
  // Get all level files
  const allLevels= require('./src/levels/index');
  const cssContent = readFileSync('./generatedDocs/github-markdown.css');
  
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Learn Git Branching - Level Documentation</title>
      <style>${cssContent}</style>
      <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 40px; }
        .level { margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
        .level-name { color: #333; }
        .level-goal { background: #f5f5f5; padding: 10px; border-radius: 4px; }
        .level-solution { font-family: monospace; background: #f0f0f0; padding: 10px; }
        .level-hint { color: #666; font-style: italic; }
      </style>
    </head>
    <body>
      <div class="markdown-body">
        <h1>Learn Git Branching - All Levels Documentation</h1>
  `;

  Object.keys(allLevels.sequenceInfo).forEach(sequenceKey => {
    log('Processing sequence: ', sequenceKey);

    const sequenceInfo = allLevels.sequenceInfo[sequenceKey];
    htmlContent += `
      <h2>Level Sequence: ${sequenceInfo.displayName.en_US}</h2>
      <h6>${sequenceInfo.about.en_US}</h6>
    `;

    const levels = allLevels.levelSequences[sequenceKey];
    for (const level of levels) {
      htmlContent += `<h3>Level: ${level.name.en_US}</h3>`;

      const startDialog = level.startDialog.en_US;
      for (const dialog of startDialog.childViews) {
        const childViewType = dialog.type;
        if (childViewType === 'ModalAlert') {
          htmlContent += convertMarkdownStringsToHTML(dialog.options.markdowns);
        } else if (childViewType === 'GitDemonstrationView') {
          htmlContent += convertMarkdownStringsToHTML(dialog.options.beforeMarkdowns);
          htmlContent += `<pre class="level-solution">${dialog.options.command}</pre>`;
          htmlContent += convertMarkdownStringsToHTML(dialog.options.afterMarkdowns);
        } else {
          throw new Error(`Unknown child view type: ${childViewType}`);
        }
      }
    }

  });

  htmlContent += `
    </div>
    </body>
    </html>
  `;

  // Write the file
  writeFileSync('generatedDocs/levels.html', htmlContent);
  log('Level documentation generated at build/levels.html');
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
  gitDeployMergeMain,
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
    'src/js/**/*.jsx',
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
  generateLevelDocs,
};
