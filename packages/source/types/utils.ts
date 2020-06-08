/**
 * Create a new type by merging two types.
 * The second type overrides those attributes that are present in the first one.
 * @param M First type.
 * @param N Second type.
 * @return Merged types.
 */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
