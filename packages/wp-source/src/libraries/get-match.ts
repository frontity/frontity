import { Pattern } from "../../types";
import pathToRegexp, { Key, regexpToFunction } from "path-to-regexp";

type GetMatch = <T extends Pattern>(
  path: string,
  list: T[]
) => {
  params: Record<string, string>;
  func: T["func"];
  name: string;
  pattern: string;
} | null;

type ExecMatch = (
  path: string,
  match: { regexp: RegExp; keys: Key[] }
) => Record<string, string>;

export const execMatch: ExecMatch = (path, { regexp, keys }) =>
  path
    .match(regexp)
    .slice(1)
    .reduce((result, value, index) => {
      result[keys[index].name] = value;
      return result;
    }, {});

export const getMatch: GetMatch = (path, list) => {
  const result = list
    .sort(({ priority: p1 }, { priority: p2 }) => p1 - p2)
    .map(({ name, priority, pattern, func }) => {
      const keys = [];
      const regexp = pattern.startsWith("RegExp:")
        ? new RegExp(pattern.replace("RegExp:", ""))
        : pathToRegexp(pattern, keys, { endsWith: "?" });
      return { name, priority, pattern, regexp, keys, func };
    })
    .find(({ regexp }) => {
      return regexp.test(path);
    });

  return result
    ? {
        func: result.func,
        params: result.pattern.startsWith("RegExp:")
          ? result.regexp.exec(path).groups
          : execMatch(path, result),
        name: result.name,
        pattern: result.pattern,
      }
    : null;
};
