export type Tuple<N extends number, T> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

export type TypedString<
  T extends string,
  U extends string = string
> = T | (U & {})

