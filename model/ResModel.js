class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor({data = {}, message = 'success'}) {
    super({ errno: 0, data, message })
  }
}

class ErrorModel extends BaseModel {
  constructor({data = {}, message = ''}) {
    super({ errno: -1, data, message })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
}