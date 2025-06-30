import type { ChangeEvent } from "react";
import type { z } from "zod";
import type dayjs from "dayjs";
// local
import type { ZObj, ZObjOpt } from "@utils/rootTypes";

/** @deprecated change name to `OnChangeEventUnion` (from: `OnChangeEventUnionNew`); rescope to appropriate file */
export type OnChangeEventUnionNew =
  | { target?: Partial<ChangeEvent<HTMLInputElement>["target"]> }
  | (dayjs.Dayjs | null);

/** Derive the `catch` implementation of a schema. Applies a `catch` if not already provided. */
export type CatchFieldSchema<TField extends z.ZodTypeAny> = TField extends z.ZodCatch<infer _ICatch>
  ? TField
  : // If no catch, wrap in a catch
    z.ZodCatch<
      TField extends z.ZodDefault<infer _IDefault>
        ? TField
        : TField extends z.ZodNullable<infer _INullable>
        ? TField
        : // If not nullable, wrap in a nullable
          z.ZodNullable<TField>
    >;

/** Derive the **shape** of the provided Zod (object) schema's `catch` type (adding catches, nullability and/or defaults) */
export type CatchSchemaShape<TFs extends ZObj> = {
  [FieldKey in keyof TFs["shape"]]: CatchFieldSchema<TFs["shape"][FieldKey]>;
};

/** ### "User Input" Form Schema
 * Derive the schema applied to form fields.
 * The issue this addresses:
 * - Values used in the form components come from `.safeParse().data`
 * - If validation on a single field fails, all field values evaluate to `undefined`, since `.data` field from `.safeParse()` return is `undefined` on failed validation.
 * To address this, a second schema is derived from the true validation schema, which allows returns either the passed-in value or defaults.
 *
 * Prev: `SchemaFallback`, `AppliedFieldSchema` `UiForm-Schema`
 */
export type UiSchema<TFs extends ZObj> = z.ZodObject<CatchSchemaShape<TFs>>;
export type ExtSchema<TEs extends ZObjOpt> = TEs extends ZObj ? UiSchema<TEs> : undefined;
