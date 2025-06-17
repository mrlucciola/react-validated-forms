import type { EvOut } from "../formOutputTypes";
import type { Nullish } from "../utilityTypes";

export type ExternalValuesCb<TEv extends EvOut> = (
  externalValues?: Nullish<NonNullable<TEv>> | null
) => void;

/** Parameters for `ExternalValuesCb` */
export type EvProp<TEv extends EvOut> = TEv extends undefined | never
  ? never
  : Parameters<ExternalValuesCb<TEv>>;
