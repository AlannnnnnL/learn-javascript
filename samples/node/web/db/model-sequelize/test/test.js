const model = require('./model');

let 
  Pet = model.Pet,
  User = model.User;

(async () => {
  let user = await User.create({
    name: 'John',
    gender: false,
    email: 'john-' + Date.now() + '@garfield.pet',
    passwd: '666666'
  });
})();