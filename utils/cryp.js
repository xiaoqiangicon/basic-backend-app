const crypto = require('crypto');

const SECRETE_KEY = 'cryptokey'

function md5(content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

function doCrypto(content) {
  const str = `password=${content}`
  return md5(str);
}

module.exports = {
  doCrypto,
}