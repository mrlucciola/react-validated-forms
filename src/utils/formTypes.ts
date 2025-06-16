import type { ZObj } from "./interfaces";

/** "Form Values" output */
export type FormOut<TSchema extends ZObj = ZObj> = AppliedFieldOutput<TSchema>;

// export type EvOut
