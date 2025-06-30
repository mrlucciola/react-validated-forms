import type { FC } from "react";
import { expect } from "bun:test";
import { isEqual } from "lodash";
//
import { useTestFormState } from "./testVars/TestFormState";

const TestComponent: FC = () => {
  const { getFieldProps, ...formState } = useTestFormState();

  const asdf = getFieldProps("arr");
  expect(asdf.disabled === false, "Disabled should be false");
  expect(asdf.errors === "", "Errors should be false");
  expect(asdf.hidden === false, "Hidden should be false");
  // expect(asdf.onChange === false, "Onchange should be ___"); // @todo write out effective test

  expect(asdf.value, "Arrays should match should be false").toBeArray();
  expect(formState.form.arr, "Arrays should match should be false").toBeArray();
  expect(
    isEqual(asdf.value, formState.form.arr),
    `Arrays should match:\nFrom getFieldProps: '${JSON.stringify(
      asdf.value
    )}'\n From form-state: '${JSON.stringify(formState.form.arr)}'`
  );

  /** Write out 'fail' cases
   * 
  expect(asdf.disabled === false, "Disabled should be false");
  expect(asdf.errors === '', "Errors should be false");
  expect(asdf.hidden === false, "Hidden should be false");
  // expect(asdf.onChange === false, "Onchange should be ___"); // @todo write out effective test
  expect(asdf.value === false, "Disabled should be false");
   */

  return <div {...getFieldProps("arr")}></div>;
};
