---
"@frontity/core": patch
---

Don't embed fonts so big because they have an impact on LightHouse performance score. I have reduced the limit from 25Kbs to 8Kbs, which seems to be the recommendation in Webpack.
