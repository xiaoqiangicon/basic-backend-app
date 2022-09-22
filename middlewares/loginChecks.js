const { ErrorModel } = require("../model/ResModel");

async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next();
    return;
  }

  ctx.body = new ErrorModel({message: '未登陆'})
}

async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next();
    return;
  }
  // 未登录跳到登陆
  const curUrl = ctx.url;
  ctx.redirect('/')
}

module.exports = {
  loginCheck,
  loginRedirect,
}