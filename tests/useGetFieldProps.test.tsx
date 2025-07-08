import type { FC } from "react";
import { expect } from "bun:test";
import { isEqual } from "lodash";
//
import { useTestFormState } from "./testVars/TestFormState";

const TestComponent: FC = () => {
  const { getFieldProps, ...formState } = useTestFormState();

  getFieldProps("date");
  const fieldPropsArr = getFieldProps("arr");
  expect(fieldPropsArr.disabled === false, "Disabled should be false");
  expect(fieldPropsArr.errors === "", "Errors should be false");
  expect(fieldPropsArr.hidden === false, "Hidden should be false");
  // expect(fieldPropsArr.onChange === false, "Onchange should be ___"); // @todo write out effective test

  expect(fieldPropsArr.value, "Arrays should match should be false").toBeArray();
  expect(formState.form.arr, "Arrays should match should be false").toBeArray();
  expect(
    isEqual(fieldPropsArr.value, formState.form.arr),
    `Arrays should match:\nFrom getFieldProps: '${JSON.stringify(
      fieldPropsArr.value
    )}'\n From form-state: '${JSON.stringify(formState.form.arr)}'`
  );

  /** Write out 'fail' cases
   * 
  expect(fieldPropsArr.disabled === false, "Disabled should be false");
  expect(fieldPropsArr.errors === '', "Errors should be false");
  expect(fieldPropsArr.hidden === false, "Hidden should be false");
  // expect(fieldPropsArr.onChange === false, "Onchange should be ___"); // @todo write out effective test
  expect(fieldPropsArr.value === false, "Disabled should be false");
   */

  return <div {...getFieldProps("arr")}></div>;
};
