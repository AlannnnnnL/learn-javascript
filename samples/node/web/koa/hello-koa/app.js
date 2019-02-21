// const Koa = require('koa');

// const app = new Koa();

// app.use(async (ctx, next) => {
//     const start = new Date().getTime();
//     await next();
//     const ms = new Date().getTime() - start;
//     console.log(`${ctx.request.method} ${ctx.request.url}: ${ms}ms`);
//     ctx.response.set('X-Response-Time', `${ms}ms`);
// });

// app.use(async (ctx, next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });

// app.listen(3000);
// console.log('app started at port 3000...');

const Koa=require('koa');
const app=new Koa();
app.use(async (ctx, next) => {
    console.log('第一1');
    await next(); // 调用下一个middleware
    console.log('第一2');
});

app.use(async (ctx, next) => {
    console.log('第二1');
    await next(); // 调用下一个middleware
    console.log('第二2');
});

app.use(async (ctx, next) => {
    console.log('第三1');
    await next();
    console.log('第三2');
});
app.listen(3000);
console.log('app started at port 3000...');