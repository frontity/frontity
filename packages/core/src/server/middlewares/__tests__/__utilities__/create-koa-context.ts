/**
 * Creates a store with an object.
 *
 * @param extended - The optional extended object.
 *
 * @returns A store object.
 */
const createStore = (extended = {}) => ({
  libraries: {
    frontity: {
      ...extended,
    },
  },
});

/**
 * Creates a Koa-like context object.
 *
 * @param extended - The store data.
 *
 * @returns The Koa-like context.
 */
export const createKoaContext = (extended?: any) => ({
  state: {
    store: createStore(extended),
  },
});
