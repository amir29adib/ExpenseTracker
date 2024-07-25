export const isEmptyString = (strValue: string): boolean => {
  if (strValue === "") {
    return true;
  }
  return false;
};

export const isArrayEmpty = <T>(arr: Array<T>): boolean => {
  if (arr.length === 0) {
    return true;
  }
  return false;
};
