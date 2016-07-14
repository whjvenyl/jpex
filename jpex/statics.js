

exports.Copy = function(obj){
  var self = this;
  
  switch(module.exports.Typeof(obj)){
  case 'object':
    var o = {};
    Object.keys(obj).forEach(function(k){
      o[k] = self.Copy(obj[k]);
    });
    return o;
    
  case 'array':
    return obj.map(o => self.Copy(o));
  
  case 'regexp':
    var flags = [];
    if (obj.global){flags.push('g');}
    if (obj.ignoreCase){flags.push('i');}
    return new RegExp(obj.source, flags.join(''));
    
  default:
    return obj;
  }
};

exports.Typeof = function(el){
  switch (typeof el){
    case 'object':
      if (el === null){
        return 'null';
      }
      if (Array.isArray(el)){
        return 'array';
      }
      if (el instanceof Date){
        return 'date';
      }
      if (el instanceof RegExp){
        return 'regexp';
      }
      return 'object';
    case 'function':
      if (el.prototype && Object.keys(el.prototype).length){
        return 'class';
      }
      return 'function';
    default:
      return typeof el;
  }
};