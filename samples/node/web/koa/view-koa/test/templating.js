const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  let 
    autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path || 'views', {
        noCache,
        watch
      }), {
        autoescape,
        throwOnUndefined
      }
    );
  if (opts.filters) {
    for (let f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

module.exports = createEnv;