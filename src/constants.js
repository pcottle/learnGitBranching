
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
  nodeRadius: 15,
  curveControlPointOffset: 50,
  defaultEasing: 'easeInOut',
  defaultAnimationTime: 300,

  rectFill: '#FF3A3A',
  headRectFill: '#2831FF',
  rectStroke: '#FFF',
  rectStrokeWidth: '3',

  multiBranchY: 20,
  upstreamHeadOpacity: 0.5,
  upstreamNoneOpacity: 0.2,
  edgeUpstreamHeadOpacity: 0.4,
  edgeUpstreamNoneOpacity: 0.15
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

