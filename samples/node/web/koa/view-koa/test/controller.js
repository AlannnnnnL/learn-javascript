const fs = require('fs');

function addMapping(router, mapping) {
  mapping.forEach(v => {
    switch(v.method) {
      case 'GET':
        router.get(v.path, v.func);
        console.log(`register URL mapping: GET ${v.path}`);
        break;
      case 'POST':
        router.post(v.path, v.func);
        console.log(`register URL mapping: POST ${v.path}`);
        break;
      default:
        console.log(`invalid URL: ${v.method} ${v.path}`);
    }
  })
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter((f) => {
    return f.endsWith('.js');
  }).forEach(f => {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping);
  });
}

module.exports = function (dir) {
  let
    controllers_dir = dir || 'controllers',
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
}