//
//  primitives
//
//  Created by Christian Swinehart on 2010-12-08.
//  Copyright (c) 2011 Samizdat Drafting Co. All rights reserved.
//


var Primitives = function(ctx, _drawStyle, _fontStyle){

    ///MACRO:primitives-start
    var _Oval = function(x,y,w,h,style){
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.style = (style!==undefined) ? style : {}
    }
    _Oval.prototype = {
      draw:function(overrideStyle){
        this._draw(overrideStyle)
      },

      _draw:function(x,y,w,h, style){
        if (objcontains(x, 'stroke', 'fill', 'width')) style = x
        if (this.x!==undefined){
          x=this.x, y=this.y, w=this.w, h=this.h;
          style = objmerge(this.style, style)
        }
        style = objmerge(_drawStyle, style)
        if (!style.stroke && !style.fill) return

        var kappa = .5522848;
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        ctx.save()
          ctx.beginPath();
          ctx.moveTo(x, ym);
          ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
          ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
          ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
          ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
          ctx.closePath();

          // trace(style.fill, style.stroke)
          if (style.fill!==null){
            // trace("fill",fillColor, Colors.encode(fillColor))
            if (style.alpha!==undefined) ctx.fillStyle = Colors.blend(style.fill, style.alpha)
            else ctx.fillStyle = Colors.encode(style.fill)
            ctx.fill()
          }

          if (style.stroke!==null){
            ctx.strokeStyle = Colors.encode(style.stroke)
            if (!isNaN(style.width)) ctx.lineWidth = style.width
            ctx.stroke()
          }      
        ctx.restore()
      }

    }

    var _Rect = function(x,y,w,h,r,style){
      if (objcontains(r, 'stroke', 'fill', 'width')){
         style = r
         r = 0
      }
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.r = (r!==undefined) ? r : 0
      this.style = (style!==undefined) ? style : {}
    }
    _Rect.prototype = {
      draw:function(overrideStyle){
        this._draw(overrideStyle)
      },

      _draw:function(x,y,w,h,r, style){
        if (objcontains(r, 'stroke', 'fill', 'width', 'alpha')){
          style = r; r=0;
        }else if (objcontains(x, 'stroke', 'fill', 'width', 'alpha')){
          style = x
        }
        if (this.x!==undefined){
          x=this.x, y=this.y, w=this.w, h=this.h;
          style = objmerge(this.style, style)
        }
        style = objmerge(_drawStyle, style)
        if (!style.stroke && !style.fill) return

        var rounded = (r>0)
        ctx.save()
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y);
        if (rounded) ctx.quadraticCurveTo(x+w, y, x+w, y+r);
        ctx.lineTo(x+w, y+h-r);
        if (rounded) ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        ctx.lineTo(x+r, y+h);
        if (rounded) ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        if (rounded) ctx.quadraticCurveTo(x, y, x+r, y);      


        if (style.fill!==null){
          if (style.alpha!==undefined) ctx.fillStyle = Colors.blend(style.fill, style.alpha)
          else ctx.fillStyle = Colors.encode(style.fill)
          ctx.fill()
        }

        if (style.stroke!==null){
          ctx.strokeStyle = Colors.encode(style.stroke)
          if (!isNaN(style.width)) ctx.lineWidth = style.width
          ctx.stroke()
        }      
        ctx.restore()
      }
    }

    var _Path = function(x1, y1, x2, y2, style){
      // calling patterns:
      // ƒ( x1, y1, x2, y2, <style> )
      // ƒ( {x:1, y:1}, {x:2, y:2}, <style> )
      // ƒ( [ {x:1, y:1}, {x:2, y:2}, ...], <style> ) one continuous line
      // ƒ( [ [{x,y}, {x,y}], [{x,y}, {x,y}], ...], <style> ) separate lines

      if (style!==undefined || typeof y2=='number'){
        // ƒ( x1, y1, x2, y2, <style> )
        this.points = [ {x:x1,y:y1}, {x:x2,y:y2} ]
        this.style = style || {}
      }else if ($.isArray(x1)){
        // ƒ( [ {x:1, y:1}, {x:2, y:2}, ...], <style> )
        this.points = x1
        this.style = y1 || {}
      }else{
        // ƒ( {x:1, y:1}, {x:2, y:2}, <style> )
        this.points = [ x1, y1 ]
        this.style = x2 || {}
      }
    }
    _Path.prototype = {
      draw:function(overrideStyle){
        if (this.points.length<2) return

        var sublines = []
        if (!$.isArray(this.points[0])) sublines.push(this.points)
        else sublines = this.points
        
        ctx.save()
          ctx.beginPath();
          $.each(sublines, function(i, lineseg){
            ctx.moveTo(lineseg[0].x+.5, lineseg[0].y+.5);
            $.each(lineseg, function(i, pt){
              if (i==0) return
              ctx.lineTo(pt.x+.5, pt.y+.5);
            })
          })

          var style = $.extend(objmerge(_drawStyle, this.style), overrideStyle)
          if (style.closed) ctx.closePath()

          if (style.fill!==undefined){
            var fillColor = Colors.decode(style.fill, (style.alpha!==undefined) ? style.alpha : 1)
            if (fillColor) ctx.fillStyle = Colors.encode(fillColor)
              ctx.fill()
          }

          if (style.stroke!==undefined){
            var strokeColor = Colors.decode(style.stroke, (style.alpha!==undefined) ? style.alpha : 1)
            if (strokeColor) ctx.strokeStyle = Colors.encode(strokeColor)
            if (!isNaN(style.width)) ctx.lineWidth = style.width
            ctx.stroke()
          }
  			ctx.restore()
      }
    }
    

    var _Color = function(a,b,c,d){
      var rgba = Colors.decode(a,b,c,d)
      if (rgba){
        this.r = rgba.r
        this.g = rgba.g
        this.b = rgba.b
        this.a = rgba.a
      }
    }

    _Color.prototype = {
      toString:function(){
        return Colors.encode(this)
      },
      blend:function(){
        trace("blend",this.r,this.g,this.b,this.a)
      }
    }

    // var _Font = function(face, size){
    //   this.face = (face!=undefined) ? face : "sans-serif"
    //   this.size = (size!=undefined) ? size : 12
    //   // this.alignment = (opts.alignment!=undefined) ? alignment : "left"
    //   // this.baseline = (opts.baseline!=undefined) ? baseline : "ideographic"
    //   // this.color = (opts.color!=undefined) ? Colors.decode(opts.color) : Colors.decode("black")
    // }
    // _Font.prototype = {
    //   _use:function(face, size){
    //     // var params = $.extend({face:face, size:size}, opts)
    //     // $.each('face size alignment baseline color'.split(" "), function(i, param){
    //     //   if (params[param]!==undefined){
    //     //     if (param=='color') _fontStyle[param] = Colors.decode(params[param])
    //     //     else _fontStyle[param] = params[param]
    //     //   }
    //     // })
    // 
    //     // ctx.textAlign = _fontStyle.alignment
    //     // ctx.textBaseline = _fontStyle.baseline
    //     ctx.font = nano("{size}px {face}", {face:face, size:size})
    //     // trace(ctx.font,face,size)      
    //     // ctx.fillStyle = Colors.encode(_fontStyle)
    //     // _fontStyle = {face:face, size:size, alignment:opts.alignment, baseline:opts.baseline, color:opts.color}
    //   },
    //   use:function(){
    //     ctx.font = nano("{size}px {face}", this)
    //   }
    // }
    // 
    // 

  ///MACRO:primitives-end

  






  return {
    _Oval:_Oval,
    _Rect:_Rect,
    _Color:_Color,
    _Path:_Path
    // _Frame:Frame
  }
}