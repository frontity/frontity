---
"@frontity/wp-source": patch
---

Remove the internal utility `verboseRegExp` as comment for verbose regexp were leaking into the bundle without being deleted. Verbose regexps are documented now with TSDocs.
