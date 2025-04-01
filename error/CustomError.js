class CustomError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static Error404(message = "Sorry page not available") {
    return new CustomError(404, message);
  }
  static invalidInput(message = "Invalid Input") {
    return new CustomError(400, message);
  }
  static unauthorized(message = "unauthorized user") {
    return new CustomError(401, message);
  }
}
module.exports = CustomError;
