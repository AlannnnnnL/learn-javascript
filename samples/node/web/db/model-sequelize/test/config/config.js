const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');


// 如果是测试环境，就读取config-test.js
// 如果不是测试环境，先读取config-default.js；如果config-override.js文件存在，就读取，否则就忽略。
let config = null;
if (process.env.NODE_ENV === 'test') {
  console.log(`Load ${testConfig}...`);
  config = require(testConfig);
} else {
  console.log(`Load ${defaultConfig}...`);
  config = require(defaultConfig);
  try {
    if (fs.statSync('./test/config/config-override.js').isFile()) {
      console.log(`Load ${overrideConfig}...`);
      config = Object.assign(config, require(overrideConfig));
    }
  } catch (error) {
    console.log(`Cannot load ${overrideConfig}.`);
    console.log(error);
  }
}

module.exports = config;
