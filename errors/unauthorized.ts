import CustomAPIError from "./custom-api";

export default class UnauthorizedError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}