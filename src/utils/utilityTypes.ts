import { Dispatch, SetStateAction } from "react";

/** If no fields are provided, make all fields nullable */
export type Nullable<T, U extends keyof T = keyof T> = Omit<T, U> & {
  [P in keyof Pick<T, U>]: Pick<T, U>[P] | null;
};

/** Convert field(s) to nullish - `null`/`undefined`
 * If no fields are provided, make all fields nullish
 */
export type Nullish<T, U extends keyof T = keyof T> = Omit<T, U> & {
  [P in keyof Pick<T, U>]?: Pick<T, U>[P] | null | undefined;
};

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];
export type OmitOptionalKeys<T> = Omit<T, OptionalKeys<T>>;

export type PartialOrOmit<T, U> = T extends undefined
  ? {}
  : T extends unknown
  ? Partial<U>
  : NonNullable<U>;

/**
 * type Example1 = OmitPartialParams<[form: string, externalValues?: undefined]>;
 * // Result: [form: string]
 *
 * type Example2 = OmitPartialParams<[externalValues?: undefined]>;
 * // Result: []
 *
 * type Example3 = OmitPartialParams<[a: number, b?: string, c?: undefined, d: boolean]>;
 * // Result: [a: number, d: boolean]
 */
export type OmitPartialParams<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? undefined extends Head
    ? OmitPartialParams<Tail>
    : [Head, ...OmitPartialParams<Tail>]
  : [];

/** Remove keys whose (non-nullable) type is `void`
 * and make every remaining key required with the `undefined` stripped out of its type.
 *
 * 1. Iter through every `key in T`
 * 2. If the value type is `void | undefined`:
 *     - Erase the key (`never`);
 * 3. Else:
 *     - Keep the key (`-?`), and;
 *     - Remove `undefined` from its type;
 */
export type ResolvePartial<T> = {
  [K in keyof T as [NonNullable<T[K]>] extends [void] // `void | undefined` ?
    ? never // Drop the key
    : K]-?: NonNullable<T[K]>; // Keep the key/make it `Required`/Strip `undefined`
};
