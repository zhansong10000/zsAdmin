import Vue from 'vue';
import zsMessageVue from './zsMessage.vue';

var defaults = {
  title: '提示',
  message: '',
  type: '',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
};

var merge = function(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i];
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

var zsMessageConstructor = Vue.extend(zsMessageVue);

var currentMsg, instance;
var msgQueue = [];

const defaultCallback = action => {
  if (currentMsg) {
    var callback = currentMsg.callback;
    if (typeof callback === 'function') {
      callback(action);
    }
    if (currentMsg.resolve) {
      var $type = currentMsg.options.$type;
      if ($type === 'confirm') {
        if (action === 'confirm') {
          currentMsg.resolve(action);
        } else if (action === 'cancel' && currentMsg.reject) {
          currentMsg.reject(action);
        }
      } else {
        currentMsg.resolve(action);
      }
    }
  }
};

var initInstance = function() {
  instance = new zsMessageConstructor({
    el: document.createElement('div')
  });

  instance.callback = defaultCallback;
};

var showNextMsg = function() {
  if (!instance) {
    initInstance();
  }
  if (!instance.showDialog) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
      var options = currentMsg.options;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }
      document.body.appendChild(instance.$el);
      Vue.nextTick(() => {
        instance.showDialog = true;
      });
    }
  }
};

var zsMessage = function(options, callback) {
  if (typeof options === 'string') {
     options = {
      title: options
    };
    if (arguments[1]) {
      options.message = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) { // eslint-disable-line
      msgQueue.push({
        options: merge({}, defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });
      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults,  options),
      callback: callback
    });
    showNextMsg();
  }
};


zsMessage.alert = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return zsMessage(merge({
    title: title,
    message: message,
    $type: 'alert'
  }, options));
};

zsMessage.confirm = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return zsMessage(merge({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options));
};


zsMessage.close = function() {
  if (!instance) return;
  instance.showDialog = false;
  msgQueue = [];
  currentMsg = null;
};

export default zsMessage;
export { zsMessage };
