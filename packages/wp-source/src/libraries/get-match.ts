import { Pattern } from "../../types";
import pathToRegexp, { Key } from "path-to-regexp";

type GetMatch = <T extends Pattern>(
  path: string,
  list: T[]
) => {
  params: Record<string, string>;
  func: T["func"];
  name: string;
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
      const regexp = pathToRegexp(pattern, keys);
      return { name, priority, pattern, regexp, keys, func };
    })
    .find(({ regexp }) => regexp.test(path));

  return result
    ? {
        func: result.func,
        params: execMatch(path, result),
        name: result.name
      }
    : null;
};
