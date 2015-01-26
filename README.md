# koa-cheerio

Simple templating for [koa](http://koajs.com/) using [cheerio](https://github.com/MatthewMueller/cheerio).
You can use your jQuery knowledge for server-side templating.

# Installation
```
npm install koa-cheerio
```

# Example
views/index.html
```html
<html>
<body>
Hello <span id='hello'></span>!
</body>
</html>
```

```js
var app = require('koa')();
var render = require('koa-cheerio');

app.use(render({ root: 'views/', ext: '.html' }));

app.use(function *index(next) {
  var $ = yield this.render('index');
  $('#hello').text('World');
});

app.listen(3000);
```

You can also pass an extra object if you need to modify any
of the default parsing options:

```js
var $ = yield this.render('index', {
  normalizeWhitespace: true,
  xmlMode: true
});
```
Comment from the [cheerio-readme](https://github.com/cheeriojs/cheerio/blob/master/Readme.md):
These parsing options are taken directly from [htmlparser2](https://github.com/fb55/htmlparser2/wiki/Parser-options), therefore any options that can be used in `htmlparser2` are valid in cheerio as well. The default options are:
```js
{
    normalizeWhitespace: false,
    xmlMode: false,
    decodeEntities: true
}
```
# License

  MIT
