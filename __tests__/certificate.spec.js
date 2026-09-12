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
    expect(svg).toContain('>Undoing Changes  •  Tags &amp; History');
    expect(svg).not.toContain('This certifies that');
    expect(svg).not.toContain('from the basic concepts');
  });

  it('renders a compact centered commit graph without a seal', function() {
    var svg = certificate.buildCertificateSVG({
      name: 'Peter Cottle',
      levelsTotal: 36
    });

    // The node range plus the right-hand branch label balance around the
    // canvas center without crowding the footer.
    expect(svg).toContain('cx="350" cy="625"');
    expect(svg).toContain('cx="775" cy="625"');
    expect(svg).not.toContain('>36/36</text>');
  });

  it('escapes recipient names and renders the completed level count', function() {
    var svg = certificate.buildCertificateSVG({
      name: '<Ada & Grace>',
      levelsTotal: 36
    });

    expect(svg).toContain('&lt;Ada &amp; Grace&gt;');
    expect(svg).toContain('all 36 levels');
    expect(svg).not.toContain('><Ada & Grace></text>');
  });

  it('builds a safe filename from the recipient name', function() {
    expect(certificate.filenameForName('  Peter Cottle  ')).toBe(
      'learn-git-branching-certificate-peter-cottle.png'
    );
  });
});
