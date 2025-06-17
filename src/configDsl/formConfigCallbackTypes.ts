import type { CvCbFromCalc, EvOut, FormOut, Nullish } from "@utils/index";
import type { AnyFormCfgObj } from "./interfaces";
import type { FormConfig } from "./formConfigTypes";

type ExternalValuesCb<TEv extends EvOut> = (
  externalValues?: Nullish<NonNullable<TEv>> | null
) => void;
type EvProp<TEv extends EvOut> = TEv extends undefined | never
  ? never
  : Parameters<ExternalValuesCb<TEv>>;

/**
 * @deprecated fix type - should omit fields that are undefined
 * @deprecated add additional support type - `AnyFormConfigReturn` for `unknown` values on `Partial<...>` fields
 */
export type FormConfigReturn<TFv extends FormOut, TCv, TEv extends EvOut> = (
  ...args: EvProp<TEv>
) => {
  fields: FormConfig<TFv, TCv, TEv>; // prev: ConfigFieldsProp
  /** @deprecated fix type - should be CvCb<TFv, TCv, TEv> */
  calcValues?: CvCbFromCalc<TCv>;
  externalValues?: TEv;
};

// @todo derive this type more effectively
export type FieldConfigFromConfig<T extends AnyFormCfgObj> = Pick<T, "fields">["fields"];

// @todo derive this type more effectively
export type CalcValuesCbFromConfig<T extends AnyFormCfgObj> = T extends FormConfigReturn<
  infer _Form,
  infer TCv,
  infer _Ext
>
  ? CvCbFromCalc<TCv>
  : never;

// @todo derive this type more effectively
export type ExtValuesCbFromConfig<T extends AnyFormCfgObj> = T extends FormConfigReturn<
  infer _Form,
  infer _Cv,
  infer TExt
>
  ? TExt
  : never;
