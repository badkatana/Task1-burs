export const checkStringIsEmpty = (str?: string): string => {
  if (str == null || str === "") {
    return "no data";
  }
  return str;
};
