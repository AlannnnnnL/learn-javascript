const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
app.use(bodyParser());

app.use(controller());
app.listen(3000);
console.log('app started at port 3000...');