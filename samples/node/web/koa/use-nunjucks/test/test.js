const nunjucks = require('nunjucks');
const koa = require('koa');
const router = require('koa-router')();
const app = new koa();

function createEnv(path, opts) {
  let autoescape = opts.autoescape === undefined ? true : opts.autoescape;
  let noCache = opts.noCache || false;
  let watch = opts.watch || false;
  let throwOnUndefined = opts.throwOnUndefined || false;
  let env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path, {
      noCache: noCache,
      watch: watch
    }), {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined
    });
  if (opts.filters) {
    for (let f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

let env = createEnv('test/views', {
  watch: true,
  filters: {
    hex: function(n) {
      return '0x' + n.toString(16);
    }
  }
});

let s = env.render('extend.html', {header: 'Hello', body: 'bla bla bla...'});

router.get('/', async (ctx, next) => {
  ctx.response.body = s;
});

app.use(router.routes());
app.listen(3000);
console.log('started....');