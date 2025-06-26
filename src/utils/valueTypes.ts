import type { z } from "zod";
//
import type { ZObj, ZObjOpt } from "@utils/rootTypes";
import type { UiSchema } from "@utils/schemaTypes";

/** "User-Input"/"Form Values" output
 * The type used to the output fields within `form` and getFieldProps('...').
 * The object that contains these values should always exist,
 *   as validation applied with the fallback schema (via `parse`/`safeParse`)
 *   should never fail. This is due to applying a `.catch()` to each field.
 *
 * Without the fallback, `.parse()`/`.safeParse()` would return `{ data: undefined }`/throw an error,
 *    which would break the application wherever it is used - due to accessing a property of an object that does not exist.
 *
 * With the fallback schema, invalid fields will return the value applied to the `.catch()`.
 *
 * Prev: `AppliedField-Output`renamed to `UiFormOutput`
 */
export type UiValues<TFs extends ZObj = ZObj> = z.output<UiSchema<TFs>>;

/** "External Values" output */
export type ExtValues<TEs extends ZObjOpt = ZObjOpt> = [TEs] extends [ZObj]
  ? UiValues<NonNullable<TEs>>
  : never;
