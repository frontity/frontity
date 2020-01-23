/**
 * Create a new type from a given one by removing a specific list of attributes.
 * @param T Original type.
 * @param K Attributes to remove.
 * @return Type with attributes removed.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Create a new type by merging two types.
 * The second type overrides those attributes that are present in the first one.
 * @param M First type.
 * @param N Second type.
 * @return Merged types.
 */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
