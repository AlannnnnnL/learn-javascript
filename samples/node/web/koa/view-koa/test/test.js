const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const isProduction = process.env.NODE_ENV === 'production';
const controller = require('./controller');

// 注意以下middleware的顺序，虽然是异步，但是什么时候开始执行需要注意

// 记录URL以及页面执行时间：
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  let 
    start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
})

// 处理静态文件：
if (!isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

// 解析POST请求：
app.use(bodyParser());

// 下面这块给ctx实例上绑定render函数，与教程不同：
// 负责给ctx加上render()来使用Nunjucks：
let templating = require('./templating');
let env = templating('views', {
  noCache: !isProduction,
  watch: !isProduction
});
// app.context是ctx的原型
app.context.render = async (view, model, ctx) => { 
  ctx.response.body= env.render(view, Object.assign({}, ctx.state || {}, model || {})); 
  ctx.response.type = "text/html";
}

// 处理URL路由：
app.use(controller());

app.listen(3000);