import { z } from "zod";
//
import type { CvCb, CvCbOpt } from "@utils/deprec/cvCbTypes";
import type { ExtValues, UiValues } from "@utils/deprec/formOutputTypes";
import type { CfgDefaults } from "@utils/deprec/derived";
import type { AnyCfgMetaDEPREC, CfgCvCb, CfgEs, CfgFc, CfgFs } from "@utils/deprec/formConfigDefinition";
import type { ConfigFieldsOpt, DefineConfigFields } from "@utils/deprec/formFieldConfigs";
import type { ZObj, ZObjOpt } from "@utils/rootTypes";
import type { Resolved } from "@utils/utilityTypes";

// export type InputConfig<
//   TBase extends ZObj,
//   TCalc extends Record<string, any>,
//   TExt extends ExtSchemaProp
// > = {
//   /** Used only for providing types */
//   formSchema: TBase;
//   fields: Partial<ConfigFieldsProp<FormOut<TBase>, TCalc, ExtOut<TExt>>>;
//   // Optional
//   calcValues?: (form: FormOut<TBase>, ext?: ExtOut<TExt>) => TCalc;
//   externalSchema?: TExt;
// };

type AnyConfig<
  TFs extends ZObj = ZObj,
  TEs extends ZObj | void = ZObj | void,
  TCvCb extends CvCb<TFs, TEs> = CvCb<TFs, TEs>,
  TFc extends DefineConfigFields<TFs, TEs, TCvCb> = any
> = ConfigBase<TFs, TEs, TCvCb, TFc>;

export type ConfigResolved<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TFc extends DefineConfigFields<TFs, TEs, TCvCb> | void
> = Resolve<{
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: TCvCb;
  fieldConfigs?: TFc;
  defaults?: Partial<UiValues<TFs>>;
  externalValues?: Partial<ExtValues<TEs>>;
}>;

export type ResolveKeys<T> = {
  [K in keyof T]-?: T[K] extends void ? K : never;
}[keyof T];
export type Resolve<T> = Omit<T, ResolveKeys<T>>;

export type ConfigBase<
  TFs extends ZObj,
  TEs extends ZObjOpt,
  TCvCb extends CvCbOpt<TFs, TEs>,
  TFc extends DefineConfigFields<TFs, TEs, TCvCb> | void
> = {
  schema: TFs;
  externalSchema?: TEs;
  calcValuesCallback?: TCvCb;
  fieldConfigs?: TFc;
  defaults?: Partial<UiValues<TFs>>;
  externalValues?: Partial<ExtValues<TEs>>;
};

/** @deprecated use ConfigBase */
export type UseFormProps<C extends AnyCfgMetaDEPREC> = {
  defaults?: CfgDefaults<C>;
  schema: CfgFs<C>;
  calcValuesCallback?: CfgCvCb<C>;
  fieldConfigs?: CfgFc<C>;
  externalSchema?: CfgEs<C>;
  externalValues?: Partial<ExtValues<CfgEs<C>>>;
};
