const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

// user
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  gender: {
    type: DECIMAL,
    allowNull: true,
    comment: '性别(1.男性，2.女性，3.保密)'
  },
  picture: {
    type: STRING,
    allowNull: true,
  }
})

module.exports = User;