import type { ConfigExternal } from "@utils/configTypes";
import type { AnyCfgMeta, CfgMeta } from "@utils/rootTypes";

export type UseFormConfig<M extends AnyCfgMeta> = M extends CfgMeta<infer TFs, infer TEs, infer TCv>
  ? ConfigExternal<TFs, TEs, TCv>
  : never;
