---
"@frontity/source": minor
---

Rename `Taxonomy` to `Term` when it refers to [terms](https://developer.wordpress.org/reference/classes/wp_term/), and refactor entity types ([feature discussion](https://community.frontity.org/t/extend-sources-data-interface-with-types-from-new-handlers/1187/28)).

These changes were made:

- Alias `TaxonomyData` to `TermData`.
- Alias `isTaxonomy()` to `isTerm()`.
- Deprecate `data.isTaxonomy` and add `data.isTerm`.
- Rename `TaxonomyEntity` to `TermEntity`.
- Rename `TaxonomyType` to `TaxonomyEntity`.
- Also, rename `PostType` to `TypeEntity`.
