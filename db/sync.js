const seq = require('./seq');

require('./model/index')

seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('err')
})

// 执行同步, 每次重新建表为true
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit();
})