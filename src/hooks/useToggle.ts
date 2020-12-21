import { useReducer, Reducer } from 'react';

const reducer: Reducer<boolean, boolean | undefined> = (currentValue, overrideValue?: boolean) => {
  if (typeof overrideValue !== 'undefined') {
    return overrideValue;
  }
  return !currentValue;
}
export function useToggle(initialValue: boolean = false) {
  return useReducer(reducer, initialValue);
}

export default useToggle;
