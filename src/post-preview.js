var qs = require('querystring');
var template = require('./post-preview.hbs');
var SolidusClient = require('solidus-client');
var params = qs.parse(window.location.search.split('?').pop());

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

  var previewClient = new SolidusClient();

  options = _setDefaults(options, instance);

  if (options.resource) {

    var preprocessor = function(context) {
      // Render the preview resource directly, allows re-use of server-side templates
      context = context.resources.preview;
      return context;
    };

    var view = {
      resources: {
        preview: {
          url: options.resource,
          with_credentials: true,
          query: {'_wp_json_nonce': params._wp_json_nonce}
        }
      },
      preprocessor: preprocessor,
      template: instance.template
    };

    previewClient.render(view).end(function(err, html) {
      if (html) {
        instance.element.outerHTML = html;
        instance.element = document.getElementById(options.id);
      }
    });
  } else {
    console.warn('No resource defined.');
  }

}

//Private Functions
function _setDefaults(options, instance) {

  if (typeof options.template === 'function') {
    instance.template = options.template;
  } else {
    instance.template = template;
  }

  return options;
}