export class FrontityError extends Error {
  constructor(message: string) {
    super(
      `${message}\n\nIf you have any doubts, join our community at https://community.frontity.org/.\n`
    );
  }
}

// Add the `name` property to the class prototype.
FrontityError.prototype.name = "FrontityError";
