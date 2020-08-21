---
"@frontity/core": patch
"frontity": patch
---

Deprecate the `--publicPath` CLI arg of the `npx frontity dev` and `npx frontity build` commands in favor of `--public-path` to be consistent with the rest of the arguments.

It also adds a log to those commands, along with the already existing `mode` and `target` logs.
