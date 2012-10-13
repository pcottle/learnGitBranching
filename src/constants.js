
/**
 * Constants....!!!
 */
var constants = {
  clickDragMass: 20,
  baseMass: 1,
};

var TIME = {
  betweenCommandsDelay: 400,
  commandShow: 300,
  reflowGuess: 100
};

var GRAPHICS = {
  arrowHeadSize: 8,

  nodeRadius: 17,
  curveControlPointOffset: 50,
  defaultEasing: 'easeInOut',
  defaultAnimationTime: 400,

  //rectFill: '#FF3A3A',
  rectFill: 'hsb(0.8816909813322127,0.7,1)',
  headRectFill: '#2831FF',
  rectStroke: '#FFF',
  rectStrokeWidth: '3',

  multiBranchY: 20,
  upstreamHeadOpacity: 0.5,
  upstreamNoneOpacity: 0.2,
  edgeUpstreamHeadOpacity: 0.4,
  edgeUpstreamNoneOpacity: 0.15,

  visBranchStrokeWidth: 2,
  visBranchStrokeColorNone: '#333',

  defaultNodeFill: 'hsba(0.5,0.8,0.7,1)',
  defaultNodeStrokeWidth: 2,
  defaultNodeStroke: '#FFF',

  orphanNodeFill: 'hsb(0.5,0.8,0.7)',
};

/**
 * Graphics style -- DEPRECATED
 */
var graphics = {
  // colors
  edgeStroke: 'rgba(94%, 96%, 98%, 0.5)', // '#EFF5FB',
  nodeEdge: 'rgba(94%, 96%, 98%, 0.9)', // '#EFF5FB',
  nodeFill: '#0066cc',
  nodeRadius: 10,

  // widths
  nodeStrokeWidth: 15,
  edgeWidth: 2,

  // ref names
  refFont: '14pt Courier New',
  refFontFill: '#FFF',
  refSelectedFontFill: 'rgb(255, 30, 10)',

  // ref arrows
  arrowFill: '#FFF',
  arrowStroke: '#000',
  arrowWidth: 4,
  arrowHeadWidth: 5,
};

function randomString(string_length) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}

