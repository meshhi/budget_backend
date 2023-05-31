class ApiError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }

  static authError(message) {
    return new ApiError(403, message);
  }

  static internalError(message) {
    return new ApiError(500, message);
  }

  static badRequest(message) {
    return new ApiError(404, message);
  }
}

module.exports = ApiError;