import type { ExtValues, UiValues, ZObj, ZObjOpt } from "@utils/index";

/** Previously: `CfgKey` */
export type InferFormKeys<TFs extends ZObj> = keyof UiValues<TFs>;
export type InferEvKeys<TEs extends ZObjOpt> = keyof ExtValues<TEs>;
