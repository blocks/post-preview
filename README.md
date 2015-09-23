Post Preview is a standalone client-side UMD JavaScript module for rendering an API response (resource) on a page using solidus-client and a handlebars template.

# Getting the Module
You can download [the latest release](https://github.com/blocks/post-preview/releases) from GitHub or install with `npm install post-preview`.

# Example Usage
To get started, you'll need to include the script on your page, create a placeholder element, and initialize the module. After you include post-preview.js in your project, here's a minimal code pattern you can use to get started quickly;

```
<div id="post"></div>
```


```
<script>
window.onload = function() {
  var postPreview = new PostPreview({
    element: '#post',
    resource: 'http://wordpress.sparkart.com/wp-json/posts/';
  });
};
</script>
```

At a minimum, you'll need to change the `resource` parameter to match your needs.

# Advanced Usage

## Options
The module can be configured with several optional parameters passed to it's constructor. Here is the full list of options:

### `element`
**(Required)** A DOM element, jQuery element, or selector string to refer to the placeholder element.


### `template`
If you want to customize the markup, you can override the default markup by passing in a *compiled* handlebars template using this option. See the default template for a starting point to work from. (Defaults to `false`).

# Browser Support
This module supports the latest versions of all major browsers. IE9 and lower are not supported.