// Given types:

type RootInput<T extends string, U extends number> = {
  orig: T;
  new?: U;
};
type RootInternal<T extends string = string, U extends number = number> = RootInput<T, U>;

// Create a type RootInternal which achieves the following:

/**
This function should be able to receive `input` of types:
- { orig: string; }
- { orig: string; new: number; }
- { orig: string; new?: number; }
*/
const buildRoot = <T extends RootInternal>(input: T): T => {
  /** ISSUE:
   * The type of input.new here is `(property) new?: any`
   * I need this type fo be `(property) new?: number`
   *
   * ### TASK:
   * Design a new generic type that derives RootInput in some way to:
   * - prevent hardcoding
   * - show up in intellisense as ots optional type `(property) new?: number`
   */
  input.new;
  input.orig; // ISSUE: this type is `any` when it needs to be `string`
  const newInput = input.new; // ISSUE: this type is `any` when it needs to be `number | undefined` (i.e. RootInput['new'])
  const origInput = input.orig; // ISSUE: this type is `any` when it needs to be `string` (i.e. RootInput['orig'])
  return input;
};

/** This is fine
typeof newRoot1 = { orig: string; }
*/
const newRoot1 = buildRoot({ orig: "" }) satisfies RootInput<any, any>;

/** This is fine
typeof newRoot2 = { orig: string; new: number; }
*/
const newRoot2 = buildRoot({ orig: "", new: 9 }) satisfies RootInput<any, any>;
