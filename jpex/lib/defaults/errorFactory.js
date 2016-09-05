module.exports = function(NewClass){  
  NewClass.Register.Factory('$errorFactory', null, function(){  
    // Throw the standard error
    var $error = function(){
      $error.default.throw.apply($error.default, arguments);
    };
    
    // create a new error type and add it to $error
    $error.define = function(name, fn){
      var NewError = function(message){
        this.message = message;
        
        if (Error.captureStackTrace){
          Error.captureStackTrace(this, this.constructor);
        }else{
          this.stack = (new Error()).stack;
        }
        
        if (fn){
          fn.apply(this, arguments);
        }
      };
      NewError.prototype = Object.create(Error.prototype);
      NewError.prototype.constructor = NewError;
      NewError.prototype.name = name;
      NewError.prototype.throw = function(){
        throw this;
      };
      NewError.create = function(){
        var args = Array.from(arguments);
        args.unshift(NewError);
        var err = new (Function.prototype.bind.apply(this, args));
        return err;
      };
      NewError.throw = function(){
        throw this.create.apply(this, arguments);
      };
      
      $error[name] = NewError;
      return NewError;
    };
    
    $error.define('Error');
    $error.default = $error.Error;
    
    return $error;
  });
};