var constant = require('./constant');
var factory = require('./factory');
var service = require('./service');
var decorator = require('./decorator');

module.exports = function (Class, options) {
  var register = function () {
    return register.factory.apply(null, arguments);
  };
  register.constant = constant.bind(Class);
  register.factory = factory.bind(Class, options.defaultLifecycle);
  register.service = service.bind(Class);
  register.decorator = decorator.bind(Class);

  // FACTORY HOOKS
  Class.$trigger('factories', {
    Class : Class,
    options : options,
    register : function (name, fn) {
      register[name] = fn.bind(Class);
    }
  });

  Object.defineProperty(Class, 'register', {
    value : register
  });
};
