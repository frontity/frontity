---
"@frontity/amp": minor
---

Add the first version of html2react processors that are necessary for the AMP
package. The processors created include:

1. Processors to substitute an element `x` with its AMP `amp-x` equivalent:

- iframe
- img
- audio
- video

2. Processors for embeds:

- youtube
- twitter

3. Processors that remove some HTML tags and/or it's HTML tag attributes & properties
   that are disallowed in an AMP page
