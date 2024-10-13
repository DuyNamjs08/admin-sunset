export function addDot(number) {
  let numberStr = String(number);
  let parts = [];
  let count = 0;
  for (let i = numberStr.length - 1; i >= 0; i--) {
    parts.push(numberStr[i]);
    count++;
    if (count === 3) {
      parts.push(".");
      count = 0;
    }
  }
  let result = parts.reverse().join("");
  if (result.startsWith(".")) {
    result = result.slice(1);
  }
  return result;
}
