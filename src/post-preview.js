var template = require('./post-preview.hbs');

module.exports = PostPreview;

function PostPreview (options) {
  if (!(this instanceof PostPreview)) return new PostPreview(options);
  var instance = this;

  if (options.element.jquery) {
    instance.element = options.element[0];
  } else if (options.element.nodeType > 0) {
    instance.element = options.element;
  } else {
    instance.element = document.querySelector(options.element);
  }

  options = _setDefaults(options, instance);

  if (options.resource) {
    _getJSON(options.resource, function(resp){
        options.content = resp;
        //Render the Default Template
        instance.element.outerHTML = instance.template(options);
        //Select new DOM element after replacing original with rendered template
        instance.element = document.getElementById(options.id);
    });
  } else {
    console.warn('No resource defined.');
  }

}

//Private Functions
function _setDefaults(options, instance) {
  var instanceId = Math.floor(Math.random() * 10000);
  //get/set the ID of the HTML element (may be different than the value of element)
  options.id = instance.element.id || ('post-preview-' + instanceId);
  options.instanceId = instanceId;

  if (typeof options.template === 'function') {
    instance.template = options.template;
  } else {
    instance.template = template;
  }

  return options;
}

function _getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onload = function() {
    cb(JSON.parse(xhr.responseText));
  };
  xhr.onerror = function(){
    cb('Error');
  };
  xhr.send();
}