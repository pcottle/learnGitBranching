var certificate = require('../src/js/util/certificate');

describe('completion certificate', function() {
  it('centers the recipient name in the SVG', function() {
    var svg = certificate.buildCertificateSVG({
      name: 'Peter Cottle',
      levelsTotal: 36,
      dateString: 'September 11, 2026'
    });

    expect(svg).toContain('x="50%"');
    expect(svg).toContain('text-anchor="middle"');
    expect(svg).toContain('>Peter Cottle</text>');
    expect(svg).toContain('>TOPICS COVERED</text>');
    expect(svg).toContain('>Commits &amp; Branches  •  Merging &amp; Rebasing');
  });

  it('centers the commit graph independently of the seal', function() {
    var svg = certificate.buildCertificateSVG({
      name: 'Peter Cottle',
      levelsTotal: 36
    });

    // The node range plus the right-hand branch label balance around the
    // canvas center, while the seal remains a separate element.
    expect(svg).toContain('cx="300" cy="630"');
    expect(svg).toContain('cx="810" cy="630"');
    // The seal remains separate on the right rather than shifting the graph.
    expect(svg).toContain('cx="1030" cy="576"');
  });

  it('escapes recipient names and renders the completed level count', function() {
    var svg = certificate.buildCertificateSVG({
      name: '<Ada & Grace>',
      levelsTotal: 36
    });

    expect(svg).toContain('&lt;Ada &amp; Grace&gt;');
    expect(svg).toContain('>36/36</text>');
    expect(svg).not.toContain('><Ada & Grace></text>');
  });

  it('builds a safe filename from the recipient name', function() {
    expect(certificate.filenameForName('  Peter Cottle  ')).toBe(
      'learn-git-branching-certificate-peter-cottle.png'
    );
  });
});
