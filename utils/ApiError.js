class ApiError extends Error {
  constructor(code, message) {
    super();

    this.code = code;
    this.message = message;
  }

  static customError(message) {
    console.log('error here??')
    return new ApiError(500, message);
  }
}

module.exports = ApiError;