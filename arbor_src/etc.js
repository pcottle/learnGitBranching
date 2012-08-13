//
// etc.js
//
// misc utilities
//

  var trace = function(msg){
    if (typeof(window)=='undefined' || !window.console) return
    var len = arguments.length
    var args = []
    for (var i=0; i<len; i++) args.push("arguments["+i+"]")
    eval("console.log("+args.join(",")+")")
  }  

  var dirname = function(path){
    var pth = path.replace(/^\/?(.*?)\/?$/,"$1").split('/')
    pth.pop()
    return "/"+pth.join("/")
  }
  var basename = function(path){
    // var pth = path.replace(/^\//,'').split('/')
    var pth = path.replace(/^\/?(.*?)\/?$/,"$1").split('/')
    
    var base = pth.pop()
    if (base=="") return null
    else return base
  }

  var _ordinalize_re = /(\d)(?=(\d\d\d)+(?!\d))/g
  var ordinalize = function(num){
    var norm = ""+num
    if (num < 11000){
      norm = (""+num).replace(_ordinalize_re, "$1,")
    } else if (num < 1000000){
      norm = Math.floor(num/1000)+"k"
    } else if (num < 1000000000){
      norm = (""+Math.floor(num/1000)).replace(_ordinalize_re, "$1,")+"m"
    }
    return norm
  }

  /* Nano Templates (Tomasz Mazur, Jacek Becela) */
  var nano = function(template, data){
    return template.replace(/\{([\w\-\.]*)}/g, function(str, key){
      var keys = key.split("."), value = data[keys.shift()]
      $.each(keys, function(){ 
        if (value.hasOwnProperty(this)) value = value[this] 
        else value = str
      })
      return value
    })
  }
  
  var objcopy = function(old){
    if (old===undefined) return undefined
    if (old===null) return null
    
    if (old.parentNode) return old
    switch (typeof old){
      case "string":
      return old.substring(0)
      break
      
      case "number":
      return old + 0
      break
      
      case "boolean":
      return old === true
      break
    }

    var newObj = ($.isArray(old)) ? [] : {}
    $.each(old, function(ik, v){
      newObj[ik] = objcopy(v)
    })
    return newObj
  }
  
  var objmerge = function(dst, src){
    dst = dst || {}
    src = src || {}
    var merge = objcopy(dst)
    for (var k in src) merge[k] = src[k]
    return merge
  }
  
  var objcmp = function(a, b, strict_ordering){
    if (!a || !b) return a===b // handle null+undef
    if (typeof a != typeof b) return false // handle type mismatch
    if (typeof a != 'object'){
      // an atomic type
      return a===b
    }else{
      // a collection type
      
      // first compare buckets
      if ($.isArray(a)){
        if (!($.isArray(b))) return false
        if (a.length != b.length) return false
      }else{
        var a_keys = []; for (var k in a) if (a.hasOwnProperty(k)) a_keys.push(k)
        var b_keys = []; for (var k in b) if (b.hasOwnProperty(k)) b_keys.push(k)
        if (!strict_ordering){
          a_keys.sort()
          b_keys.sort()
        }
        if (a_keys.join(',') !== b_keys.join(',')) return false
      }
      
      // then compare contents
      var same = true
      $.each(a, function(ik){
        var diff = objcmp(a[ik], b[ik])
        same = same && diff
        if (!same) return false
      })
      return same
    }
  }

  var objkeys = function(obj){
    var keys = []
    $.each(obj, function(k,v){ if (obj.hasOwnProperty(k)) keys.push(k) })
    return keys
  }
  
  var objcontains = function(obj){
    if (!obj || typeof obj!='object') return false
    for (var i=1, j=arguments.length; i<j; i++){
      if (obj.hasOwnProperty(arguments[i])) return true
    }
    return false
  }

  var uniq = function(arr){
    // keep in mind that this is only sensible with a list of strings
    // anything else, objkey type coercion will turn it into one anyway
    var len = arr.length
    var set = {}
    for (var i=0; i<len; i++){
      set[arr[i]] = true
    }

    return objkeys(set) 
  }

  var arbor_path = function(){
    var candidates = $("script").map(function(elt){
      var src = $(this).attr('src')
      if (!src) return
      if (src.match(/arbor[^\/\.]*.js|dev.js/)){
        return src.match(/.*\//) || "/"
      }
    })

    if (candidates.length>0) return candidates[0] 
    else return null
  }
  