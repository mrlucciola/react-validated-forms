import type { ResolvedConfig } from "@core/types";
import type {
  CfgCvCb,
  CfgFs,
  FormConfigValues,
  UiValues,
  AnyCfgMeta,
  CfgEs,
  ExtValues,
} from "@utils/index";

/** @todo Add annotation
 * @todo Fix output type
 */
const getConfigValues = <TCfg extends AnyCfgMeta>(
  uiValues: UiValues<CfgFs<TCfg>>,
  config?: ResolvedConfig<TCfg>
): FormConfigValues<TCfg> | null => {
  if (config === undefined) return null;

  const out: FormConfigValues<TCfg> = { form: uiValues } as any;

  if ("externalValues" in config) {
    out.external = config.externalValues as ExtValues<CfgEs<TCfg>>;
  }

  if ("calcValuesCallback" in config) {
    out.calculated = (config.calcValuesCallback as CfgCvCb<TCfg>)(uiValues, out.external);
  }

  return out;

  // return {
  //   form: uiValues,
  //   external: config?.externalValues,
  //   calculated,
  // };
};

export default getConfigValues;

export type Tighten<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]-?: NonNullable<T[K]>;
};
