import type { ChangeEvent } from "react";
import type { z } from "zod";
import type dayjs from "dayjs";
import type { EvSchema, ZFormSchema, ZObj } from "@utils/schemaTypes";

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
export type CatchSchemaShape<TSchema extends ZFormSchema> = {
  [FieldKey in keyof TSchema["shape"]]: CatchFieldSchema<TSchema["shape"][FieldKey]>;
};

/** ### "User Input" Form Schema
 * Derive the schema applied to form fields.
 * The issue this addresses:
 * - Values used in the form components come from `.safeParse().data`
 * - If validation on a single field fails, all field values evaluate to `undefined`, since `.data` field from `.safeParse()` return is `undefined` on failed validation.
 * To address this, a second schema is derived from the true validation schema, which allows returns either the passed-in value or defaults.
 *
 * Prev: `SchemaFallback`, `AppliedFieldSchema`
 */
export type UiFormSchema<TSchema extends ZFormSchema> = z.ZodObject<CatchSchemaShape<TSchema>>;

/** @deprecated renamed to `UiFormSchema` */
export type AppliedFieldSchema<TSchema extends ZFormSchema> = UiFormSchema<TSchema>;

/** The type used to the output fields within `form` and getFieldProps('...').
 * The object that contains these values should always exist,
 *   as validation applied with the fallback schema (via `parse`/`safeParse`)
 *   should never fail. This is due to applying a `.catch()` to each field.
 *
 * Without the fallback, `.parse()`/`.safeParse()` would return `{ data: undefined }`/throw an error,
 *    which would break the application wherever it is used - due to accessing a property of an object that does not exist.
 *
 * With the fallback schema, invalid fields will return the value applied to the `.catch()`.
 *
 * @deprecated renamed to `UiFormOutput`
 */
export type AppliedFieldOutput<TFormSchema extends ZFormSchema> = z.output<
  UiFormSchema<TFormSchema>
>;

/** @deprecated rename to `UiFormOutputOptional` - potentially remove */
export type OptionalAppliedFieldOutput<TEvSchema extends EvSchema> = TEvSchema extends ZObj
  ? AppliedFieldOutput<NonNullable<TEvSchema>>
  : undefined;
