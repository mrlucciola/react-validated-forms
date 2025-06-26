import { z } from "zod";
import { isDayjs } from "dayjs";
// interfaces
import type { ZObj } from "@utils/rootTypes";
import type {
  CatchFieldSchema,
  CatchSchemaShape,
  OnChangeEventUnionNew,
  UiSchema,
} from "@utils/schemaTypes";

const getFieldDefaultValue = <TVal, TField extends z.ZodType<TVal>, TInput>(
  origFieldSchema: TInput extends z.ZodDefault<TField> ? z.ZodDefault<TField> : TField
): TField extends z.ZodDefault<infer U> ? U : null =>
  (origFieldSchema instanceof z.ZodDefault
    ? origFieldSchema._def.defaultValue()
    : null) as TField extends z.ZodDefault<infer U> ? U : null;

/**
 * - If field already has a catch, early exit
 * - If field has a default, add `catch(defaultValue)`
 * - If field has no default (`getFieldDefaultValue` returns `null`), add null-catch
 *
 * @todo Type accurately and simplify types
 */
const getFieldCatchSchema = <
  TFieldSchema extends z.ZodTypeAny,
  TCatch extends CatchFieldSchema<TFieldSchema>
>(
  origFieldSchema: TFieldSchema
) => {
  if (origFieldSchema instanceof z.ZodCatch) return origFieldSchema as TCatch;
  if (origFieldSchema instanceof z.ZodDefault)
    return origFieldSchema.catch(getFieldDefaultValue(origFieldSchema)) as TCatch;
  return origFieldSchema.nullable().catch(null) as TCatch;
};

/** Inspired by this [StackOverflow answer](https://stackoverflow.com/a/77720528) */
export const buildDefaultSchema = <TOrigSchema extends ZObj>(
  schema: TOrigSchema
): UiSchema<TOrigSchema> => {
  type FieldKey = keyof CatchSchemaShape<TOrigSchema>;

  const schemaFields = Object.entries(schema.shape) as [FieldKey, TOrigSchema["shape"][FieldKey]][];

  const newProps = schemaFields.reduce((acc, [key, field]) => {
    acc[key] = getFieldCatchSchema(field);
    return acc;
  }, {} as CatchSchemaShape<TOrigSchema>);

  return z.object(newProps);
};

export const getValueFromEvent = (e: OnChangeEventUnionNew, args?: (boolean | unknown)[]) => {
  // @note Handle event-type from `MuiDatePicker.onChange()`, or 'nullish' events. If `undefined`, convert to `null`.
  if (e === null || e === undefined || isDayjs(e)) return e ?? null;

  // @note Handle event-type from `MuiCheckBox.onChange()`.
  if (args && args.length > 0 && typeof args[0] === "boolean") return args[0];

  return e.target?.value ?? null;
};
