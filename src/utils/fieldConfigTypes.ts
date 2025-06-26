import type { z } from "zod";
//
import type { Nullish } from "@utils/utilityTypes";
import type { CalcValuesOpt, ZObj, ZObjOpt } from "@utils/rootTypes";
import type { UiValues } from "@utils/valueTypes";
import type { CalcValuesProp, ExternalValuesProp2 } from "@utils/configTypes";

export type FieldConfigValueProp<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt
> = CalcValuesProp<TCv> &
  ExternalValuesProp2<TEs> & {
    form: UiValues<TFs>;
  };

export type DefineFieldConfig<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt,
  FieldKey extends keyof UiValues<TFs>
> = {
  changeEvent?: (values: FieldConfigValueProp<TFs, TEs, TCv>) => Nullish<UiValues<TFs>>;
  registerOn?: (values: FieldConfigValueProp<TFs, TEs, TCv>) => boolean;
  rules?: (
    values: FieldConfigValueProp<TFs, TEs, TCv>,
    ctx: z.RefinementCtx,
    fieldKey: FieldKey
  ) => void | undefined | never;
};

export type FormConfigFieldsBase<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCv extends CalcValuesOpt
> = {
  [FieldKey in keyof UiValues<TFs>]: DefineFieldConfig<TFs, TEs, TCv, FieldKey>;
};
