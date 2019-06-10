import { Handler } from "../../";
import pathToRegexp, { Key } from "path-to-regexp";

class Resolver {
  private handlers: Pattern<Handler>[] = [];

  private redirects: Pattern<(params: Record<string, string>) => string>[] = [];

  init(this: Resolver) {
    this.handlers = [];
    this.redirects = [];
  }

  // Adds a handler to handlers
  addHandler(
    this: Resolver,
    { pattern, handler }: { pattern: string; handler: Handler }
  ): void {
    const keys = [];
    const regexp = pathToRegexp(pattern, keys);
    this.handlers.push({ pattern, regexp, keys, func: handler });
  }

  // Adds a redirect to redirects
  addRedirect(
    this: Resolver,
    {
      pattern,
      redirect
    }: {
      pattern: string;
      redirect: (params: Record<string, any>) => string;
    }
  ): void {
    const keys = [];
    const regexp = pathToRegexp(pattern, keys);
    this.redirects.push({ pattern, regexp, keys, func: redirect });
  }

  // redirects a path to a different one
  redirect(this: Resolver, path: string): string {
    const match = getMatch(path, this.redirects);
    if (!match) return path;

    const params = execMatch(path, match);
    return match.func(params);
  }

  // Gets the appropriate handler and params after a match
  match(
    this: Resolver,
    path: string
  ): { handler: Handler; params: Record<string, string> } | null {
    path = this.redirects.length ? this.redirect(path) : path;

    const found = getMatch(path, this.handlers);
    if (!found) return null;

    return {
      handler: found.func,
      params: execMatch(path, found)
    };
  }
}

export default Resolver;

// Utils

type Pattern<Func extends Function = (...args: any[]) => any> = {
  pattern: string;
  regexp: RegExp;
  keys: Key[];
  func: Func;
};

type GetMatch = <T extends Pattern>(path: string, list: T[]) => T;

type ExecMatch = (path: string, match: Pattern) => Record<string, string>;

const getMatch: GetMatch = (path, list) =>
  list.find(({ regexp }) => regexp.test(path));

const execMatch: ExecMatch = (path, { regexp, keys }) =>
  path
    .match(regexp)
    .slice(1)
    .reduce((result, value, index) => {
      result[keys[index].name] = value;
      return result;
    }, {});
