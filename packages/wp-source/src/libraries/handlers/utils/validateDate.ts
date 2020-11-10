import { ServerError } from "@frontity/source";

/**
 * Check if a given year is a leap year.
 *
 * @param year - Year as integer.
 *
 * @returns If the year is a leap year.
 */
function isLeapYear(year: number) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

/**
 * Check that the given combination of year, month & day is valid.
 *
 * @param year - Year as integer.
 * @param month - Month of the year as integer (should start with 1).
 * @param day - Day of the month as integer (should start with 1).
 */
function validateDate(year: number, month: number, day: number) {
  // This is just an arbitrary sanity check.
  // We ll generously assume that frontity will continue to exist for a hundred years 😅
  if (year < 1900 || year > 2100) {
    throw new ServerError(`${year} is a wrong year number`, 404);
  }

  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) {
    monthDays[1] = 29;
  }

  if (typeof month === "number" && (month < 1 || month > 12)) {
    throw new ServerError(`${month} is a wrong month number`, 404);
  }
  if (typeof day === "number" && (day < 1 || day > monthDays[month - 1])) {
    throw new ServerError(`${day} is a wrong day number`, 404);
  }
}

export default validateDate;
