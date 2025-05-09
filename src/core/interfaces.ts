import type { z } from "zod";
// interfaces
import type { ZObj } from "../fieldConfig/interfaces";
import type { AppliedFieldOutput } from "../interfaces";
import type { AnyFormCfgObj } from "../fieldConfig/returnTypes";
import type { FormConfigCbReturnInferred } from "../fieldConfig/callbacks";

/** Same as FormOut<TSchema> */
export type UserInputFormFields<TBaseSchema extends ZObj> = AppliedFieldOutput<TBaseSchema>;

/** The error-object type from an object schema's `safeParse`. */
export type SchemaParseErrors<TSchema extends ZObj> = z.typeToFlattenedError<
  z.input<TSchema>,
  string | undefined
>["fieldErrors"];

/** Convenience-type to correct issues in zod impl */
export type SchemaSpaReturn<TSchema extends ZObj> = z.SafeParseReturnType<
  z.input<TSchema>,
  z.output<TSchema>
>;

export type FormConfigProp<TSchema extends ZObj> =
  | AnyFormCfgObj<AppliedFieldOutput<TSchema>>
  | undefined;

export type FormConfigValues<
  TConfig extends FormConfigProp<TSchema>,
  TSchema extends ZObj
> = TConfig extends NonNullable<FormConfigProp<ZObj>>
  ? FormConfigCbReturnInferred<NonNullable<TConfig>>
  : undefined;
