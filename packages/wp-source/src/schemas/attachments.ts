import { schema } from 'normalizr';
import { author } from './authors';

export const attachment = new schema.Entity(
  'attachment',
  {
    _embedded: {
      author: [author],
    },
  },
  {
    processStrategy(entity) {
      const result = { ...entity };
      return result;
    },
  },
);

export const attachments = new schema.Array(attachment);
