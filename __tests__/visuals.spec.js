
var VisBranch = require('../src/js/visuals/visBranch');

describe('visBranch', function() {
  describe('getBranchColor', function() {
    beforeEach(function() {
      VisBranch.branchColorIndex = 0;
      VisBranch.assignedBranchColors = {};
    });

    it('should return the correct color for main', function() {
      expect(VisBranch.randomHueString('main')).toEqual('#00FF7F');
    });

    it('should return the correct color for master', function() {
      expect(VisBranch.randomHueString('master')).toEqual('#0074D9');
    });

    it('should return a color from the palette for other branch names', function() {
      var color = VisBranch.randomHueString('my-branch');
      expect(VisBranch.BRANCH_COLOR_PALETTE).toContain(color);
    });

    it('should return the same color for the same branch name', function() {
      var color1 = VisBranch.randomHueString('my-branch');
      var color2 = VisBranch.randomHueString('my-branch');
      expect(color1).toEqual(color2);
    });
  });

});
