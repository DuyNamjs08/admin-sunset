export const compareProgress = (array) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  if (array.length === 0) return 0;
  const fistMonth = array.find(
    (item) => item.month === currentMonth - 1
  )?.count;
  const Month = array.find((item) => item.month === currentMonth)?.count;
  return !fistMonth
    ? Month * 100
    : (((Month - fistMonth) / fistMonth) * 100).toFixed(2);
};
