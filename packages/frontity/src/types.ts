export type TypeOfClassMethod<T, M extends keyof T> = T[M] extends (
  ...args: any
) => any
  ? T[M]
  : never;
