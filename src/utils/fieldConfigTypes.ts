import type { z } from "zod";
//
import type { Nullish } from "@utils/utilityTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { ExtValues, UiValues } from "@utils/valueTypes";

type DefineConfigValues<TFs extends ZObj, TEs extends ZObjOpt> = {
  // type DefineConfigValues<TFs extends ZObj, TEs extends ZObjOpt, TCv extends CalcValuesOpt> = {
  form: UiValues<TFs>;
  external?: ExtValues<TEs>;
  // calculated?: TCv;
};

export type DefineFieldConfig<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  // TCv extends CalcValuesOpt,
  FieldKey extends keyof UiValues<TFs>
> = {
  changeEvent?: (values: DefineConfigValues<TFs, TEs>) => Partial<Nullish<TFs>>;
  registerOn?: (values: DefineConfigValues<TFs, TEs>) => boolean;
  rules?: (
    values: DefineConfigValues<TFs, TEs>,
    ctx: z.RefinementCtx,
    fieldKey: FieldKey
  ) => void | undefined | never;
};

export type FormConfigFieldsBase<
  TFs extends ZObj,
  TEs extends ZObjOpt
  // TCv extends CalcValuesOpt
> = {
  [FieldKey in keyof UiValues<TFs>]: DefineFieldConfig<
    TFs,
    TEs,
    FieldKey
    // TFs, TEs, TCv, FieldKey
  >;
};
