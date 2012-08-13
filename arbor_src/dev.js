//
// dev.js
//
// module wrapper for running from the un-minified src files
//
//
// to run from src, make sure your html includes look like:
//   <script src="js/src/etc.js"></script>
//   <script src="js/src/kernel.js"></script>
//   <script src="js/src/graphics/colors.js"></script>
//   <script src="js/src/graphics/primitives.js"></script>
//   <script src="js/src/graphics/graphics.js"></script>
//   <script src="js/src/tween/easing.js"></script>
//   <script src="js/src/tween/tween.js"></script>
//   <script src="js/src/physics/atoms.js"></script>
//   <script src="js/src/physics/barnes-hut.js"></script>
//   <script src="js/src/physics/physics.js"></script>
//   <script src="js/src/physics/system.js"></script>
//   <script src="js/src/dev.js"></script>


(function(){

  arbor = (typeof(arbor)!=='undefined') ? arbor : {}
  $.extend(arbor, {
    // object constructors (don't use ‘new’, just call them)
    ParticleSystem:ParticleSystem,
    Tween:Tween,
    Point:function(x, y){ return new Point(x, y) },
    Graphics:function(canvas){ return Graphics(canvas) },

    // immutable objects with useful methods
    colors:{
      CSS:Colors.CSS,           // {colorname:#fef2e2,...}
      validate:Colors.validate, // ƒ(str) -> t/f
      decode:Colors.decode,     // ƒ(hexString_or_cssColor) -> {r,g,b,a}
      encode:Colors.encode,     // ƒ({r,g,b,a}) -> hexOrRgbaString
      blend:Colors.blend        // ƒ(color, opacity) -> rgbaString
    },
    etc:{      
      trace:trace,              // ƒ(msg) -> safe console logging
      dirname:dirname,          // ƒ(path) -> leading part of path
      basename:basename,        // ƒ(path) -> trailing part of path
      ordinalize:ordinalize,    // ƒ(num) -> abbrev integers (and add commas)
      objcopy:objcopy,          // ƒ(old) -> clone an object
      objcmp:objcmp,            // ƒ(a, b, strict_ordering) -> t/f comparison
      objkeys:objkeys,          // ƒ(obj) -> array of all keys in obj
      objmerge:objmerge,        // ƒ(dst, src) -> like $.extend but non-destructive
      uniq:uniq,                // ƒ(arr) -> array of unique items in arr
      arbor_path:arbor_path,    // ƒ() -> guess the directory of the lib code
    }
  })

  
})()

