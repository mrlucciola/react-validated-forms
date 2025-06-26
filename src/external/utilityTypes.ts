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
export type Asdf<T> = { [K in keyof T]-?: NonNullable<T[K]> };
