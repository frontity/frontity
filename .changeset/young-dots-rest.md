---
"@frontity/wp-source": patch
---

Add a performance improvement for a postType handler.

Until now, we were fetching the data serially in the postType handler for each
of `post`, `page` and `media` endpoints. With this improvement, the data is
loaded and processed in parallel for all 3 endpoints.
