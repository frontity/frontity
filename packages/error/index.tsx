export class FrontityError extends Error {
  name = "FrontityError";

  constructor(message: string) {
    super(
      `${message}\n\nIf you have any doubts, join our community at https://community.frontity.org/.\n`
    );
  }
}
