/**
 *
 *
 * @param M First type.
 * @param N - Second type.
 * @return Merged types.
 */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
