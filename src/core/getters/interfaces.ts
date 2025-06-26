import type { z } from "zod";
// interfaces
import type { ZObj } from "@utils/rootTypes";

/** The error-object type from an object schema's `safeParse`. */
export type SchemaParseErrors<TSchema extends ZObj> = z.typeToFlattenedError<
  z.input<TSchema>,
  string | undefined
>["fieldErrors"];
