const Sequelize = require('sequelize');
const config = require('./config');

// 创建一个sequelize对象实例：
let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

// 定义模型Pet，告诉Sequelize如何映射数据库表：
let Pet = sequelize.define('pets', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN,
  birth: Sequelize.STRING(10),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT,
  version: Sequelize.BIGINT
}, {
  timestamps: false
});

// 业务数据
let now = Date.now();

// 添加数据
// 方式一：添加一个pet
Pet.create({
  id: 'g-' + now,
  name: 'Alan',
  gender: false,
  birth: '2000-01-01',
  createdAt: now,
  updatedAt: now,
  version: 0
}).then(function (p) {
  console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
  console.log('failed: ' + err);
});

// 方式二：添加一个pet
(async () => {
  let dog = await Pet.create({
    id: 'd-' + now,
    name: 'Tony',
    gender: false,
    birth: '2002-02-02',
    createdAt: now,
    updatedAt: now,
    version: 0
  });
  console.log('created: ' + JSON.stringify(dog));
})();

// 查询数据
(async () => {
  let pets = await Pet.findAll({
    where: {
      name: 'Alan'
    }
  });
  console.log(`find ${pets.length} pets:`);
  for (let p of pets) {
    console.log(JSON.stringify(p));
    console.log('update pet...');

    // 更新数据
    p.gender = true;
    p.updatedAt = Date.now();
    p.version ++ ;
    await p.save();
    if (p.version === 3) {
      
      // 删除数据
      await p.destroy();
      console.log(`${p.name} was destroyed.`);
    }
  }
})();