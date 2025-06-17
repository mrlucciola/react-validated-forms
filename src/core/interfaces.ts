import type { z } from "zod";
// interfaces
import type { AppliedFieldOutput, ZObj } from "@utils/index";
import type { AnyFormCfgObj, FormConfigCbReturnInferred } from "@configDsl/formConfigValueTypes";

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
