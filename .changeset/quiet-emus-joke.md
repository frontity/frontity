---
"@frontity/html2react": patch
---

Fix `Processor` type so TypeScript doesn't complain when a processor returns `null`, which is how nodes are removed.
