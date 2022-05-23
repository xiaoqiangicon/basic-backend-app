/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE } = require('../conf/constant');


/**
 * 用户默认头像
 * @param {Object} obj 
 * @returns 
 */
function _formateUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

function formateUser(list) {
  if (list == null) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formateUserPicture)
  }

  // 单个对象
  return _formateUserPicture(list);
}

module.exports = {
  formateUser,
}