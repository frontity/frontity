import { Handler } from "../../";
import pathToRegexp, { Key } from "path-to-regexp";

class Resolver {
  private handlers: Pattern<Handler>[] = [];
  private redirects: Pattern<Redirect>[] = [];

  init(this: Resolver) {
    this.handlers = [];
    this.redirects = [];
  }

  // Adds a handler to handlers
  addHandler(
    this: Resolver,
    props: { name: string; priority: number; pattern: string; func: Handler }
  ): void {
    add<Handler>(this.handlers, props);
  }

  // Adds a redirect to redirects
  addRedirect(
    this: Resolver,
    props: { name: string; priority: number; pattern: string; func: Redirect }
  ): void {
    add<Redirect>(this.redirects, props);
  }

  // Removes a handler from handlers
  removeHandler(this: Resolver, props: { name: string }): void {
    remove(this.handlers, props);
  }

  // Removes a redirect from redirects
  removeRedirect(this: Resolver, props: { name: string }): void {
    remove(this.redirects, props);
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

// Types

type Redirect = (params: Record<string, string>) => string;

type Pattern<Func extends Function = (...args: any[]) => any> = {
  name: string;
  priority: number;
  pattern: string;
  regexp: RegExp;
  keys: Key[];
  func: Func;
};

type Add = <F extends Function>(
  list: Pattern<F>[],
  props: { name: string; priority: number; pattern: string; func: F }
) => void;

type Remove = (list: Pattern[], props: { name: string }) => void;

type GetMatch = <T extends Pattern>(path: string, list: T[]) => T;

type ExecMatch = (path: string, match: Pattern) => Record<string, string>;

// Functions

const add: Add = (list, props) => {
  const { name, priority, pattern, func } = props;
  const keys = [];
  const regexp = pathToRegexp(pattern, keys);
  list.push({ name, priority, pattern, regexp, keys, func });
  list.sort(({ priority: p1 }, { priority: p2 }) => p1 - p2);
};

const remove: Remove = (list, props) => {
  const index = list.findIndex(({ name }) => props.name === name);
  list.splice(index, 1);
};

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
