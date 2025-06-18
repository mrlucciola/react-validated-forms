import type { EvOut, FormConfigCtx, UiValues } from "@utils/index";

export type AnyFormConfigValues<
  TFv extends UiValues = UiValues,
  TCv = unknown,
  TEv extends EvOut = any
> = FormConfigCtx<TFv, TCv, TEv>;

export type InferFormValues<T extends AnyFormConfigValues> = T["fields"];
export type InferCalcValues<T extends AnyFormConfigValues> = T extends { calculated: infer C }
  ? C
  : undefined;
export type InferExtValues<T extends AnyFormConfigValues> = T extends { external: infer E }
  ? E
  : undefined;

export type WithCalcValues<T> = T extends { calculated: any } ? T : never;
export type WithExtValues<T> = T extends { external: any } ? T : never;
