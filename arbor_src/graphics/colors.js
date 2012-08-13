var Colors = (function(){
  var iscolor_re = /#[0-9a-f]{6}/i
  var hexrgb_re = /#(..)(..)(..)/

  var d2h = function(d){
    // decimal to hex
    var s=d.toString(16); 
    return (s.length==2) ? s : '0'+s
  }
  
  var h2d = function(h){
    // hex to decimal
    return parseInt(h,16);
  }

  var _isRGB = function(color){
    if (!color || typeof color!='object') return false
    var components = objkeys(color).sort().join("")
    if (components == 'abgr') return true
  }

  // var _isHSB = function(color){
  //   if (!color || typeof cssOrHex!='object') return false
  //   var components = objkeys(color).sort().join("")
  //   if (components == 'hsb') return true
  // }


  var that = {
    CSS:{aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", darkgray:"#a9a9a9", darkgrey:"#a9a9a9", darkgreen:"#006400", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", forestgreen:"#228b22", fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", grey:"#808080", green:"#008000", greenyellow:"#adff2f", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", lightgrey:"#d3d3d3", lightgreen:"#90ee90", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370d8", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", mediumturquoise:"#48d1cc", mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#d87093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", purple:"#800080", red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", yellow:"#ffff00", yellowgreen:"#9acd32"},

    // possible invocations:
    //    decode(1,2,3,.4)      -> {r:1,   g:2,   b:3,   a:0.4}
    //    decode(128, .7)       -> {r:128, g:128, b:128, a:0.7}    
    //    decode("#ff0000")     -> {r:255, g:0,   b:0,   a:1}
    //    decode("#ff0000",.5)  -> {r:255, g:0,   b:0,   a:0.5}
    //    decode("white")       -> {r:255, g:255, b:255, a:1}
    //    decode({r:0,g:0,b:0}) -> {r:0,   g:0,   b:0,   a:1}
    decode:function(clr){
      var argLen = arguments.length
      for (var i=argLen-1; i>=0; i--) if (arguments[i]===undefined) argLen--
      var args = arguments
      if (!clr) return null
      if (argLen==1 && _isRGB(clr)) return clr

      var rgb = null

      if (typeof clr=='string'){
        var alpha = 1
        if (argLen==2) alpha = args[1]
        
        var nameMatch = that.CSS[clr.toLowerCase()]
        if (nameMatch!==undefined){
           clr = nameMatch
        }
        var hexMatch = clr.match(iscolor_re)
        if (hexMatch){
          vals = clr.match(hexrgb_re)
          // trace(vals)
          if (!vals || !vals.length || vals.length!=4) return null    
          rgb = {r:h2d(vals[1]), g:h2d(vals[2]), b:h2d(vals[3]), a:alpha}
        }
      }else if (typeof clr=='number'){
        if (argLen>=3){
          rgb = {r:args[0], g:args[1], b:args[2], a:1}
          if (argLen>=4) rgb.a *= args[3]
        }else if(argLen>=1){
          rgb = {r:args[0], g:args[0], b:args[0], a:1}
          if (argLen==2) rgb.a *= args[1]
        }
      }


      // if (!rgb) trace("<null color>")
      // else trace(nano("<r:{r} g:{g} b:{b} a:{a}>",rgb))
      // 
      // if (arguments.length==1){        
      //   if (_isRGB(clr)) return clr
      //   if (!clr || typeof clr!='string') return null
      // 
      //   var nameMatch = that.CSS[clr.toLowerCase()]
      //   if (nameMatch!==undefined){
      //      clr = nameMatch
      //   }
      //   var hexMatch = clr.match(iscolor_re)
      //   if (hexMatch){
      //     vals = clr.match(hexrgb_re)
      //     if (!vals || !vals.length || vals.length!=4) return null    
      //     var rgb = {r:h2d(vals[1]), g:h2d(vals[2]), b:h2d(vals[3])}
      //     return rgb
      //   }
      // }
      
      return rgb
    },
    validate:function(str){
      if (!str || typeof str!='string') return false
      
      if (that.CSS[str.toLowerCase()] !== undefined) return true
      if (str.match(iscolor_re)) return true
      return false
    },
    
    // transform
    mix:function(color1, color2, proportion){
      var c1 = that.decode(color1)
      var c2 = that.decode(color2)
      
      // var mixed = ... should this be a triplet or a string?
    },
    blend:function(rgbOrHex, alpha){
      alpha = (alpha!==undefined) ? Math.max(0,Math.min(1,alpha)) : 1
      
      var rgb = that.decode(rgbOrHex)
      if (!rgb) return null
      
      if (alpha==1) return rgbOrHex
      var rgb = rgbOrHex
      if (typeof rgbOrHex=='string') rgb = that.decode(rgbOrHex)
      
      var blended = objcopy(rgb)
      blended.a *= alpha
      
      return nano("rgba({r},{g},{b},{a})", blended)
    },
    
    // output
    encode:function(rgb){
      if (!_isRGB(rgb)){
        rgb = that.decode(rgb)
        if (!_isRGB(rgb)) return null
      }
      if (rgb.a==1){
        return nano("#{r}{g}{b}", {r:d2h(rgb.r), g:d2h(rgb.g), b:d2h(rgb.b)} )        
      }else{
        return nano("rgba({r},{g},{b},{a})", rgb)
      }

      // encoding = encoding || "hex"
      // if (!_isRGB(rgb)) return null
      // switch(encoding){
      // case "hex":
      //   return nano("#{r}{g}{b}", {r:d2h(rgb.r), g:d2h(rgb.g), b:d2h(rgb.b)} )
      //   break
      //   
      // case "rgba":
      //   return nano("rgba({r},{g},{b},{alpha})", rgb)
      //   break
      // }
      // // if (rgb===undefined || !rgb.length || rgb.length!=3) return null
      // // return '#'+$.map(rgb, function(c){return d2h(c)}).join("")
    }
  }
  
  return that
})()
