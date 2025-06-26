import type { DefineConfigValues } from "@internal/configValuesTypes";
import type { Resolved } from "@utils/utilityTypes";
import type { ZObj } from "@utils/rootTypes";
// DEPRECATED IMPORTS
import type { AnyCfgMetaDEPREC, CfgCvCb, CfgEs, CfgFs } from "@utils/deprec/formConfigDefinition";

/** Used AFTER config is defined */
export type ResolveConfigValues<C extends AnyCfgMetaDEPREC<ZObj, any, any, any>> = Resolved<
  DefineConfigValues<CfgFs<C>, CfgEs<C>, CfgCvCb<C>>
>;
