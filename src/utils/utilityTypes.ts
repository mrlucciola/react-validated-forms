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

export type ResolveFor<T, Expected> = [T] extends [Expected] ? T : never;
export type ResolveTo<T, Out> = [T] extends [void] ? never : Out;

export type ResolveProp<T, FieldName extends string> = [T] extends [void]
  ? {}
  : [void] extends [T]
  ? { [k in FieldName]?: T }
  : { [k in FieldName]: NonNullable<T> };
