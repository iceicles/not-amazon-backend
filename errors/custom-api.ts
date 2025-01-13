export default class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // This ensures the name is set correctly
   
  }
}
