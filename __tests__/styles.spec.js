var fs = require('fs');
var path = require('path');

describe('style entrypoint', function() {
  it('loads modern and legacy Font Awesome styles in their original order', function() {
    var entryPath = path.join(__dirname, '../src/style/index.css');
    var entry = fs.readFileSync(entryPath, 'utf8');
    var modern = entry.indexOf("@import './all.min.css';");
    var legacy = entry.indexOf("@import './font-awesome.css';");

    expect(modern).toBeGreaterThan(-1);
    expect(legacy).toBeGreaterThan(modern);
  });
});
