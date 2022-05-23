const { User } = require('../db/model/index');
const { formateUser } = require('./_format');

// 查询用户
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  // 查询
  const result =  await User.findOne({
    attributes: ['id', 'userName', 'password', 'gender', 'picture',],
    where: whereOpt,
  })
  if (result === null) {
    // 未找到
    return result;
  }

  // 格式化
  const formatRes = formateUser(result.dataValues)

  return formatRes;
}

// 创建用户
async function createUser({ userName, password }) {
  const result = await User.create({
    userName,
    password,
  })

  return result.dataValues;
}


// 删除用户
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName,
    }
  })

  return result > 0;
}

async function updateUser({newPassword, newUserName, newPicture, newGender}, {userName, password}) {
  const updateData = {};
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newUserName) {
    updateData.userName = newUserName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newGender) {
    updateData.gender = newGender
  }

  // 拼接查询条件
  const whereData = {
    userName,
  }
  if (password) {
    whereData.password = password
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  })

  return result[0]
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
}