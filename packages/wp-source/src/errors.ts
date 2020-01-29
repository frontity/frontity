export class ServerError extends Error {
  public name = "ServerError";

  public status: number;
  public statusText: string;

  constructor(message = "", status: number, statusText: string) {
    super(message);
    this.message = message;
    this.status = status;
    this.statusText = statusText;
  }
}

export class FrontitySourceError extends Error {
  public name = "FrontitySourceError";

  constructor(message = "") {
    super(message);
    this.message = message;
  }
}
