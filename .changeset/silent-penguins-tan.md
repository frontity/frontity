---
"@frontity/source": minor
"@frontity/wp-source": minor
---

We have made easier to work with searches and pagination by adding this new properties to the data object returned by `state.source.get(someLink)`:

In all entities:

- `data.link`: the link (short for permalink).
- `data.page`: the page number.
- `data.route`: the link without the pagination part.

In archives:

- `data.next`: the link of the next page in an archive.
- `data.previous`: the link of the previous page in an archive.

In searches:

- `data.isSearch`: true for links that are searches.
- `data.searchQuery`: the value of the search.
