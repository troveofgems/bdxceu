export class ErrorResponse extends Error {
  constructor(message, statusCode, received) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.received = received || null;
  }
}
