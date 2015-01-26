var fs = require('co-fs');
var path = require('path');
var cheerio = require('cheerio');

module.exports = function (settings) {
  settings = settings || {};
  settings.root = settings.root || __dirname;
  settings.ext = settings.ext || '.html';

  function *render(view, opts) {
    var view = path.join(settings.root, view + settings.ext);
    var text = yield fs.readFile(view, 'utf8');
    this.$ = cheerio.load(text, opts);
    return this.$;
  }

  return function *cheerio(next) {
    this.render = render;
    yield next;
    if (this.$) {
      this.body = this.$.html();
      this.type = 'html';
    }
  }
};