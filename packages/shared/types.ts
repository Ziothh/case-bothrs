export namespace DottedRecord {
  export namespace Path {
    type PathImpl<T, K extends keyof T> =
      K extends string
      ? T[K] extends Record<string, any>
      ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
      : K
      : never;


    /** Get the dotted keys of a (deeply nested) record `T` */
    export type keys<T> = PathImpl<T, keyof T> | keyof T;

    /** Get the value by the dotted key (`K`) of the (deeply nested) record `T` */
    export type getValue<T, K extends DottedRecord.Path.keys<T>> =
      K extends `${infer K}.${infer Rest}`
      ? K extends keyof T
      ? Rest extends DottedRecord.Path.keys<T[K]>
      ? DottedRecord.Path.getValue<T[K], Rest>
      : never
      : never
      : K extends keyof T
      ? T[K]
      : never;
  }


  /** Allowed key values of a dotted record */
  type KeyValue = string | number | boolean | null

  /** Flatten the given (nested) record `T` into a dotted record */
  export type fromRecord<T> = {
    [
    K in DottedRecord.Path.keys<T> as DottedRecord.Path.getValue<T, K> extends KeyValue
    ? K
    : never
    ]: DottedRecord.Path.getValue<T, K>
  }
}
