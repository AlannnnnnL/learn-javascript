const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new koa();
app.use(bodyParser());

app.use(async (ctx, next) => {
  // console.log(`Process ${ctx.request.method} ${ctx.request.url} ...`);
  await next();
});

router.get('/', async(ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
    <form action='/signin' method='post'>
      <p>Name: <input name='name' value='koa'></p>
      <p>Password: <input name='password' type='password'></p>
      <p><input type='submit' value='Submit'></p>
    </form>`;
});

router.post('/signin', async(ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, ${typeof name}, password: ${password}, ${typeof password}`);
  if (name === 'koa' && password === '123456') {
    ctx.response.body = `<h1>Welcome, ${name}</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
    <p><a href='/'>Try again</a></p>`;
  }
})

router.get('/hello/:name', async(ctx, next) => {
  let name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/param', async(ctx, next) => {
  // query中可直接拿到解析好的参数
  console.log(ctx.query.name);
  let name = ctx.query.name ? ctx.query.name : '';
  ctx.response.body = `<h1>Hello ${name}!</h1>`;
})

app.use(router.routes());
app.listen(3000);

console.log('app started at port 3000...');