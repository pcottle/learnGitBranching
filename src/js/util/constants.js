/**
 * Constants....!!!
 */
var TIME = {
  betweenCommandsDelay: 400
};

var VIEWPORT = {
  minZoom: 0.55,
  maxZoom: 1.25,
  minWidth: 600,
  minHeight: 600
};

var GRAPHICS = {
  arrowHeadSize: 8,

  nodeRadius: 17,
  curveControlPointOffset: 50,
  defaultEasing: 'easeInOut',
  defaultAnimationTime: 400,

  rectFill: 'hsb(0.8816909813322127,0.6,1)',
  headRectFill: '#2831FF',
  rectStroke: '#FFF',
  rectStrokeWidth: '3',

  originDash: '- ',

  multiBranchY: 20,
  multiTagY: 15,
  upstreamHeadOpacity: 0.5,
  upstreamNoneOpacity: 0.2,
  edgeUpstreamHeadOpacity: 0.4,
  edgeUpstreamNoneOpacity: 0.15,

  visBranchStrokeWidth: 2,
  visBranchStrokeColorNone: '#333',

  defaultNodeFill: 'hsba(0.5,0.6,0.7,1)',
  defaultNodeStrokeWidth: 2,
  defaultNodeStroke: '#FFF',

  tagFill: 'hsb(0,0,0.9)',
  tagStroke: '#FFF',
  tagStrokeWidth: '2',
  
  orphanNodeFill: 'hsb(0.5,0.8,0.7)'
};

exports.TIME = TIME;
exports.GRAPHICS = GRAPHICS;
exports.VIEWPORT = VIEWPORT;

