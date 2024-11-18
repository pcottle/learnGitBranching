var toGlobalize = {
  App: require('../app/index.js'),
  Tree: require('../visuals/tree'),
  Visuals: require('../visuals'),
  Git: require('../git'),
  CommandModel: require('../models/commandModel'),
  CommandLineStore: require('../stores/CommandLineStore'),
  CommandLineActions: require('../actions/CommandLineActions'),
  LevelActions: require('../actions/LevelActions'),
  LevelStore: require('../stores/LevelStore'),
  LocaleActions: require('../actions/LocaleActions'),
  GlobalStateActions: require('../actions/GlobalStateActions'),
  GlobalStateStore: require('../stores/GlobalStateStore'),
  LocaleStore: require('../stores/LocaleStore'),
  Levels: require('../graph/treeCompare'),
  Constants: require('../util/constants'),
  Commands: require('../commands'),
  Collections: require('../models/collections'),
  Async: require('../visuals/animation'),
  AnimationFactory: require('../visuals/animation/animationFactory'),
  Main: require('../app'),
  HeadLess: require('../git/headless'),
  Q: { Q: require('q') },
  RebaseView: require('../views/rebaseView'),
  Views: require('../views'),
  MultiView: require('../views/multiView'),
  ZoomLevel: require('../util/zoomLevel'),
  VisBranch: require('../visuals/visBranch'),
  TreeCompare: require('../graph/treeCompare'),
  Level: require('../level'),
  Sandbox: require('../sandbox/'),
  SandboxCommands: require('../sandbox/commands'),
  GitDemonstrationView: require('../views/gitDemonstrationView'),
  Markdown: require('marked').marked,
  LevelDropdownView: require('../views/levelDropdownView'),
  BuilderViews: require('../views/builderViews'),
  Util: require('../util/index'),
  Intl: require('../intl')
};

Object.keys(toGlobalize).forEach(function(moduleName) {
  var module = toGlobalize[moduleName];

  for (var key in module) {
    var value = module[key];
    if (value instanceof Function) {
      value = value.bind(module);
    }
    window['debug_' + moduleName + '_' + key] = value;
  }
});

$(document).ready(function() {
  window.debug_events = toGlobalize.Main.getEvents();
  window.debug_eventBaton = toGlobalize.Main.getEventBaton();
  window.debug_sandbox = toGlobalize.Main.getSandbox();
  window.debug_modules = toGlobalize;
  window.debug_levelDropdown = toGlobalize.Main.getLevelDropdown();
  window.debug_copyTree = function() {
    return toGlobalize.Main.getSandbox().mainVis.gitEngine.printAndCopyTree();
  };

  window.debug_downloadImageOfDemonstrationView = function() {
    const svgElement = document.querySelectorAll('svg[style*="z-index: 300"]')[0];
    const svgBlob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml' });
    // Create a URL object
    const url = URL.createObjectURL(svgBlob);
  
    // Create an anchor element to download the image
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image.svg';
    a.click();
  

    // svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    // console.log('the SVG element', svgElement);
    // const serializer = new XMLSerializer();
    // const svgString = serializer.serializeToString(svgElement);
    // console.log('the SVG string', svgString);
    // const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    // console.log('the SVG data', svgDataUrl);

    // const canvas = document.createElement("canvas");
    // const context = canvas.getContext("2d");

    // // Set canvas size to match the SVG's dimensions
    // canvas.width = svgElement.width.baseVal.value;
    // canvas.height = svgElement.height.baseVal.value;

    // // Create an image and load the SVG Data URL
    // const image = new Image();
    // image.onload = () => {
    //   context.drawImage(image, 0, 0);
      
    //   setTimeout(() => {
    //     // Export the canvas to an image
    //     const pngDataUrl = canvas.toDataURL("image/png");
    //     console.log('the PNG data', pngDataUrl); // Logs the base64 PNG image URL

    //     // (Optional) Create a downloadable link
    //     const downloadLink = document.createElement("a");
    //     downloadLink.href = pngDataUrl;
    //     downloadLink.download = "exported-image.png";
    //     downloadLink.click();
    //   }, 1000);
    // };
    // image.src = svgDataUrl;

  };

});
