import type { EvOut, Nullish } from "@utils/index";

/** @deprecated */
type ExternalValuesCb<TEv extends EvOut> = (
  externalValues?: Nullish<NonNullable<TEv>> | null
) => void;

/** Parameters for `ExternalValuesCb` @deprecated */
export type EvProp<TEv extends EvOut> = TEv extends undefined | never
  ? never
  : Parameters<ExternalValuesCb<TEv>>;
