const fs = require('fs');

function addControllers(router, dir) {
  console.log(`当前目录: ${__dirname}`);
  let files = fs.readdirSync(__dirname + '/' + dir);
  let js_files = files.filter((f) => {
    return f.endsWith('.js');
  });
  
  for(let f of js_files) {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + '/' + dir + '/' + f);
    addMapping(router, mapping);
  };
};

function addMapping(router, mapping) {
  mapping.forEach(v => {
    switch(v.method){
      case 'GET':
        router.get(v.path, v.func);
        console.log(`register URL mapping: GET ${v.path}`);
        return;
      case 'POST':
        router.post(v.path, v.func);
        console.log(`register URL mapping: POST ${v.path}`);
        return;
      default:
        console.log(`invalid URL: ${v.method} ${v.path}`);
        return;
    }
  });
};

module.exports = function (dir) {
  let controllers_dir = dir || 'controllers';
  let router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
}