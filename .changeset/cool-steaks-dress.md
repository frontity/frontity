---
"frontity": patch
---

Improve the performance of the `decode` function. Now it works like this:

- It does a regexp to check if there are HTML entities.
- It does a partial replacement of common entities using the [`simple-entity-decode`](https://github.com/humanmade/simple-entity-decode) package.
- It does a new regexp check to see if there is any entity left.
- Finally, it does a full replacement of all entities using:
  - [`he`](https://www.npmjs.com/package/he) in the server, which works great but it is a [big library](https://bundlephobia.com/result?p=he@1.2.0) and therefore we don't want to include it in the client.
  - `DomParser` in the client, which is [safe to use](https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript/34064434#34064434).
