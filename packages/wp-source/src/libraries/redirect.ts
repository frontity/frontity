import { getMatch } from "./get-match";
import WpSource from "../..";

export const redirect = (
  path: string,
  redirections: WpSource["libraries"]["source"]["redirections"]
) => {
  // sort redirections
  redirections.sort(({ priority: p1 }, { priority: p2 }) => p1 - p2);

  // apply redirections in order
  let lastPriority = 0;
  for (let redirect of redirections) {
    const match = getMatch(path, redirect);
    if (match && redirect.priority > lastPriority) {
      // update path
      lastPriority = redirect.priority;
      path = match.func(match.params);
    }
  }

  return path;
};
