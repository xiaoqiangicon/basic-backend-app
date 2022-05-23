const router = require('koa-router')();
const { register, login, delUser, changeInfo } = require('../../controller/user');


router.prefix('/api/user');

router.post('/register', async (ctx, next) => {
  const {  userName, password } = ctx.request.body;

  // controller
  ctx.body = await register({userName, password});
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;

  // controller
  ctx.body = await login(ctx, userName, password);
})

router.post('/delUser', async function(ctx, next) {
  const { userName, password } = ctx.request.body;

  // controller 
  ctx.body = await delUser(ctx, userName, password)
})


// 修改个人信息
router.patch('/changeInfo', async(ctx, next) => {
  const { newUserName, gender, picture } = ctx.request.body;

  ctx.body = await changeInfo(ctx, { newUserName, gender, picture })
})

module.exports = router;