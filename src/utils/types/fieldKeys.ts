import type { UiValues, ZObj } from "@utils/index";

/** Previously: `CfgKey` */
export type InferFormKeys<TFs extends ZObj> = keyof UiValues<TFs>;
