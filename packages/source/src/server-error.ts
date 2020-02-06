export class ServerError extends Error {
  public name = "ServerError";

  public status: number;
  public statusText: string;

  constructor(message = "", status: number, statusText: string = message) {
    super(message);
    this.message = message;
    this.status = status;
    this.statusText = statusText;
  }
}
