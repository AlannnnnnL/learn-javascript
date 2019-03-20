module.exports = [
  {
    method: 'POST',
    path: '/signin',
    func: async (ctx, next) => {
      let 
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
      if (email === 'admin@example.com' && password === '123456') {
        // 登录成功
        ctx.render('signin-ok.html', {
          title: 'Sign In OK',
          name: 'Mr. Node'
        }, ctx);
      } else {
        // 登录失败
        ctx.render('signin-failed.html', {
          title: 'Sign In Failed'
        }, ctx);
      }
    }
  }
]