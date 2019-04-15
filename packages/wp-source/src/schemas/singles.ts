/* eslint-disable no-underscore-dangle */
import { schema } from 'normalizr';
import { taxonomy } from './taxonomies';
import { author } from './authors';
import { attachment } from './attachments';

const taxonomies = new schema.Array(new schema.Array(taxonomy));

export const single = new schema.Entity(
  'single',
  {},
  {
    processStrategy(entity) {
      const result = { ...entity };

      if (entity._embedded) {
        // Get all taxonomies and generate a map so we can know later on which props
        // are actually taxonomies.
        if (entity._embedded['wp:term']) {
          result.taxonomiesMap = {};
          entity._embedded['wp:term'].forEach(term =>
            term.forEach(item => {
              const type = item.taxonomy === 'post_tag' ? 'tag' : item.taxonomy;
              result.taxonomiesMap[type] = result.taxonomiesMap[type] || [];
              result.taxonomiesMap[type].push(item.id);
            }),
          );
        }
      }
      return result;
    },
  },
);

single.define({
  _embedded: {
    author: [author],
    'wp:featuredmedia': [attachment],
    'wp:contentmedia': [[attachment]],
    'wp:term': taxonomies,
  },
});

export const singles = new schema.Array(single);
