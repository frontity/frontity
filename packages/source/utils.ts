export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
