export const calcTotalCount = (array, text) => {
  if (array.length === 0) return 0;
  return array
    .reduce((cur, acc) => {
      return cur + Number(acc[text]);
    }, 0)
    .toString();
};
