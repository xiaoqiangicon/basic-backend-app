const { getUserInfo, createUser, deleteUser, updateUser } = require('../service/user');
const { ErrorModel, SuccessModel } = require('../model/ResModel');
const { doCrypto } = require( '../utils/cryp' );

async function register({ userName, password }) {
  const userInfo = await getUserInfo(userName);

  // 已存在
  if (userInfo) {
    return new ErrorModel({message: '用户名已存在'});
  }

  // 注册
  try {
    await createUser({ userName, password: doCrypto(password) });
    return new SuccessModel({});
  } catch(ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel({ message: ex.message })
  }
}

async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password));

  // 找不到这个人
  if (!userInfo) {
    return new ErrorModel({ message: '用户不存在' });
  }

  // 登陆成功
  if (ctx.session.userInfo === null) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel({data: ctx.session.userInfo})
}

async function delUser (ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password));

  // 找不到这个人
  if (!userInfo) {
    return new ErrorModel({ message: '用户不存在' });
  }
  // 删除
  await deleteUser(userName)
  return new SuccessModel({data: '删除成功'})
}

async function changeInfo(ctx, { newUserName, gender, picture }) {
  const {userName} = ctx.session.userInfo;

  const result = await updateUser({newUserName: newUserName, newGender: gender, newPicture: picture}, {userName})

  if (result) {
    // 修改成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel({});
  }

  return new ErrorModel({message: '修改失败'})
}

module.exports = {
  register,
  login,
  delUser,
  changeInfo,
}