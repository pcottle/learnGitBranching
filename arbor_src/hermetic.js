//
// hermetic.js
//
// the parts of jquery i can't live without (e.g., while in a web worker)
//
$ = {
  each:function(obj, callback){
    if ($.isArray(obj)){
      for (var i=0, j=obj.length; i<j; i++) callback(i, obj[i])
    }else{
      for (var k in obj) callback(k, obj[k])
    }
  },
  map:function(arr, fn){
    var out = []
    $.each(arr, function(i, elt){
      var result = fn(elt)
      if (result!==undefined) out.push(result)
    })
    return out
  },
  extend:function(dst, src){
    if (typeof src!='object') return dst
    
    for (var k in src){
      if (src.hasOwnProperty(k)) dst[k] = src[k]
    }
    
    return dst
  },
  isArray:function(obj){
    if (!obj) return false
    return (obj.constructor.toString().indexOf("Array") != -1)
  },

  inArray:function(elt, arr){
    for (var i=0, j=arr.length; i<j; i++) if (arr[i]===elt) return i;
    return -1
  },
  isEmptyObject:function(obj){
    if (typeof obj!=='object') return false
    var isEmpty = true
    $.each(obj, function(k, elt){
      isEmpty = false
    })
    return isEmpty
  },
}
